"use client";

import { motion } from "motion/react";


export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white dark:bg-neutral-950"
    >
      {/* Subtle dot-grid background */}
      <div className="absolute inset-0 dot-grid opacity-[0.03] dark:opacity-[0.06]" />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-brand/5 blur-3xl animate-gradient-mesh-1" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand/3 blur-3xl animate-gradient-mesh-2" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="space-y-8 pt-12 lg:pt-0 max-w-2xl">
            {/* Badge */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand/40" />
              <div className="flex items-center gap-2 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5">
                <div className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Web Developer
                </span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand/40" />
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              HATA
              <span className="text-brand">KEYAMA</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              React + Next.js + TypeScript
              を活用したモダンなWebアプリケーション開発。
              7年間の開発経験と3年間の運用保守経験を持つ開発者です。
            </motion.p>

            <motion.div
              className="flex gap-12 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-brand">
                  7+
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mt-1">
                  Years Dev
                </p>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-brand">
                  3+
                </span>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mt-1">
                  Years Ops
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center bg-brand text-white px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-brand-hover hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                作品を見る
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-brand/30 border-dashed bg-brand/5 text-neutral-700 dark:text-neutral-300 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg hover:border-brand hover:bg-brand/10 hover:scale-[1.02] transition-all duration-200"
              >
                Contact
              </a>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}
