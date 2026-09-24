export default function Footer() {
  return (
    <footer className="relative border-t border-night-line bg-night/85 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-night-text">
          背景の街のアニメーションとサイトは、画像を使わずプログラムで作成しました（Next.js / TypeScript / three.js）
        </p>
        <p className="font-pixel text-[10px] text-night-muted shrink-0">
          &copy; 2025 Hatakeyama
        </p>
      </div>
    </footer>
  );
}
