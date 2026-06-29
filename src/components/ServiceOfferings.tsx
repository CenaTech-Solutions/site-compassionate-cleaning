import { motion } from "motion/react";
import {
  Sparkles,
  Calendar,
  Coffee,
  Layers,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { ServiceType } from "../types";

interface ServiceOfferingsProps {
  onSelectService: (service: ServiceType) => void;
  onOpenIntake: (service: ServiceType) => void;
}

export default function ServiceOfferings({
  onSelectService,
  onOpenIntake,
}: ServiceOfferingsProps) {
  const services = [
    {
      id: "gentle-reset" as ServiceType,
      icon: <Coffee className="w-5 h-5 text-rose-600" />,
      title: "Gentle Reset Care",
      subtitle: "First Breath of Fresh Air",
      description:
        "Designed specifically for spaces that have piled up during depressive cycles, severe burnout, or intense life storms.",
      features: [
        "Quiet, non-judgmental initial evaluation",
        "Dishes washed, dried, and neatly stacked",
        "Clearing primary walking paths for basic safety",
        "Hygienic bathroom and kitchen disinfection",
        "Garbage and recycling removal",
      ],
      vibe: "Warm, slow-paced, safety-first support",
    },
    {
      id: "maintenance" as ServiceType,
      icon: <Calendar className="w-5 h-5 text-lavender-600" />,
      title: "Maintenance & Comfort",
      subtitle: "Predictable Rhythmic Support",
      description:
        "For chronic illness, long work hours, or daily executive dysfunction where maintaining the baseline is the hardest struggle.",
      features: [
        "Regular, recurring scheduled visits",
        "Surfaces dusted, vacuumed, and mopped",
        "Linen replacement & bed-making",
        "Pantry & fridge maintenance checks",
        "Tidying living rooms and resting zones",
      ],
      vibe: "Predictable, gentle routine",
    },
    {
      id: "deep-transition" as ServiceType,
      icon: <Layers className="w-5 h-5 text-rose-600" />,
      title: "Deep Transition Reset",
      subtitle: "Fresh Canvas, Fresh Pages",
      description:
        "A thorough room-by-room renewal following major life events: grieving, divorce, new babies, or recovery periods.",
      features: [
        "Dusting high fixtures, vents, and baseboards",
        "Thorough kitchen appliances clean (inside/out)",
        "Deep scrub of bathrooms & tile grout",
        "Window sills, frames, and glass detail",
        "Deep rug vacuuming and floor treatment",
      ],
      vibe: "Complete environmental renewal",
    },
    {
      id: "neurodivergent" as ServiceType,
      icon: <HeartHandshake className="w-5 h-5 text-lavender-600" />,
      title: "Neurodivergent & ADHD Support",
      subtitle: "Designed for Unique Brains",
      description:
        "Cleaning coupled with executive function support. We don't force neurotypical systems; we adapt to how your mind runs.",
      features: [
        "Body-doubling (cleaning collaboratively with you)",
        "Quiet presence (using headphones or minimal noise)",
        "Dignified sorting: 'Keep', 'Relocate', 'Donate'",
        "No forced labeling: custom categorizing",
        "Sensory-friendly, unscented eco-cleaning",
      ],
      vibe: "Accommodating, neuro-affirming, sensory-aware",
    },
  ];

  const handleSelect = (serviceType: ServiceType) => {
    onSelectService(serviceType);
    onOpenIntake(serviceType);
  };

  return (
    <section
      id="offerings-section"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-[15%] w-72 h-72 bg-rose-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[15%] w-72 h-72 bg-lavender-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-rose-100">
            <Sparkles className="w-3.5 h-3.5" /> Gentle Frameworks
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            Support that honors your energy
          </h2>
          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            We don't believe in rigid lists or checklists that ignore the human
            in the room. Our care models represent starting points—each one is
            fully tailorable to your mood, pace, and comfort.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-cream-50/30 rounded-3xl p-6 sm:p-8 border border-navy-100/10 shadow-xs flex flex-col justify-between hover:bg-cream-50/60 hover:shadow-sm hover:border-rose-200/50 transition-all duration-300"
            >
              <div>
                {/* Badge Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs text-navy-800">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-lavender-700 bg-lavender-50 px-3 py-1 rounded-full border border-lavender-100/40">
                    {service.vibe}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-navy-800 font-semibold mb-1">
                  {service.title}
                </h3>
                <span className="block text-xs font-medium text-rose-700/90 mb-4">
                  {service.subtitle}
                </span>

                <p className="text-navy-600/90 text-sm leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
                    What this can cover:
                  </span>
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-navy-100/15">
                <button
                  id={`btn-service-select-${service.id}`}
                  onClick={() => handleSelect(service.id)}
                  className="w-full py-3.5 rounded-full bg-navy-800 hover:bg-navy-950 text-warm-white text-xs font-bold tracking-wider uppercase transition-colors text-center shadow-xs"
                >
                  Select & Request {service.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Care box */}
        <div className="mt-12 bg-rose-50/40 rounded-3xl p-6 sm:p-8 border border-rose-100/50 text-center max-w-4xl mx-auto">
          <h3 className="font-serif text-xl text-navy-800 font-medium">
            Don't see exactly what you need?
          </h3>
          <p className="text-navy-600/80 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Our most popular care plan is simply **Bespoke Custom Care**. Let us
            know which boundaries or requirements feel safest for you, and we
            will construct a visit that respects your terms.
          </p>
          <button
            id="btn-select-custom-care"
            onClick={() => handleSelect("custom-care")}
            className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Design a custom care plan
          </button>
        </div>
      </div>
    </section>
  );
}
