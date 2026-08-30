'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Heart, PhoneCall } from "lucide-react";
import type { SiteSettingsData } from "@/cms-types";

interface HeaderProps {
  onBegin: () => void;
  siteSettings: SiteSettingsData;
}

export default function Header({ onBegin, siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const brandName = siteSettings.brandName || "Compassionate Cleaning";
  const tagline = siteSettings.tagline || "Care • Dignity • Mental Wellness";
  const phone = siteSettings.phone || "(917) 555-0143";
  const phoneTel = siteSettings.phoneTel || "9175550143";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "glass-panel shadow-sm py-3 px-6 border-white/60"
            : "bg-transparent py-4 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="header-logo-btn"
            onClick={() => scrollToSection("hero-section")}
            className="flex items-center gap-2 text-left select-none group"
          >
            <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-300/30 group-hover:scale-105 transition-transform duration-300">
              <Heart className="w-5 h-5 fill-rose-500/20 text-rose-600" />
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg text-navy-800 block tracking-tight">
                {brandName}
              </span>
              <span className="text-[9px] font-mono tracking-wider text-rose-700 uppercase block font-semibold">
                {tagline}
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <button
              id="nav-link-connection"
              onClick={() => scrollToSection("connection-section")}
              className="text-navy-600/80 hover:text-navy-900 transition-colors py-2 font-medium"
            >
              The Mind-Home Connection
            </button>
            <button
              id="nav-link-offerings"
              onClick={() => scrollToSection("offerings-section")}
              className="text-navy-600/80 hover:text-navy-900 transition-colors py-2 font-medium"
            >
              Care Offerings
            </button>
            <button
              id="nav-link-faq"
              onClick={() => scrollToSection("faq-section")}
              className="text-navy-600/80 hover:text-navy-900 transition-colors py-2 font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* Call to action & Hotline */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-2 text-xs font-mono font-semibold text-navy-700 hover:text-rose-600 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-cream-100 flex items-center justify-center text-rose-600">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-navy-400">
                  Talk or Text
                </span>
                <span className="block text-sm font-bold text-navy-800">
                  {phone}
                </span>
              </div>
            </a>

            <button
              id="nav-btn-begin"
              onClick={onBegin}
              className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow"
            >
              Let's Begin
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${phoneTel}`}
              className="w-9 h-9 rounded-full bg-cream-100 flex items-center justify-center text-rose-600"
              title="Call or Text"
            >
              <PhoneCall className="w-4 h-4" />
            </a>

            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/40 border border-navy-100 text-navy-800"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 z-30 bg-warm-white/95 rounded-3xl p-6 shadow-xl border border-white flex flex-col gap-4 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              <button
                id="mob-nav-connection"
                onClick={() => scrollToSection("connection-section")}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-cream-50 text-navy-800 text-sm font-medium"
              >
                The Mind-Home Connection
              </button>
              <button
                id="mob-nav-offerings"
                onClick={() => scrollToSection("offerings-section")}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-cream-50 text-navy-800 text-sm font-medium"
              >
                Care Offerings
              </button>
              <button
                id="mob-nav-faq"
                onClick={() => scrollToSection("faq-section")}
                className="w-full text-left py-3 px-4 rounded-xl hover:bg-cream-50 text-navy-800 text-sm font-medium"
              >
                FAQ
              </button>
            </div>

            <div className="pt-4 border-t border-navy-100 flex flex-col gap-4">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-navy-400">
                  Call, Text, or WhatsApp
                </span>
                <a
                  href={`tel:${phoneTel}`}
                  className="block text-lg font-bold text-navy-800 mt-1"
                >
                  {phone}
                </a>
              </div>

              <button
                id="mob-btn-begin"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onBegin();
                }}
                className="w-full py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-xs font-bold tracking-wider uppercase transition-colors text-center"
              >
                Let's Begin Together
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
