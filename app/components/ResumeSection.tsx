"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Code2, Award, ChevronDown, type LucideIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";

const experience = [
  {
    title: "AI × 不動産データ基盤の開発",
    company: "生成AIスタートアップ",
    period: "2026.06 — Present",
    current: true,
    items: [
      "出店判断を助ける不動産Webサービスの開発",
      "Next.js と Python（FastAPI）の両方を担当",
      "要望から実装・検証まで回すAI駆動開発の仕組みを構築",
      "Playwright で自動テストを整備",
    ],
  },
  {
    title: "Webアプリ開発",
    company: "製造業向けシステムインテグレータ",
    period: "2023.10 — 2026.05",
    current: false,
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

// A resume card. On phones it folds: tap the heading to open or close it.
// From tablet width up it is always open.
function ResumePanel({
  icon: Icon,
  title,
  defaultOpen = false,
  children,
}: {
  icon: LucideIcon;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="panel p-5 md:p-6 h-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-lg font-semibold flex items-center gap-3 text-night-text md:cursor-default md:mb-8"
      >
        <span className="w-8 h-8 bg-brand text-night flex items-center justify-center text-sm shadow-[3px_3px_0_0_#03050d]">
          <Icon className="w-4 h-4" />
        </span>
        {title}
        <ChevronDown
          className={`ml-auto w-5 h-5 text-brand transition-transform md:hidden ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${open ? "block" : "hidden"} md:block mt-6 md:mt-0`}>{children}</div>
    </div>
  );
}

export default function ResumeSection() {
  return (
    <section id="resume" className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="03" label="Resume" title="Resume" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {/* Experience */}
          <motion.div
           
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <ResumePanel icon={Briefcase} title="職歴" defaultOpen>

              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <motion.div
                    key={exp.title}
                    className={`border-l-2 pl-6 ${exp.current ? "border-brand" : "border-night-line"}`}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <h4 className="font-semibold tracking-tight">
                      {exp.title}
                    </h4>
                    <p className="text-brand text-sm mt-1">{exp.company}</p>
                    <p className="text-night-muted text-xs font-mono mt-1">
                      {exp.period}
                    </p>
                    <ul className="mt-3 space-y-1.5 text-night-muted text-sm">
                      {exp.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </ResumePanel>
          </motion.div>

          {/* Skills */}
          <motion.div
           
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ResumePanel icon={Code2} title="技術スキル">

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
                    <h4 className="text-sm font-semibold mb-3 text-night-muted uppercase tracking-wider">
                      {cat.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-brand/15 bg-night/60 px-2.5 py-1 text-xs hover:border-brand/30 hover:bg-brand/5 transition-all duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ResumePanel>
          </motion.div>

          {/* Certifications */}
          <motion.div
           
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <ResumePanel icon={Award} title="資格・認定">

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
                    <p className="text-xs text-night-muted mt-1">
                      {cert.issuer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </ResumePanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
