export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-neutral-400">
          &copy; 2025 Hatakeyama
        </p>
        <p className="text-xs text-neutral-400">
          Built with Next.js &amp; TypeScript
        </p>
      </div>
    </footer>
  );
}
