'use client'

import {
  Sparkles,
  Calendar,
  Coffee,
  Layers,
  HeartHandshake,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { ServiceType } from "@/types";
import type { OfferingsBlock, ServiceItem } from "@/cms-types";

interface ServiceOfferingsProps {
  data: OfferingsBlock;
  onSelectService: (service: ServiceType) => void;
  onOpenIntake: (service: ServiceType) => void;
}

const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  coffee: Coffee,
  calendar: Calendar,
  layers: Layers,
  "heart-handshake": HeartHandshake,
};

const SERVICE_ICON_COLOR_MAP: Record<string, string> = {
  coffee: "text-rose-600",
  calendar: "text-lavender-600",
  layers: "text-rose-600",
  "heart-handshake": "text-lavender-600",
};

export default function ServiceOfferings({
  data,
  onSelectService,
  onOpenIntake,
}: ServiceOfferingsProps) {
  const handleSelect = (serviceSlug: string) => {
    const validSlugs: ServiceType[] = [
      "gentle-reset",
      "maintenance",
      "deep-transition",
      "neurodivergent",
      "custom-care",
    ];
    const slug = validSlugs.includes(serviceSlug as ServiceType)
      ? (serviceSlug as ServiceType)
      : "gentle-reset";
    onSelectService(slug);
    onOpenIntake(slug);
  };

  return (
    <section
      id="offerings-section"
      className="min-h-screen flex items-center py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-[15%] w-72 h-72 bg-rose-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[15%] w-72 h-72 bg-lavender-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-rose-100">
            <Sparkles className="w-3.5 h-3.5" /> {data.sectionLabel}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            {data.headline}
          </h2>
          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            {data.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {(data.services ?? []).map((service: ServiceItem) => {
            const IconComponent = SERVICE_ICON_MAP[service.iconType] ?? Coffee;
            const iconColor = SERVICE_ICON_COLOR_MAP[service.iconType] ?? "text-rose-600";
            return (
              <div
                key={service.id}
                className="bg-cream-50/30 rounded-3xl p-6 sm:p-8 border border-navy-100/10 shadow-xs flex flex-col justify-between hover:bg-cream-50/60 hover:shadow-sm hover:border-rose-200/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs text-navy-800">
                      <IconComponent className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    {service.vibe && (
                      <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-lavender-700 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-100/40">
                        {service.vibe}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-navy-800 font-semibold mb-1">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <span className="block text-xs font-medium text-rose-700/90 mb-4">
                      {service.subtitle}
                    </span>
                  )}

                  <p className="text-navy-600/90 text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  {(service.features ?? []).length > 0 && (
                    <div className="space-y-3 mb-8">
                      <span className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
                        What this can cover:
                      </span>
                      {(service.features ?? [] as { feature: string }[]).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-700">
                          <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span className="font-light">{f.feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-navy-100/15">
                  <button
                    id={`btn-service-select-${service.serviceSlug}`}
                    onClick={() => handleSelect(service.serviceSlug)}
                    className="w-full py-3.5 rounded-full bg-navy-800 hover:bg-navy-950 text-warm-white text-xs font-bold tracking-wider uppercase transition-colors text-center shadow-xs"
                  >
                    Select & Request {service.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Care box */}
        <div className="mt-12 bg-rose-50/40 rounded-3xl p-6 sm:p-8 border border-rose-100/50 text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-xl text-navy-800 font-medium">
            {data.customCareTitle}
          </h3>
          <p className="text-navy-600/80 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            {data.customCareDescription}
          </p>
          <button
            id="btn-select-custom-care"
            onClick={() => handleSelect("custom-care")}
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            {data.customCareButtonText}
          </button>
        </div>
      </div>
    </section>
  );
}
