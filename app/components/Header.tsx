"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-stone-50/90 dark:bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl font-bold tracking-tight hover:text-brand transition-colors"
        >
          H.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-xs tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-neutral-600 dark:text-neutral-400 p-2 hover:bg-brand/5 rounded-lg transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-stone-50/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-xs tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-brand hover:bg-brand/5 rounded-lg transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
