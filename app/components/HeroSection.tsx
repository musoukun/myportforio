"use client";

import { motion, useScroll, useTransform } from "motion/react";

const stats = [
  { value: "8+", label: "Years Dev" },
  { value: "3+", label: "Years Ops" },
];

export default function HeroSection() {
  // The 3D diorama behind stays put; the copy lifts away as you scroll.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Shade the upper-left sky so the copy reads over the bright morning */}
      <div className="absolute inset-0 bg-gradient-to-br from-night/75 via-night/15 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent pointer-events-none" />

      <motion.div
        className="relative h-full max-w-6xl mx-auto px-6 flex items-start pt-28 sm:pt-32"
        style={{ y, opacity }}
      >
        <div className="space-y-6 max-w-2xl min-w-0 w-full [text-shadow:0_1px_3px_rgba(7,10,24,0.95),0_2px_12px_rgba(7,10,24,0.7)]">
          <motion.p
            className="inline-flex items-start gap-2 rounded-lg border border-brand/60 bg-night/80 px-4 py-2.5 text-sm sm:text-base font-semibold leading-snug text-white shadow-[4px_4px_0_0_#03050d] [text-shadow:none]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-brand">✦</span>
            <span>
              背景の街のアニメーションとサイトは、画像を使わずプログラムで作成しました
              <span className="font-pixel text-xs text-brand ml-1 whitespace-nowrap">
                （Next.js / TypeScript / three.js）
              </span>
            </span>
          </motion.p>
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
            className="text-sm sm:text-base font-medium text-white max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            React + Next.js + TypeScript
            を活用したモダンなWebアプリケーション開発。
            8年間の開発経験と3年間の運用保守経験を持つ開発者です。
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
                <p className="text-xs font-bold uppercase tracking-wider text-white mt-1 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                  {s.label}
                </p>
              </div>
            ))}
            <div className="flex gap-3">
              <a
                href="#portfolio"
                className="font-pixel inline-flex items-center bg-brand text-night [text-shadow:none] px-6 py-3 text-xs uppercase shadow-[4px_4px_0_0_#03050d] hover:bg-brand-hover hover:-translate-y-0.5 transition-all"
              >
                作品を見る
              </a>
              <a
                href="#contact"
                className="font-pixel inline-flex items-center bg-night/85 border-2 border-white text-white font-bold px-6 py-3 text-xs uppercase shadow-[4px_4px_0_0_#03050d] hover:border-brand hover:text-brand hover:-translate-y-0.5 transition-all"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <a
          href="#about"
          className="font-pixel flex flex-col items-center gap-1 rounded-full border-2 border-white/80 bg-night/75 px-5 py-2 text-sm text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-brand hover:text-brand transition-colors"
        >
          SCROLL!
          <span className="text-xl leading-none text-brand animate-bounce">↓</span>
        </a>
      </motion.div>
    </section>
  );
}
