export default function Footer() {
  return (
    <footer className="relative border-t border-night-line bg-night/80 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-pixel text-[10px] text-night-muted">
          &copy; 2025 Hatakeyama
        </p>
        <p className="font-pixel text-[10px] text-night-muted">
          Built with Next.js, TypeScript &amp; three.js
        </p>
      </div>
    </footer>
  );
}
