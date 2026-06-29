import { motion } from 'motion/react';
import { ShieldAlert, Image, CalendarClock, MessageCircle, ShieldCheck } from 'lucide-react';

export default function Pledge() {
  const vows = [
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      title: "The Vow of Zero Gossip",
      tagline: "Absolute, unshakeable confidentiality",
      description: "We protect your privacy with the same rigor as medical confidentiality. We do not discuss your space with friends, family, neighbors, or online. Your home, your situation, and your struggle remain private."
    },
    {
      icon: <Image className="w-5 h-5 text-rose-500" />,
      title: "No Before/After Shaming Photos",
      tagline: "Your vulnerability is not marketing material",
      description: "Many cleaning companies post dramatic 'clutter transformations' on social media for viral clicks. We strictly forbid our team from taking photos of your space, unless you explicitly request them for your personal tracking."
    },
    {
      icon: <CalendarClock className="w-5 h-5 text-rose-500" />,
      title: "Gentle Pacing & Boundaries",
      tagline: "You set the speed of the day",
      description: "We clean at your physical and emotional comfort. If you need us to skip a particular room, start with just one corner, or step out so you can take an anxiety break, we adapt instantly without questions."
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-rose-500" />,
      title: "The Zero-Lecture Promise",
      tagline: "No sighs, no tutting, no unsolicited advice",
      description: "We will never ask 'how did it get like this?', sigh, or offer passive-aggressive tips on how to stay tidy. We do not see laziness; we see a human being whose hands have been full with survival."
    }
  ];

  return (
    <section 
      id="pledge-section" 
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream-50 to-cream-100/50 relative overflow-hidden"
    >
      {/* Decorative sunburst blurred shapes */}
      <div className="absolute top-1/4 right-0 w-[30vw] h-[30vw] rounded-full bg-rose-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[30vw] h-[30vw] rounded-full bg-lavender-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header callout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-rose-100">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500 fill-rose-100" /> Sacred Trust
          </span>
          
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            Our Judgment-Free Pledge
          </h2>
          
          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Inviting someone into an overlooked or cluttered home requires monumental bravery. We honor that courage by showing up with these strict, unbreakable vows of safety.
          </p>
        </div>

        {/* Vows grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {vows.map((vow, idx) => (
            <div 
              key={idx}
              className="glass-panel hover:glass-panel-heavy rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-md border border-white/60 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 border border-rose-100 mt-1">
                {vow.icon}
              </div>
              <div>
                <h3 className="font-serif text-lg text-navy-800 font-semibold">
                  {vow.title}
                </h3>
                <span className="block text-[10px] font-mono uppercase font-bold tracking-wider text-lavender-700 mt-0.5 mb-2.5">
                  {vow.tagline}
                </span>
                <p className="text-navy-600/90 text-xs sm:text-sm leading-relaxed font-light">
                  {vow.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Big centered quote statement */}
        <div className="max-w-3xl mx-auto mt-16 bg-white/60 rounded-3xl p-6 sm:p-8 border border-white/80 text-center shadow-xs">
          <p className="font-serif italic text-navy-800 text-base sm:text-lg leading-relaxed">
            "We aren't here to lecture you on organizing systems or question your habits. We are here to bring fresh air, soft encouragement, and quiet competence so you can rest."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-rose-300" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-navy-400 font-bold">
              The Care Team at Compassionate Cleaning
            </span>
            <span className="h-px w-6 bg-rose-300" />
          </div>
        </div>

      </div>
    </section>
  );
}
