import { motion } from "motion/react";
import { Flower, ArrowDown, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import ownerImg from "@/assets/images/cc-bio-pic.webp";

interface HeroProps {
  onExploreSupport: () => void;
  onBegin: () => void;
}

export default function Hero({ onExploreSupport, onBegin }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 88;
      const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 flex items-center relative overflow-hidden bg-linear-to-b from-warm-white via-cream-50/50 to-cream-50"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-linear-to-br from-rose-200/30 to-lavender-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-15%] w-[45vw] h-[45vw] rounded-full bg-linear-to-tr from-cream-100 to-rose-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-[10%] left-[25%] w-32 h-32 rounded-full bg-white/40 blur-2xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* ── Left column: text ── */}
        <div className="lg:col-span-7 text-left space-y-6 sm:space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-medium text-xs tracking-wider uppercase"
          >
            <Flower className="w-4.5 h-4.5 text-rose-500 fill-rose-300" />
            Judgment-Free Support
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-navy-800 font-medium tracking-tight leading-[1.1]"
            >
              Your worth is not measured by the state of your home.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-navy-600/95 font-sans text-base sm:text-lg max-w-2xl leading-relaxed font-light"
            >
              Welcome to{" "}
              <span className="font-semibold text-navy-800">Compassionate Cleaning</span>.
              Whether you are living with mental health struggles, neurodivergent
              executive exhaustion, a major transition, or physical limits, we clean
              with care, dignity, and absolute zero judgment.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              id="hero-btn-begin"
              onClick={onBegin}
              className="px-8 py-4 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg text-center cursor-pointer"
            >
              Request a Gentle Visit
            </button>

            <button
              id="hero-btn-explore"
              onClick={onExploreSupport}
              className="px-8 py-4 rounded-full bg-white/70 hover:bg-white text-navy-800 text-sm font-semibold tracking-wide border border-navy-100/50 hover:border-rose-200/60 transition-all duration-300 text-center shadow-xs cursor-pointer"
            >
              How we support you
            </button>
          </motion.div>

          {/* Reassurance badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-navy-100/50 max-w-xl"
          >
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-navy-800">Trauma-Informed & Safe</span>
                <span className="block text-[11px] text-navy-500">
                  Every member trained in empathy, quiet presence, and custom pace.
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Heart className="w-5 h-5 text-lavender-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold text-navy-800">No Pre-Cleaning Expected</span>
                <span className="block text-[11px] text-navy-500">
                  No moralizing, no lecturing, and absolutely no shame.
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Right column: owner portrait ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <div className="relative w-full max-w-md">

            {/* Soft glow behind the portrait */}
            <div className="absolute -inset-8 rounded-full bg-linear-to-br from-rose-200/50 to-lavender-200/40 blur-3xl pointer-events-none" />

            {/* Decorative rotated backing card */}
            <div className="absolute -inset-3 rounded-[2.5rem] bg-linear-to-br from-rose-200/70 via-lavender-100/60 to-rose-100/50 -rotate-3 pointer-events-none" />

            {/* Thin white spacer ring */}
            <div className="absolute -inset-1.5 rounded-[2.25rem] bg-white/80 pointer-events-none" />

            {/* Portrait frame */}
            <div className="relative rounded-4xl overflow-hidden shadow-2xl shadow-navy-900/20 ring-1 ring-white/60"
              style={{ height: "660px" }}
            >
              <img
                src={ownerImg}
                alt="Founder of Compassionate Cleaning"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom gradient for caption legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-navy-900/65 via-navy-900/10 to-transparent pointer-events-none" />

              {/* Frosted caption */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                <p className="font-serif text-warm-white text-lg font-medium leading-snug drop-shadow">
                  A human who <em>gets it</em> — here to help, never to judge.
                </p>
                <span className="mt-1.5 inline-block text-[11px] tracking-widest uppercase font-semibold text-rose-200/90">
                  Founder & Lead Cleaner
                </span>
              </div>
            </div>

            {/* Floating 5-star badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white shadow-xl border border-rose-100/60 z-10"
            >
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-rose-400 text-rose-400" />
                ))}
              </span>
              <span className="text-[11px] font-semibold text-navy-700">5-star rated</span>
            </motion.div>

            {/* Floating zero-judgment pill — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-linear-to-r from-rose-50 to-lavender-50 shadow-xl border border-lavender-100/60 z-10"
            >
              <Sparkles className="w-3.5 h-3.5 text-lavender-500 shrink-0" />
              <span className="text-[11px] font-semibold text-navy-700">Zero-judgment, always</span>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer select-none z-10"
        onClick={() => scrollToSection("connection-section")}
      >
        <span className="text-[10px] font-mono tracking-widest text-navy-400 uppercase font-bold animate-pulse">
          Scroll to explore
        </span>
        <ArrowDown className="w-4 h-4 text-rose-400 animate-bounce" />
      </div>
    </section>
  );
}
