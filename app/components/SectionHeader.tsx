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
      className="mb-16 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative badge with lines */}
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand/30" />
        <div className="flex items-center gap-2 rounded-lg border border-brand/20 bg-brand/5 px-3 py-1.5">
          <span className="font-mono text-xs font-medium text-brand">
            {number}
          </span>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {label}
          </span>
        </div>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand/30" />
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl text-sm leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
