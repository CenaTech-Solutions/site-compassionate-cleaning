import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Smile,
  ShieldCheck,
  HeartHandshake,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { FeelingOption, ServiceType } from "../types";

interface InteractiveCompassProps {
  onSelectService: (service: ServiceType) => void;
}

export default function InteractiveCompass({
  onSelectService,
}: InteractiveCompassProps) {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  const feelings: FeelingOption[] = [
    {
      id: "overwhelmed",
      emoji: "🕯️",
      label: "Completely Overwhelmed",
      message:
        "When executive dysfunction, stress, or chronic illness builds up, dishes and laundry are not moral failures. They are just objects waiting for gentle hands.",
      validation:
        'You do not have to "earn" a clean home. Your worth is completely separate from your productivity, and you are worthy of a peaceful sanctuary right now.',
      recommendation: {
        title: "Gentle Reset Care",
        description:
          "A slow-paced, deeply compassionate initial cleaning that focuses on restoring basic safety, hygiene, and comfortable breathing room.",
        serviceType: "gentle-reset",
      },
    },
    {
      id: "exhausted",
      emoji: "🪵",
      label: "Physically Exhausted or Sore",
      message:
        "Whether living with chronic pain, recovering from medical treatment, or battling deep physical burnout, your body is asking for respite.",
      validation:
        "Let us take the physical weight of scrubbing, bending, and lifting off your shoulders. Your job is simply to rest and heal in a clean, nourishing space.",
      recommendation: {
        title: "Maintenance Care & Comfort",
        description:
          "Consistent, predictable cleaning visits that maintain your home’s clarity so you can prioritize your physical wellness and recovery.",
        serviceType: "maintenance",
      },
    },
    {
      id: "transitioning",
      emoji: "🌿",
      label: "In a Hard Life Transition",
      message:
        "Grief, a sudden move, ending a relationship, or welcoming a new baby requires every ounce of your emotional energy. Cleaning is often the first thing to slip.",
      validation:
        "Transitions are fragile times. Asking for support during a storm is a profound act of self-care, not a sign of giving up.",
      recommendation: {
        title: "Deep Transition Support",
        description:
          "Comprehensive, detailed care that resets your entire environment so you can turn the page with fresh air and mental space.",
        serviceType: "deep-transition",
      },
    },
    {
      id: "ashamed",
      emoji: "🩹",
      label: "Anxious or Ashamed of My Space",
      message:
        "Many of our clients haven’t let anyone into their homes for months—or years—out of fear of judgment. We hear you, and we see your incredible courage.",
      validation:
        "Our professionals are trained in trauma-informed care. We do not gossip, we do not take shaming before/after photos, and we do not lecture. We only care.",
      recommendation: {
        title: "Custom Compass Care",
        description:
          "A bespoke service where we establish strict boundaries together—such as starting in just one quiet room while you get comfortable.",
        serviceType: "custom-care",
      },
    },
    {
      id: "neurodivergent",
      emoji: "✨",
      label: "Neurodivergent / ADHD Fatigue",
      message:
        "Standard organization guides assume everyone’s brain works the same. When executive function runs dry, organizing systems feel like a hostile maze.",
      validation:
        "We work with your brain, not against it. We support body-doubling (cleaning side-by-side) or can work quietly while you wear noise-cancelling headphones.",
      recommendation: {
        title: "Neurodivergent & ADHD Support",
        description:
          "Cleaning paired with judgment-free organization that aligns with your specific routines, focusing on accessibility and visual peace.",
        serviceType: "neurodivergent",
      },
    },
  ];

  const currentFeeling = feelings.find((f) => f.id === selectedFeeling);

  const handleRecommendClick = (serviceType: ServiceType) => {
    onSelectService(serviceType);
    // Smooth scroll to intake form
    const formElement = document.getElementById("intake-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12" id="feelings-navigator">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 border border-rose-100">
          <Smile className="w-3.5 h-3.5" /> Heart-Centered Guidance
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-navy-800 font-medium mt-3 leading-tight">
          How does your space make you feel today?
        </h2>
        <p className="text-navy-600/80 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Select a state of mind below. We build our cleaning support entirely
          around your emotional comfort and energy level.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Feelings selector columns (Left) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {feelings.map((feeling) => {
            const isSelected = selectedFeeling === feeling.id;
            return (
              <button
                key={feeling.id}
                id={`feeling-btn-${feeling.id}`}
                onClick={() => setSelectedFeeling(feeling.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                  isSelected
                    ? "bg-navy-800 border-navy-800 text-warm-white shadow-md scale-[1.02]"
                    : "bg-white/80 hover:bg-white border-white/50 hover:border-rose-200/50 text-navy-800 shadow-sm"
                }`}
              >
                <span className="text-2xl bg-cream-50/10 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                  {feeling.emoji}
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block font-medium text-sm sm:text-base ${isSelected ? "text-warm-white" : "text-navy-800"}`}
                  >
                    {feeling.label}
                  </span>
                  <span
                    className={`block text-xs truncate ${isSelected ? "text-rose-100" : "text-navy-500"}`}
                  >
                    Click to explore support
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Validation and recommendation box (Right) */}
        <div className="lg:col-span-7 h-full min-h-[380px]">
          <AnimatePresence mode="wait">
            {currentFeeling ? (
              <motion.div
                key={currentFeeling.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/60 shadow-sm flex flex-col justify-between h-full relative"
              >
                {/* Floating soft glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/30 to-lavender-50/30 rounded-3xl -z-10" />

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{currentFeeling.emoji}</span>
                    <div>
                      <h4 className="font-serif text-lg text-navy-800 font-medium">
                        We hear you.
                      </h4>
                      <p className="text-xs font-mono text-lavender-700 tracking-wider uppercase font-semibold">
                        {currentFeeling.label}
                      </p>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-rose-300 pl-4 py-1 my-4">
                    <p className="text-navy-800 font-serif italic text-base sm:text-lg leading-relaxed">
                      "{currentFeeling.message}"
                    </p>
                  </blockquote>

                  <p className="text-navy-600/90 text-sm leading-relaxed mb-6">
                    {currentFeeling.validation}
                  </p>

                  <div className="bg-white/60 rounded-2xl p-4 border border-rose-100/50">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600 shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="block font-serif text-sm font-medium text-navy-800">
                          Recommended Service:{" "}
                          {currentFeeling.recommendation.title}
                        </span>
                        <p className="text-xs text-navy-600/80 mt-1">
                          {currentFeeling.recommendation.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-100/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-navy-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-500" /> Fully
                    custom, judgment-free approach
                  </span>
                  <button
                    id={`recommendation-select-${currentFeeling.recommendation.serviceType}`}
                    onClick={() =>
                      handleRecommendClick(
                        currentFeeling.recommendation.serviceType,
                      )
                    }
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow group"
                  >
                    Select This Care & Fill Form
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border border-dashed border-navy-200/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-navy-500 bg-white/40 min-h-[380px]">
                <HeartHandshake className="w-12 h-12 text-rose-300 stroke-[1.5] mb-4 animate-pulse" />
                <h4 className="font-serif text-lg text-navy-800 font-medium">
                  We are here to hold space for you.
                </h4>
                <p className="text-xs sm:text-sm text-navy-500/80 max-w-xs mt-2">
                  Select your current emotional or physical fatigue level on the
                  left, and we will guide you to a care method that honors your
                  energy.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
