"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const PHILOSOPHY = [
  "I believe the best interfaces are the ones you do not notice.",
  "They work so fluently with the way you think that the technology disappears.",
  "My job is to make that disappearance feel inevitable.",
];

const CURRENTLY = {
  building: "Next-gen creative portfolios with synced scroll-physics.",
  reading: "The Design of Everyday Things — Donald Norman.",
  exploring: "WebGPU shaders, GLSL particle physics, and OGL singletons.",
  listening: "Nicolas Jaar — Space Is Only Noise.",
};

export function AboutSection() {
  return (
    <section className="relative flex flex-col justify-center py-32 px-6 md:px-12 w-full bg-[var(--c-base)] border-t border-[var(--c-border)] z-10" id="about" aria-label="About biography">
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-[var(--c-border)] pb-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-[var(--c-text-primary)]">
            ABOUT STORY
          </h2>
          <span className="text-mono text-xs text-zinc-500 font-semibold mb-1">
            [ PROFILE / BIO ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-96 md:w-80 md:h-[450px] rounded-2xl overflow-hidden border border-[var(--c-border)] group shadow-xl">
              <Image
                src="/portrait.png"
                alt="A creative portrait photograph of Alex Rivers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: "grayscale(0.4) contrast(1.1)" }}
                sizes="(max-width: 768px) 288px, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-12">
            
            {/* Philosophy quotes */}
            <div className="flex flex-col gap-6">
              {PHILOSOPHY.map((line, idx) => (
                <motion.p
                  key={idx}
                  className="text-lg md:text-2xl font-display font-medium leading-relaxed text-[var(--c-text-primary)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Currently stats widgets */}
            <div className="bg-zinc-950/40 border border-[var(--c-border)] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <span className="text-label text-[10px] text-zinc-500 block mb-6 font-mono font-bold tracking-wider">
                CURRENT STATS —
              </span>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(CURRENTLY).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <dt className="text-xs font-mono text-[var(--c-mode-accent)] font-semibold uppercase">
                      // {key}
                    </dt>
                    <dd className="text-xs text-zinc-400 font-mono leading-relaxed">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AboutSection;
