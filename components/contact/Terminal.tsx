"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const COMMANDS: Record<string, string | ((args: string[]) => string)> = {
  help: "Available: hello · work · contact · about · clear",
  hello: "Oh hey 👋  I build premium digital experiences. Type: contact [message] to reach out.",
  work: "→ Scrolling to selected work section...",
  about: "→ Jumping to about section...",
  clear: "__CLEAR__",
  "contact [message]": (args: string[]) =>
    args.length > 0
      ? `Opening mailto with: "${args.join(" ")}"... 📨`
      : "Usage: contact [your message here]",
};

type LogLine = { id: number; type: "input" | "output" | "error"; text: string };

export function Terminal() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<LogLine[]>([
    { id: 0, type: "output", text: "PORTFOLIO TERMINAL v1.0.0" },
    { id: 1, type: "output", text: '──────────────────────────────' },
    { id: 2, type: "output", text: 'Type "help" to see available commands.' },
    { id: 3, type: "output", text: 'Hint: Try "contact [your message]" to send an email.' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(10);

  const push = useCallback((type: LogLine["type"], text: string) => {
    setLog(prev => [...prev, { id: idRef.current++, type, text }]);
  }, []);

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    push("input", `$ ${cmd}`);
    setHistory(h => [cmd, ...h]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    const [command, ...args] = lower.split(" ");

    if (command === "clear") {
      setLog([]);
      return;
    }

    if (command === "work") {
      push("output", "→ Scrolling to selected works...");
      setTimeout(() => {
        document.getElementById("works")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return;
    }

    if (command === "about") {
      push("output", "→ Jumping to about section...");
      setTimeout(() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }, 400);
      return;
    }

    if (command === "contact" && args.length > 0) {
      const message = args.join(" ");
      push("output", `Opening email client...`);
      push("output", `To: hey@alexrivers.io`);
      push("output", `Subject: "${message}"`);
      setTimeout(() => {
        window.location.href = `mailto:hey@alexrivers.io?subject=${encodeURIComponent(message)}`;
      }, 1000);
      return;
    }

    const result = COMMANDS[command];
    if (typeof result === "string") {
      push("output", result);
    } else if (typeof result === "function") {
      push("output", result(args));
    } else {
      push("error", `Command not found: "${command}". Type "help" to see available commands.`);
    }
  }, [push]);

  // Auto-scroll to bottom on new log entries
  useEffect(() => {
    logRef.current?.scrollTo(0, logRef.current.scrollHeight);
  }, [log]);

  return (
    <section
      className="relative flex flex-col justify-center py-32 px-6 md:px-12 w-full bg-[var(--c-base)] border-t border-[var(--c-border)] z-10"
      id="contact"
      aria-label="Contact terminal"
    >
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[var(--c-border)] pb-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--c-text-primary)]">
            GET IN TOUCH
          </h2>
          <span className="text-mono text-xs text-zinc-500 font-semibold mb-1">
            [ CONTACT / TERMINAL ]
          </span>
        </div>

        {/* Terminal Window */}
        <div
          className="bg-zinc-950 border border-[var(--c-border)] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-text"
          onClick={() => inputRef.current?.focus()}
          role="application"
          aria-label="Interactive terminal. Type help for available commands."
        >
          {/* macOS-style title bar */}
          <div className="flex items-center gap-3 bg-zinc-900/80 px-5 py-3 border-b border-[var(--c-border)]" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity cursor-default" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] hover:opacity-80 transition-opacity cursor-default" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity cursor-default" />
            <span className="text-mono text-xs text-zinc-500 ml-4 flex-1 text-center">
              portfolio — bash — 80×24
            </span>
          </div>

          {/* Log output area */}
          <div
            ref={logRef}
            className="font-mono text-[13px] leading-relaxed px-5 py-5 h-64 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {log.map(line => (
              <div
                key={line.id}
                className={`mb-1 ${
                  line.type === "input"
                    ? "text-[var(--c-signal)]"
                    : line.type === "error"
                    ? "text-red-400"
                    : "text-zinc-300"
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-center gap-2 border-t border-[var(--c-border)] bg-zinc-950 px-5 py-3">
            <span className="font-mono text-[13px] text-[var(--c-signal)] select-none" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  execute(input);
                  setInput("");
                }
                if (e.key === "ArrowUp") {
                  const i = Math.min(historyIndex + 1, history.length - 1);
                  setHistoryIndex(i);
                  setInput(history[i] ?? "");
                  e.preventDefault();
                }
                if (e.key === "ArrowDown") {
                  const i = Math.max(historyIndex - 1, -1);
                  setHistoryIndex(i);
                  setInput(i === -1 ? "" : history[i]);
                  e.preventDefault();
                }
                if (e.key === "Tab") {
                  e.preventDefault();
                  const allCommands = Object.keys(COMMANDS);
                  const match = allCommands.find(k => k.startsWith(input));
                  if (match) setInput(match.replace("[message]", "").trim() + " ");
                }
              }}
              className="flex-1 bg-transparent text-zinc-100 font-mono text-[13px] outline-none caret-[var(--c-signal)] placeholder:text-zinc-600"
              placeholder="type a command..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
            <span className="animate-[blink_1s_step-end_infinite] text-[var(--c-signal)] font-mono select-none" aria-hidden="true">█</span>
          </div>
        </div>

        {/* Fallback for no-JS users */}
        <noscript>
          <p className="mt-6 text-zinc-400 text-sm font-mono">
            Email me directly at{" "}
            <a href="mailto:hey@alexrivers.io" className="text-[var(--c-signal)] underline">
              hey@alexrivers.io
            </a>
          </p>
        </noscript>

        {/* Social links */}
        <div className="flex flex-wrap gap-6 mt-10 text-mono text-xs text-zinc-500 font-mono tracking-widest">
          {[
            { label: "GITHUB", href: "https://github.com" },
            { label: "LINKEDIN", href: "https://linkedin.com" },
            { label: "DRIBBBLE", href: "https://dribbble.com" },
            { label: "TWITTER", href: "https://twitter.com" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--c-mode-accent)] transition-colors duration-200"
            >
              {label} →
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Terminal;
