"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export interface SkillNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  domain: "frontend" | "backend" | "design" | "devops";
  level: 1 | 2 | 3; // 1 = exploring, 2 = battle-tested, 3 = daily-driver
  years: number;
}

export interface SkillLink {
  source: string;
  target: string;
}

const DOMAIN_COLORS = {
  frontend: "#5DADE2", // cool blue
  backend: "#C8FA5F",  // chartreuse
  design: "#FF8C42",   // warm orange
  devops: "#A66CFF",   // light purple
} as const;

const LEVEL_LABELS = {
  1: "exploring",
  2: "battle-tested",
  3: "daily driver",
} as const;

export function ConstellationGraph({
  nodes,
  links,
}: {
  nodes: SkillNode[];
  links: SkillLink[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SkillNode | null>(null);
  const simRef = useRef<d3.Simulation<SkillNode, d3.SimulationLinkDatum<SkillNode>> | null>(null);
  const nodesRef = useRef<SkillNode[]>(JSON.parse(JSON.stringify(nodes)));
  const linksRef = useRef<d3.SimulationLinkDatum<SkillNode>[]>(JSON.parse(JSON.stringify(links)));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext("2d")!;
    
    const W = containerRef.current.clientWidth;
    const H = 450;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Initialize D3 simulation
    const sim = d3.forceSimulation<SkillNode>(nodesRef.current)
      .force("link", d3.forceLink<SkillNode, d3.SimulationLinkDatum<SkillNode>>(linksRef.current).id((d: any) => d.id).distance(80).strength(0.4))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collision", d3.forceCollide<SkillNode>((d: any) => d.level * 10 + 15))
      .alphaDecay(0.025); // slow settlement for organic bounce

    simRef.current = sim;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      ctx.save();
      linksRef.current.forEach((link: any) => {
        const source = link.source as SkillNode;
        const target = link.target as SkillNode;
        if (source.x === undefined || source.y === undefined || target.x === undefined || target.y === undefined) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      ctx.restore();

      // Draw interactive nodes
      nodesRef.current.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;
        const r = node.level * 7 + 7;
        const color = DOMAIN_COLORS[node.domain];
        const isSelected = selected?.id === node.id;

        // Draw outer fuzzy glowing halo
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
        gradient.addColorStop(0, color + (isSelected ? "60" : "20"));
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw solid core circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? color : color + "bb";
        ctx.fill();

        // Draw node name label below core
        ctx.font = `11px "Geist Mono", monospace`;
        ctx.fillStyle = isSelected ? "#E8ECF0" : "#6B7A8F";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + r + 14);
      });
    };

    sim.on("tick", draw);

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const width = containerRef.current.clientWidth;
      canvas.width = width * dpr;
      canvas.style.width = `${width}px`;
      ctx.scale(dpr, dpr);
      sim.force("center", d3.forceCenter(width / 2, H / 2));
      sim.alpha(0.1).restart();
    };
    window.addEventListener("resize", handleResize);

    // Cursor click action mappings
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const hit = nodesRef.current.find((n) => {
        if (n.x === undefined || n.y === undefined) return false;
        const r = n.level * 7 + 7 + 6; // Hit buffer padding
        return Math.hypot(n.x - mx, n.y - my) < r;
      });

      setSelected(hit || null);

      if (hit) {
        // Re-heat simulation for kinetic pulse feedback
        sim.alpha(0.25).restart();
      }
    };
    canvas.addEventListener("click", onClick);

    return () => {
      sim.stop();
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [selected]);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center select-none">
      <canvas
        ref={canvasRef}
        className="w-full bg-zinc-950/20 border border-[var(--c-border)] rounded-xl cursor-pointer"
        role="img"
        aria-label="Interactive skill mapping constellation graph"
      />

      {/* Tooltip display */}
      <div className="min-h-[60px] mt-6 w-full max-w-md bg-zinc-950/80 border border-[var(--c-border)] rounded-xl p-4 text-center backdrop-blur-md flex flex-col justify-center items-center">
        {selected ? (
          <div className="flex flex-col gap-1" role="status" aria-live="polite">
            <span className="text-sm font-mono font-bold" style={{ color: DOMAIN_COLORS[selected.domain] }}>
              {selected.name}
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Rating: {LEVEL_LABELS[selected.level]} · Experience: {selected.years}y
            </span>
          </div>
        ) : (
          <span className="text-xs text-zinc-500 font-mono tracking-wider">
            CLICK ANY NODE IN THE CONSTELLATION TO EXAMINE DETAILS
          </span>
        )}
      </div>
    </div>
  );
}
