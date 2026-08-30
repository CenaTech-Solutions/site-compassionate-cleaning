'use client'

import {
  Sparkles,
  BrainCircuit,
  Heart,
  EyeOff,
  Activity,
  Milestone,
  type LucideIcon,
} from "lucide-react";
import type { MentalHealthBlock } from "@/cms-types";

interface MentalHealthSupportProps {
  data: MentalHealthBlock;
}

const ICON_MAP: Record<string, LucideIcon> = {
  "brain-circuit": BrainCircuit,
  heart: Heart,
  "eye-off": EyeOff,
  activity: Activity,
  milestone: Milestone,
};

const ICON_COLOR_MAP: Record<string, string> = {
  "brain-circuit": "text-lavender-700",
  heart: "text-rose-700",
  "eye-off": "text-lavender-700",
  activity: "text-rose-700",
  milestone: "text-lavender-700",
};

export default function MentalHealthSupport({ data }: MentalHealthSupportProps) {
  return (
    <section
      id="connection-section"
      className="min-h-screen flex items-center py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <div className="absolute top-[-10%] left-[-5%] w-80 h-80 rounded-full bg-lavender-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-rose-50/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-lavender-700 uppercase bg-lavender-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-lavender-100">
            <Sparkles className="w-3.5 h-3.5" /> {data.sectionLabel}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            {data.headline}
          </h2>

          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            {data.description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(data.categories ?? []).map((category) => {
            const IconComponent = ICON_MAP[category.iconType] ?? Heart;
            const iconColor = ICON_COLOR_MAP[category.iconType] ?? "text-rose-700";
            return (
              <div
                key={category.id}
                className="bg-cream-50/50 hover:bg-cream-100/40 rounded-3xl p-6 sm:p-8 border border-navy-100/10 hover:border-rose-200/50 transition-all duration-300 shadow-xs hover:shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs mb-6 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className={`w-5 h-5 ${iconColor}`} />
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl text-navy-800 font-medium mb-3">
                    {category.title}
                  </h3>

                  <p className="text-navy-600/90 text-xs sm:text-sm leading-relaxed font-light">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-100/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-rose-700">
                    Consensual & Dignified Care
                  </span>
                </div>
              </div>
            );
          })}

          {/* Call to action card */}
          <div className="bg-gradient-to-tr from-navy-800 to-navy-950 text-warm-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold block mb-2">
                {data.ctaCardEyebrow}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-4 leading-snug">
                {data.ctaCardTitle}
              </h3>

              <p className="text-rose-100/80 text-xs sm:text-sm leading-relaxed font-light">
                {data.ctaCardDescription}
              </p>
            </div>

            <button
              id="btn-connection-custom-request"
              onClick={() => {
                const formElement = document.getElementById("intake-section");
                if (formElement) {
                  formElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="mt-6 w-full py-3 bg-white hover:bg-rose-50 text-navy-800 hover:text-rose-700 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm"
            >
              {data.ctaCardButtonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
