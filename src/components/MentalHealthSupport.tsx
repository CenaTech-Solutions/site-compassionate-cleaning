import { motion } from "motion/react";
import {
  Sparkles,
  BrainCircuit,
  Heart,
  EyeOff,
  Activity,
  Milestone,
} from "lucide-react";

export default function MentalHealthSupport() {
  const supportCategories = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-lavender-700" />,
      title: "ADHD & Executive Dysfunction",
      description:
        "Organizing systems are often built for typical brains. We provide body-doubling (working alongside you) or design quiet visual cues that support your flow without overwhelm.",
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-700" />,
      title: "Depression & Fatigue Reset",
      description:
        "When survival is your only task, tidy countertops slip. We step in with zero lectures to lift the heavy weight, leaving you with a fresh, airy space to breathe and heal.",
    },
    {
      icon: <EyeOff className="w-5 h-5 text-lavender-700" />,
      title: "Clutter & Hoarding Recovery",
      description:
        "We work slowly and consensually. We never throw anything away without your verbal permission, protecting your comfort and privacy every step of the journey.",
    },
    {
      icon: <Activity className="w-5 h-5 text-rose-700" />,
      title: "Chronic Illness & Physical Limits",
      description:
        "Scrubbing floors or lifting vacuums can cause intense pain or exhaustion. We serve as your physical extensions, keeping your space hygienic and fully supporting your safety.",
    },
    {
      icon: <Milestone className="w-5 h-5 text-lavender-700" />,
      title: "Life Transitions & Caregiver Respite",
      description:
        "Grief, divorce, postpartum, or intense workloads drain mental resources. We carry the visual noise out of your space so you can safely process the changes in your life.",
    },
  ];

  return (
    <section
      id="connection-section"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
    >
      {/* Design accents - soft colored curved shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-80 h-80 rounded-full bg-lavender-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-rose-50/70 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-lavender-700 uppercase bg-lavender-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-lavender-100">
            <Sparkles className="w-3.5 h-3.5" /> The Mind-Home Connection
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            Our homes and our minds are constantly speaking.
          </h2>

          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            When visual clutter, laundry hills, and dust gather, they create an
            echoing mental noise. We do not see "mess" as laziness—we see it as
            a courageous story of someone who has had their hands full with
            survival.
          </p>
        </div>

        {/* Categories Grid (Modular, beautiful) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {supportCategories.map((category, index) => (
            <div
              key={index}
              className="bg-cream-50/50 hover:bg-cream-100/40 rounded-3xl p-6 sm:p-8 border border-navy-100/10 hover:border-rose-200/50 transition-all duration-300 shadow-xs hover:shadow-sm group flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs mb-6 group-hover:scale-105 transition-transform duration-300">
                  {category.icon}
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
          ))}

          {/* Call to action card */}
          <div className="bg-gradient-to-tr from-navy-800 to-navy-950 text-warm-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold block mb-2">
                Need something customized?
              </span>

              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-4 leading-snug">
                Your situation is unique. We are entirely adaptable.
              </h3>

              <p className="text-rose-100/80 text-xs sm:text-sm leading-relaxed font-light">
                Tell us exactly what boundaries or pacing you need. Whether that
                means starting with just one small box of laundry or doing a
                completely silent clean—we are here to support your peace.
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
              Share Your Story Safely
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
