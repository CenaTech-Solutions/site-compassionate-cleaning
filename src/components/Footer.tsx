'use client'

import { Heart, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import type { SiteSettingsData } from "@/cms-types";

interface FooterProps {
  siteSettings: SiteSettingsData;
}

export default function Footer({ siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const {
    brandName = "Compassionate Cleaning",
    tagline = "Care • Dignity • Mental Wellness",
    phone = "(917) 555-0143",
    phoneTel = "9175550143",
    email = "hello@compassionateclean.com",
    address = "Serving Manhattan, Brooklyn, Queens, Bronx, and Staten Island.",
    instagramHandle = "@compassionateclean",
    instagramUrl = "https://instagram.com/compassionateclean",
    insuranceText = "Fully Insured & Bonded",
    localityBadgeText = "NYC Local",
    footerDescription = "We are a judgment-free, trauma-informed home reset service supporting mental wellness, neurodiversity, physical constraints, and hard life transitions.",
  } = siteSettings;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-navy-950 text-warm-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-[20%] w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[20%] w-72 h-72 bg-lavender-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-8">
        {/* Brand identity column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-300 border border-rose-500/20">
              <Heart className="w-5 h-5 fill-rose-500/15 text-rose-300" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-white block">{brandName}</span>
              <span className="text-[9px] font-mono tracking-wider text-rose-300 uppercase block font-semibold">{tagline}</span>
            </div>
          </div>

          <p className="text-rose-100/70 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
            {footerDescription}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-rose-100/60">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-300" /> {insuranceText}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              {localityBadgeText}
            </span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-3">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-lavender-300 font-bold">
            Explore Support
          </span>
          <div className="flex flex-col gap-2.5 text-xs text-rose-100/70">
            <button id="footer-link-connection" onClick={() => scrollToSection("connection-section")} className="text-left hover:text-white transition-colors">
              The Mind-Home Connection
            </button>
            <button id="footer-link-pledge" onClick={() => scrollToSection("pledge-section")} className="text-left hover:text-white transition-colors">
              Our Judgment-Free Pledge
            </button>
            <button id="footer-link-offerings" onClick={() => scrollToSection("offerings-section")} className="text-left hover:text-white transition-colors">
              Support Offerings
            </button>
            <button id="footer-link-faq" onClick={() => scrollToSection("faq-section")} className="text-left hover:text-white transition-colors">
              Anxieties Answered & FAQ
            </button>
          </div>
        </div>

        {/* Contact info column */}
        <div className="md:col-span-4 space-y-4">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-lavender-300 font-bold mb-1">
            Get in Touch (No Pressure)
          </span>

          <div className="space-y-3 text-xs sm:text-sm text-rose-100/80">
            <a href={`tel:${phoneTel}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-rose-300 shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>
                {phone}{" "}
                <span className="text-[10px] text-rose-100/40 font-mono">(Talk, Text, WhatsApp)</span>
              </span>
            </a>

            <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-rose-300 shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span>{email}</span>
            </a>

            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs">{address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ground notes and copyright */}
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-rose-100/50">
        <div className="space-y-1 text-center sm:text-left">
          <span>&copy; {currentYear} {brandName} NYC. All rights reserved.</span>
          <span className="block text-[10px] text-rose-100/30">
            We operate fully independently, protecting user data and respecting physical boundaries.
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            <span>{instagramHandle}</span>
          </a>
          <span className="text-rose-100/20">|</span>
          <span className="italic">Every space is worthy of rest.</span>
        </div>
      </div>
    </footer>
  );
}
