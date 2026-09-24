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
          ? "bg-night/70 backdrop-blur-xl border-b border-night-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-pixel text-lg text-night-text hover:text-brand transition-colors"
        >
          H<span className="text-brand ember-glow">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="font-pixel px-4 py-2 text-xs uppercase text-night-muted hover:text-brand transition-colors duration-200"
            >
              <span className="text-brand/60 mr-1.5">0{i + 1}</span>
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-night-muted p-2 hover:text-brand transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-night/95 backdrop-blur-xl border-b border-night-line">
          <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {navItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-pixel block px-4 py-3 text-xs uppercase text-night-muted hover:text-brand transition-colors"
              >
                <span className="text-brand/60 mr-2">0{i + 1}</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
