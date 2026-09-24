/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
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

function ProjectMedia({
  project,
  videoRef,
}: {
  project: Project;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  if (project.liveComponent)
    return (
      <>
        <ResponsiveFluidBlobs style={{ borderRadius: "0", minHeight: "100%" }} />
        <span className="font-pixel absolute bottom-2 right-2 bg-night/80 text-brand px-2 py-1 text-[10px]">
          LIVE
        </span>
      </>
    );
  if (project.video)
    return (
      <video
        ref={videoRef}
        src={project.video}
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    );
  if (project.image)
    return (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover"
      />
    );
  if (project.placeholder)
    return (
      <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_60%,rgba(255,159,28,0.18),transparent_60%)]">
        <div className="text-center">
          <div className="font-pixel text-6xl text-brand ember-glow mb-3">
            {project.placeholder.icon}
          </div>
          <div className="font-pixel text-xs text-night-muted uppercase">
            {project.placeholder.label}
          </div>
        </div>
      </div>
    );
  return null;
}

// One project in the pinned showcase: it flies in from the depth, holds
// at the centre while its slice of the scroll is active, then lifts away.
function ProjectSlide({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const slice = 1 / total;
  const mid = (index + 0.5) * slice;
  const input = [mid - slice * 0.62, mid - slice * 0.22, mid + slice * 0.22, mid + slice * 0.62];
  const side = index % 2 === 0 ? 1 : -1;

  const opacity = useTransform(progress, input, [0, 1, 1, 0]);
  const z = useTransform(progress, input, [-700, 0, 0, 250]);
  const y = useTransform(progress, input, [140, 0, 0, -220]);
  const rotateX = useTransform(progress, input, [28, 0, 0, -18]);
  const rotateY = useTransform(progress, input, [side * 22, 0, 0, side * -8]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.6 ? "auto" : "none"));
  // Play the demo video only while its card is front and centre.
  const videoRef = useRef<HTMLVideoElement>(null);
  useMotionValueEvent(opacity, "change", (v) => {
    const video = videoRef.current;
    if (!video) return;
    if (v > 0.6 && video.paused) video.play().catch(() => {});
    else if (v <= 0.6 && !video.paused) video.pause();
  });
  const external = project.href.startsWith("http");

  return (
    <motion.article
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity, z, y, rotateX, rotateY, pointerEvents }}
    >
      <a
        href={project.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="panel group grid md:grid-cols-[1.25fr_1fr] w-full max-w-5xl overflow-hidden !bg-night/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] hover:border-brand/40 transition-colors"
      >
        <div className="relative aspect-video md:aspect-auto md:min-h-[360px] bg-night overflow-hidden">
          <ProjectMedia project={project} videoRef={videoRef} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between gap-5">
          <div>
            <div className="font-pixel text-xs flex items-center gap-3 mb-3">
              <span className="text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-night-muted">/ {String(total).padStart(2, "0")}</span>
              {project.featuredLabel && (
                <span className="ml-auto bg-brand text-night px-2 py-0.5 text-[10px]">
                  {project.featuredLabel}
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-night-text mb-3">
              {project.title}
            </h3>
            <p className="text-night-muted text-sm leading-relaxed whitespace-pre-line line-clamp-6">
              {project.description}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-pixel border border-night-line px-2 py-0.5 text-[10px] text-rain"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="font-pixel inline-flex items-center gap-2 text-xs text-brand group-hover:gap-3 transition-all">
              {project.githubUrl ? "GITHUB" : "DEMO"}
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

function ProgressRail({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 h-56 flex-col items-center gap-3">
      <span className="font-pixel text-[10px] text-night-muted">01</span>
      <div className="relative w-px flex-1 bg-night-line">
        <motion.div className="absolute top-0 left-0 w-px bg-brand" style={{ height }} />
      </div>
      <span className="font-pixel text-[10px] text-night-muted">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function PortfolioSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.0005,
  });

  return (
    <>
      <section
        id="portfolio"
        ref={ref}
        className="relative"
        style={{ height: `${projects.length * 90 + 60}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 pt-24">
            <SectionHeader
              number="02"
              label="Portfolio"
              title="Portfolio"
              description="私が開発したWebアプリケーションやツールをご紹介します。"
            />
          </div>
          <div
            className="absolute inset-x-0 top-56 bottom-4"
            style={{ perspective: 1400 }}
          >
            {projects.map((project, index) => (
              <ProjectSlide
                key={project.title}
                project={project}
                index={index}
                total={projects.length}
                progress={progress}
              />
            ))}
          </div>
          <ProgressRail progress={progress} total={projects.length} />
        </div>
      </section>

      {/* GitHub CTA */}
      <div className="relative max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          className="panel p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-2 text-night-text">
              もっと詳しく見る
            </h3>
            <p className="text-night-muted text-sm">
              各プロジェクトの詳細な技術仕様や開発プロセスについては、GitHubリポジトリをご確認ください。
            </p>
          </div>
          <a
            href="https://github.com/musoukun"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel shrink-0 inline-flex items-center gap-2 bg-brand text-night px-6 py-3 text-xs uppercase shadow-[4px_4px_0_0_#03050d] hover:bg-brand-hover hover:-translate-y-0.5 transition-all"
          >
            GitHub Profile
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </>
  );
}
