"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const skills = [
  { label: "React / Next.js + TypeScript", pct: 80 },
  { label: "PHP / Laravel", pct: 10 },
  { label: "Java / Spring", pct: 10 },
];

const devStyle = [
  "アイデアを形にするのが早いです。素早くWebアプリを開発します。",
  "開発知識の教育と情報発信を重視しています。",
  "CI/CDパイプラインの構築と運用、自動テスト等もしていました。",
];

const specialties = [
  "Webアプリ開発",
  "AIアプリケーション開発",
  "教育",
  "システム設計",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="01"
          label="About"
          title="About"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left — description + bars */}
          <motion.div
           
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="panel p-6 h-full">
              <h3 className="text-xl font-semibold mb-4 tracking-tight text-night-text">
                モダンWebアプリケーション開発者
              </h3>
              <p className="text-night-muted leading-relaxed text-sm mb-4">
                住宅基幹システムのWebアプリケーション運用からキャリアを開始し、Webアプリのスクラッチ開発の経験を積んできました。
                最新の技術トレンドを常にキャッチアップし、効率的な開発を心がけています。
              </p>
              <p className="text-night-muted leading-relaxed text-sm mb-6">
                現在は特にReact + TypeScript +
                Next.jsを使用したフロントエンド開発と、
                Mastraを活用したAIアプリケーション開発に力を入れてます。
              </p>

              {/* Skill bars */}
              <div className="space-y-4 pt-2">
                <p className="text-xs text-night-muted font-medium">
                  最近はもっぱらReact + Next.js + TypeScriptをつかってます。
                </p>
                {skills.map((s, idx) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium tracking-tight">
                        {s.label}
                      </span>
                      <span className="text-night-muted font-pixel text-xs">
                        {s.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-night-line rounded-full overflow-hidden">
                      <motion.div
                        className={`h-1.5 rounded-full ${s.pct >= 50 ? "bg-brand" : "bg-brand/60"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — cards */}
          <div className="space-y-4">
            {/* Dev style card */}
            <motion.div
             
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-4 bg-brand/40" />
                  <h4 className="text-lg font-semibold tracking-tight text-night-text">
                    開発スタイル
                  </h4>
                </div>
                <ul className="space-y-3">
                  {devStyle.map((text, idx) => (
                    <motion.li
                      key={text}
                      className="flex items-start gap-2.5 text-night-muted text-sm"
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      {text}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Specialties card */}
            <motion.div
             
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="panel p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-4 bg-brand/40" />
                  <h4 className="text-lg font-semibold tracking-tight text-night-text">
                    得意分野
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {specialties.map((area, idx) => (
                    <motion.div
                      key={area}
                      className="text-center p-3 rounded-lg bg-brand/5 border border-brand/10 text-sm text-night-muted hover:bg-brand/10 hover:border-brand/20 transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + idx * 0.05 }}
                    >
                      {area}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
