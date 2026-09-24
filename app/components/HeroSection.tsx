"use client";

import { motion, useScroll, useTransform } from "motion/react";

const stats = [
  { value: "7+", label: "Years Dev" },
  { value: "3+", label: "Years Ops" },
];

export default function HeroSection() {
  // The 3D diorama behind stays put; the copy lifts away as you scroll.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Shade the upper-left sky so the copy reads; the campfire below stays clear */}
      <div className="absolute inset-0 bg-gradient-to-br from-night/85 via-night/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent pointer-events-none" />

      <motion.div
        className="relative h-full max-w-6xl mx-auto px-6 flex items-start pt-28 sm:pt-32"
        style={{ y, opacity }}
      >
        <div className="space-y-6 max-w-2xl min-w-0 w-full">
          <motion.p
            className="font-pixel text-xs sm:text-sm text-brand flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block w-2 h-2 bg-brand animate-pulse" />
            WEB DEVELOPER / REACT · NEXT.JS · TYPESCRIPT
          </motion.p>

          <motion.h1
            className="text-[14vw] sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.85] text-night-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            HATA
            <span className="text-brand ember-glow">KEYAMA</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base text-night-text/80 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            React + Next.js + TypeScript
            を活用したモダンなWebアプリケーション開発。
            7年間の開発経験と3年間の運用保守経験を持つ開発者です。
          </motion.p>

          <motion.div
            className="flex flex-wrap items-end gap-x-10 gap-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <span className="font-pixel text-3xl sm:text-4xl text-brand ember-glow">
                  {s.value}
                </span>
                <p className="font-pixel text-[10px] uppercase text-night-muted mt-1">
                  {s.label}
                </p>
              </div>
            ))}
            <div className="flex gap-3">
              <a
                href="#portfolio"
                className="font-pixel inline-flex items-center bg-brand text-night px-6 py-3 text-xs uppercase shadow-[4px_4px_0_0_#03050d] hover:bg-brand-hover hover:-translate-y-0.5 transition-all"
              >
                作品を見る
              </a>
              <a
                href="#contact"
                className="font-pixel inline-flex items-center border-2 border-brand/50 text-night-text px-6 py-3 text-xs uppercase hover:border-brand hover:text-brand transition-all"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-night-muted flex flex-col items-center gap-2"
        style={{ opacity }}
      >
        SCROLL
        <span className="block w-px h-8 bg-gradient-to-b from-brand to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
