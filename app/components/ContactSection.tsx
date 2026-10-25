"use client";

import { motion } from "motion/react";
import { Mail, Github, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { CONTACT_LINKS, CONTACT_NOTE } from "@/lib/contact";

// 連絡先の中身は lib/contact.ts (Open Spire の特設サイトと共通)。ここでは見た目のアイコンと略号だけ足す
const LOOKS = { email: { icon: Mail, mono: "@" }, github: { icon: Github, mono: "GH" } };
const contactLinks = CONTACT_LINKS.map((link) => ({ ...link, ...LOOKS[link.kind] }));

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="04" label="Contact" title="Contact" />

        <div className="max-w-lg">
          <motion.p
            className="text-night-muted leading-relaxed mb-8 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {CONTACT_NOTE}
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
                className="flex items-center gap-4 group block"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.1 }}
              >
                <div className="panel flex items-center gap-4 p-4 group-hover:border-brand/40 transition-colors">
                  <span className="w-10 h-10 bg-brand/10 text-brand flex items-center justify-center rounded-lg font-mono text-sm font-semibold">
                    {link.mono}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-night-muted uppercase tracking-wider">
                      {link.label}
                    </p>
                    <p className="text-sm font-medium group-hover:text-brand transition-colors">
                      {link.value}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-night-muted group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
