"use client";

import { motion } from "motion/react";

interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  number,
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-14 space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-pixel text-xs text-brand flex items-center gap-3">
        <span>{number}</span>
        <span className="h-px w-12 bg-brand/50" />
        <span className="uppercase text-night-muted">{label}</span>
      </p>

      <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-night-text">
        {title}
        <span className="text-brand ember-glow">.</span>
      </h2>

      {description && (
        <p className="text-night-muted max-w-2xl text-sm leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
