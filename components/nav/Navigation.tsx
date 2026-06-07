"use client";
import Link from "next/link";

const NAV_LINKS = [
  { label: "WORK", href: "#works" },
  { label: "STACK", href: "#skills" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16 bg-transparent"
      aria-label="Main navigation"
    >
      {/* Logo mark */}
      <Link
        href="/"
        className="font-mono text-xs tracking-widest text-[var(--c-signal)] uppercase hover:opacity-70 transition-opacity"
        aria-label="Home"
      >
        AR<span className="opacity-40">_PORTFOLIO</span>
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-label text-zinc-400 hover:text-[var(--c-text-primary)] transition-colors duration-200 tracking-widest"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mode indicator pill */}
      <div
        className="hidden md:flex items-center gap-2 border border-[var(--c-border)] rounded-full px-4 py-1.5 text-[10px] font-mono tracking-widest text-zinc-500 bg-zinc-950/60 backdrop-blur-md"
        aria-hidden="true"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[var(--c-mode-accent)] animate-pulse"
          aria-hidden="true"
        />
        OPEN TO WORK
      </div>
    </nav>
  );
}
