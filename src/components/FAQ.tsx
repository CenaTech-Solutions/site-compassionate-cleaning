'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, MessageSquareHeart } from "lucide-react";
import type { FAQBlock } from "@/cms-types";

interface FAQProps {
  data: FAQBlock;
}

export default function FAQ({ data }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className="min-h-screen flex items-center py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-50/70 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-rose-100/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-lavender-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-lavender-700 uppercase bg-lavender-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-lavender-100">
            <MessageSquareHeart className="w-3.5 h-3.5" /> {data.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-800 font-medium mt-4 leading-tight">
            {data.headline}
          </h2>
          <p className="text-navy-600/80 text-sm mt-3 leading-relaxed font-light">
            {data.description}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {(data.items ?? []).map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-navy-100/10 shadow-xs hover:shadow-sm overflow-hidden transition-shadow duration-300"
              >
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left px-6 sm:px-8 py-5 flex items-center justify-between gap-4 text-navy-800 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg font-medium text-navy-800 hover:text-rose-700 transition-colors">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-cream-50 flex items-center justify-center text-navy-500 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 text-navy-600/90 text-sm leading-relaxed border-t border-cream-50 font-light">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
