/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import ResponsiveFluidBlobs from "./ResponsiveFluidBlobs";
import SectionHeader from "./SectionHeader";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  liveComponent?: boolean;
  placeholder?: { icon: string; label: string };
  href: string;
  githubUrl?: string;
  featured?: boolean;
  featuredLabel?: string;
}

const projects: Project[] = [
  {
    title: "CC Pet",
    description:
      "Claude Codeの動作に合わせて、デスクトップ上にキャラクターアニメーションで表示するWindowsアプリ。\n※左下に映っているものです。",
    tags: ["Electron", "Windows", "Claude Code"],
    video: "/ccpet-demo.mp4",
    href: "https://github.com/musoukun/ccpet-release/releases/tag/v0.1.0",
    githubUrl: "https://github.com/musoukun/ccpet-release/releases/tag/v0.1.0",
    featured: true,
    featuredLabel: "無料",
  },
  {
    title: "micro",
    description:
      "ショートカットキーで即起動するデスクトップAIアシスタント。テキスト入力・スクリーンショット・音声・クリップボードなど、あらゆる方法でAIに質問できます。会議中に気になったことをその場で解決。YouTube動画の要約にも対応。",
    tags: ["Electron", "AI", "Desktop App"],
    video: "/micro-demo.mp4",
    href: "https://miclau.vercel.app/",
    featured: true,
    featuredLabel: "販売中",
  },
  {
    title: "日本の政党DeepWiki",
    description:
      "政党に関して調べたいことがあったときに、包括的に検索できるツールがあったらいいなと思って考えたものです。AIが動的に最新情報を取得してWikiとニュースページを生成します。",
    tags: ["Search Tool", "Politics", "AI"],
    image: "/seitoudeep.gif",
    href: "https://policy-scope.vercel.app/policy-wiki",
  },
  {
    title: "Komyaku Metaball",
    description:
      "Three.jsを使用したインタラクティブなmetaballシミュレーション。物理演算による球体の分裂・融合を実装。",
    tags: ["Three.js", "React", "WebGL"],
    liveComponent: true,
    href: "/komyaku",
  },
  {
    title: "VOICEVOX × AI Discord Bot",
    description:
      "VOICEVOX音声合成 + AI（Google Gemini / ローカルLLM）を組み合わせたDiscordボット。テキスト読み上げ、AI質問への音声回答、テキストのみのAI回答に対応しています。",
    tags: ["Node.js", "Discord.js", "Gemini", "VOICEVOX"],
    placeholder: { icon: "AI", label: "Voice Bot" },
    href: "https://github.com/musoukun/discordbot-voicevox2",
    githubUrl: "https://github.com/musoukun/discordbot-voicevox2",
  },
  {
    title: "VBA 採点支援システム",
    description:
      "学校の評価項目管理および採点基準設定を自動化するVBAシステム。科目・観点・単元別の評価シートを自動生成。",
    tags: ["VBA", "Excel", "Automation"],
    placeholder: { icon: "VBA", label: "Automation" },
    href: "https://github.com/musoukun/saitenxlsx",
    githubUrl: "https://github.com/musoukun/saitenxlsx",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isFeatured = project.featured;

  return (
    <motion.div
      className={`${isFeatured ? "md:col-span-2 lg:col-span-3" : ""} rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2 transition-all duration-300 hover:border-brand/30`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 + index * 0.08, duration: 0.4 }}
    >
      <a
        href={project.href}
        target={project.href.startsWith("http") ? "_blank" : undefined}
        rel={
          project.href.startsWith("http") ? "noopener noreferrer" : undefined
        }
        className="block rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 overflow-hidden group"
      >
        {isFeatured ? (
          <div className="grid md:grid-cols-2">
            {/* Image / Video */}
            <div className="h-48 md:h-full overflow-hidden diagonal-stripes relative">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover orange-hover-effect"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-4 bg-brand/40" />
                  <span className="text-[10px] tracking-widest uppercase text-brand font-mono font-medium">
                    {project.featuredLabel}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-brand/15 bg-brand/5 px-2.5 py-0.5 text-xs text-neutral-500 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-brand font-medium group-hover:gap-3 transition-all">
                  {project.githubUrl ? "GitHub" : "Demo"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Image / Live / Placeholder */}
            <div className="h-48 overflow-hidden relative diagonal-stripes">
              {project.liveComponent ? (
                <>
                  <ResponsiveFluidBlobs
                    style={{ borderRadius: "0", minHeight: "192px" }}
                  />
                  <div className="absolute bottom-2 right-2 rounded-md bg-black/60 backdrop-blur-sm text-white px-2 py-1 text-[10px] tracking-widest uppercase font-mono">
                    Live
                  </div>
                </>
              ) : project.video ? (
                <>
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {project.featuredLabel && (
                    <div className="absolute top-2 right-2 rounded-md bg-brand/80 backdrop-blur-sm text-white px-2 py-1 text-[10px] tracking-widest uppercase font-mono">
                      {project.featuredLabel}
                    </div>
                  )}
                </>
              ) : project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover orange-hover-effect"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </>
              ) : project.placeholder ? (
                <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-mono text-brand mb-2">
                      {project.placeholder.icon}
                    </div>
                    <div className="text-xs text-neutral-400 tracking-widest uppercase">
                      {project.placeholder.label}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-base font-semibold tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-brand/15 bg-brand/5 px-2.5 py-0.5 text-xs text-neutral-500 dark:text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.githubUrl && (
                <div className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  GitHub
                </div>
              )}
            </div>
          </>
        )}
      </a>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="02"
          label="Portfolio"
          title="Portfolio"
          description="私が開発したWebアプリケーションやツールをご紹介します。"
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-2">
                もっと詳しく見る
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                各プロジェクトの詳細な技術仕様や開発プロセスについては、GitHubリポジトリをご確認ください。
              </p>
            </div>
            <a
              href="https://github.com/musoukun"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-brand text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-brand-hover hover:scale-[1.02] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              GitHub Profile
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
