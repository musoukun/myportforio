"use client";

import { motion } from "motion/react";
import { Briefcase, Code2, Award } from "lucide-react";
import SectionHeader from "./SectionHeader";

const experience = [
  {
    title: "Webアプリ開発",
    company: "製造業向けシステムインテグレータ",
    period: "2023.10 — Present",
    current: true,
    items: [
      "Nextjs or React + TypeScript + Express での開発",
      "Playwright を用いたE2Eテスト導入",
      "Mastra及びLangChain.js + NextjsでAIアプリ開発",
      "CI/CD パイプライン構築",
    ],
  },
  {
    title: "医薬系ECサイト開発・運用",
    company: "試薬・化成品製造販売会社",
    period: "2022.10 — 2023.10",
    current: false,
    items: [
      "レガシーシステムからPHP + Laravel へのリプレイス主導",
      "自動テスト導入とCI/CD環境構築",
      "開発チーム教育とモダン開発手法の導入",
    ],
  },
  {
    title: "住宅基幹システム運用保守",
    company: "業務コンサルティング会社",
    period: "2015.08 — 2022.06",
    current: false,
    items: [
      "Salesforce (Apex) での機能追加・カスタマイズ",
      "要件定義〜設計〜開発〜テストまで一貫した業務",
      "新人教育プログラム作成と技術勉強会主催",
    ],
  },
];

const skillCategories = [
  {
    title: "フロントエンド",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "バックエンド",
    items: [
      "Node.js",
      "Express",
      "PHP",
      "Laravel",
      "Java",
      "Spring Boot",
      "Python",
    ],
  },
  {
    title: "データベース・インフラ",
    items: ["PostgreSQL", "Docker", "Firebase", "AWS"],
  },
  {
    title: "AI・その他",
    items: ["Mastra", "Playwright", "Git", "GitLab CI/CD", "Salesforce"],
  },
];

const certifications = [
  { name: "基本情報技術者試験", issuer: "IPA（情報処理推進機構）" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
];

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 bg-white dark:bg-neutral-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="03" label="Resume" title="Resume" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Experience */}
          <motion.div
            className="rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 p-6 h-full">
              <h3 className="text-lg font-semibold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand text-white flex items-center justify-center rounded-lg text-sm">
                  <Briefcase className="w-4 h-4" />
                </span>
                職歴
              </h3>

              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.title}
                    className={`border-l-2 pl-6 ${exp.current ? "border-brand" : "border-neutral-200 dark:border-neutral-700"}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <h4 className="font-semibold tracking-tight">
                      {exp.title}
                    </h4>
                    <p className="text-brand text-sm mt-1">{exp.company}</p>
                    <p className="text-neutral-400 text-xs font-mono mt-1">
                      {exp.period}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-neutral-600 dark:text-neutral-400 text-sm">
                      {exp.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 p-6 h-full">
              <h3 className="text-lg font-semibold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand text-white flex items-center justify-center rounded-lg text-sm">
                  <Code2 className="w-4 h-4" />
                </span>
                技術スキル
              </h3>

              <div className="space-y-4">
                {skillCategories.map((cat, idx) => (
                  <motion.div
                    key={cat.title}
                    className="rounded-lg border border-brand/10 bg-brand/3 p-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.08 }}
                  >
                    <h4 className="text-sm font-semibold mb-3 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-brand/15 bg-white dark:bg-neutral-800 px-2.5 py-1 text-xs hover:border-brand/30 hover:bg-brand/5 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 p-6 h-full">
              <h3 className="text-lg font-semibold mb-8 flex items-center gap-3">
                <span className="w-8 h-8 bg-brand text-white flex items-center justify-center rounded-lg text-sm">
                  <Award className="w-4 h-4" />
                </span>
                資格・認定
              </h3>

              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.name}
                    className="rounded-lg border border-brand/10 bg-brand/3 p-5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <h5 className="font-semibold text-sm tracking-tight">
                      {cert.name}
                    </h5>
                    <p className="text-xs text-neutral-400 mt-1">
                      {cert.issuer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
