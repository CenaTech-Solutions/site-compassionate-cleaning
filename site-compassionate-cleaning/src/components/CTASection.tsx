'use client'

import { motion } from "motion/react";
import {
  Heart,
  ShieldCheck,
  Clock,
  Sparkles,
  CalendarHeart,
  type LucideIcon,
} from "lucide-react";
import type { CTABlock } from "@/cms-types";

interface CTASectionProps {
  onBegin: () => void;
  data: CTABlock;
}

const REASSURANCE_ICON_MAP: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  clock: Clock,
  heart: Heart,
  sparkles: Sparkles,
};

export default function CTASection({ onBegin, data }: CTASectionProps) {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-linear-to-b from-navy-800 to-navy-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] max-w-2xl rounded-full bg-rose-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-96 h-96 rounded-full bg-lavender-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-96 h-96 rounded-full bg-rose-500/8 blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <CalendarHeart className="w-3.5 h-3.5" />
            {data.sectionLabel}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-medium leading-[1.1] tracking-tight mb-6"
        >
          {data.headline}
          <br className="hidden sm:block" />{" "}
          <em className="text-rose-300 not-italic">{data.headlineHighlight}</em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-rose-100/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <button
            id="cta-btn-book-now"
            onClick={onBegin}
            className="group inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-rose-500 hover:bg-rose-400 text-white text-base font-bold tracking-wide transition-all duration-300 shadow-lg shadow-rose-900/40 hover:shadow-xl hover:shadow-rose-900/50 hover:-translate-y-0.5 cursor-pointer"
          >
            <CalendarHeart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {data.buttonText}
          </button>
          <p className="mt-4 text-rose-100/40 text-xs font-mono tracking-wide">
            {data.buttonSubtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {(data.reassurances ?? []).map((item, i) => {
            const IconComponent = REASSURANCE_ICON_MAP[item.iconType] ?? Heart;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-rose-100/60 text-xs font-medium"
              >
                <span className="text-rose-400">
                  <IconComponent className="w-4 h-4" />
                </span>
                {item.label}
              </span>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/10 max-w-xl mx-auto"
        >
          <p className="font-serif italic text-rose-100/50 text-sm sm:text-base leading-relaxed">
            "{data.quote}"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-5 bg-rose-500/40" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400/60 font-semibold">
              {data.quoteAttribution}
            </span>
            <span className="h-px w-5 bg-rose-500/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
