import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquareHeart,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question:
        "What if my home is extremely messy or smells bad? Will you judge me?",
      answer:
        "Never. We are trained, mental-health-informed professionals, not critical inspectors. We have seen spaces in every imaginable condition—from mountains of unwashed laundry to years of unopened mail. Where you see embarrassment, we see a human being who has had their hands full with survival. Our mission is to restore comfort, warmth, and safe breathing space, with absolute dignity.",
    },
    {
      question: "Do I have to clean or tidy up before you arrive?",
      answer:
        "Absolutely not. The entire reason we are coming is that things have felt too heavy to carry alone. Pre-cleaning or sorting out of anxiety is very common, but we strongly encourage you to rest and let us see the space exactly as it is today. You do not need to 'earn' or prepare for our support.",
    },
    {
      question: "Can I stay in the room, or do I need to leave while you work?",
      answer:
        "You are welcome to do whatever feels safest for your mind. Some of our clients put on noise-cancelling headphones and read in a cozy corner. Others prefer 'body-doubling'—working gently alongside us in the same room to maintain momentum. And many choose to take a long-deserved walk to get a complete break. We honor and support whatever you decide.",
    },
    {
      question:
        "What products do you use? I have chemical or scent sensitivities.",
      answer:
        "We use ecological, cruelty-free, and unscented products by default to ensure your reset feels fresh, healthy, and safe. If you have specific respiratory issues, asthma, or chemical sensitivities, simply check the scent sensitivity box on our intake form, and we will formulate a completely hypoallergenic plan.",
    },
    {
      question:
        "How does sliding-scale pricing work for overlooked communities?",
      answer:
        "We believe that a hygienic, peaceful sanctuary is a fundamental wellness right, not an exclusive luxury. We reserve special sliding-scale slots every month for clients navigating low-income, elder transitions, gender-affirming care, or mental health crises. During our initial 15-minute consultation, we can discuss sliding rates privately and without judgment.",
    },
    {
      question: "Will you throw away my letters, books, or personal objects?",
      answer:
        "We never throw away mail, papers, sentimental items, or objects without your explicit, verbal consent. If we encounter cluttered surfaces with bills or personal letters, we place them gently into beautiful, labeled sorting baskets so you can review them at your own speed whenever you feel ready.",
    },
  ];

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
            <MessageSquareHeart className="w-3.5 h-3.5" /> Compassionate
            Dialogue
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-800 font-medium mt-4 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-navy-600/80 text-sm mt-3 leading-relaxed font-light">
            Asking for help with our private spaces is deeply vulnerable. Here
            are answers to the most common worries we hear from our clients.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
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
