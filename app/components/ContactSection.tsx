"use client";

import { motion } from "motion/react";
import { Mail, Github, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "waroshi@gmail.com",
    href: "mailto:waroshi@gmail.com",
    mono: "@",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/musoukun",
    href: "https://github.com/musoukun",
    mono: "GH",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="04" label="Contact" title="Contact" />

        <div className="max-w-lg">
          <motion.p
            className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            お問い合わせ機能は現在開発中です。ご連絡は下記メールアドレスまでお願いします。
          </motion.p>

          <div className="space-y-3">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex items-center gap-4 rounded-2xl border border-dashed border-black/5 dark:border-white/10 p-2 hover:border-brand/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.1 }}
              >
                <div className="flex-1 flex items-center gap-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/2 dark:bg-white/3 p-4">
                  <span className="w-10 h-10 bg-brand/10 text-brand flex items-center justify-center rounded-lg font-mono text-sm font-semibold">
                    {link.mono}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-neutral-400 uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className="text-sm font-medium group-hover:text-brand transition-colors">
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
