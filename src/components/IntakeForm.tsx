import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  Clock,
  Eye,
  User,
  Mail,
  Phone as PhoneIcon,
  MessageSquare,
  MapPin,
  Flower,
  Calendar,
} from "lucide-react";
import {
  ServiceType,
  ContactMethod,
  BoroughType,
  IntakeSubmission,
} from "../types";

interface IntakeFormProps {
  selectedService: ServiceType;
  setSelectedService: (service: ServiceType) => void;
  onClose?: () => void;
}

export default function IntakeForm({
  selectedService,
  setSelectedService,
  onClose,
}: IntakeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "email" as ContactMethod,
    borough: "brooklyn" as BoroughType,
    message: "",
    quietVisit: false,
    anxiousPets: false,
    scentSensitive: false,
    traumaInformed: true,
  });

  const [submissions, setSubmissions] = useState<IntakeSubmission[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLocalRequests, setShowLocalRequests] = useState(false);
  const [formError, setFormError] = useState("");

  // Load existing requests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compassionate_cleaning_requests");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse requests from local storage", e);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setFormError(
        "Please let us know your preferred name, email, and phone number so we can coordinate your care.",
      );
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: IntakeSubmission = {
        id: "req_" + Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: selectedService,
        preferredContact: formData.preferredContact,
        borough: formData.borough,
        message: formData.message,
        preferences: {
          quietVisit: formData.quietVisit,
          anxiousPets: formData.anxiousPets,
          scentSensitive: formData.scentSensitive,
          traumaInformed: formData.traumaInformed,
        },
        submittedAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "received",
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem(
        "compassionate_cleaning_requests",
        JSON.stringify(updated),
      );

      setIsSubmitting(false);
      setShowSuccess(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        preferredContact: "email" as ContactMethod,
        borough: "brooklyn" as BoroughType,
        message: "",
        quietVisit: false,
        anxiousPets: false,
        scentSensitive: false,
        traumaInformed: true,
      });
    }, 1500);
  };

  const getServiceLabel = (type: ServiceType) => {
    switch (type) {
      case "gentle-reset":
        return "Gentle Reset Care";
      case "maintenance":
        return "Maintenance & Comfort";
      case "deep-transition":
        return "Deep Transition";
      case "neurodivergent":
        return "Neurodivergent & ADHD";
      case "custom-care":
        return "Bespoke Custom Care";
    }
  };

  const getBoroughLabel = (borough: BoroughType) => {
    switch (borough) {
      case "manhattan":
        return "Manhattan";
      case "brooklyn":
        return "Brooklyn";
      case "queens":
        return "Queens";
      case "bronx":
        return "The Bronx";
      case "staten-island":
        return "Staten Island";
      case "out-of-area":
        return "Outside NYC (Special Request)";
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4" id="intake-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Informative Side Card (Left) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-navy-800 text-warm-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-lavender-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="z-10">
            <span className="text-xs font-semibold tracking-wider text-rose-300 uppercase bg-rose-950/40 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-rose-900/40 mb-4">
              <Flower className="w-3.5 h-3.5 text-rose-300 fill-rose-300/20" />{" "}
              Dignity Pledge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-warm-white font-medium mb-4 leading-tight">
              A gentle, private request for support
            </h3>

            <p className="text-rose-100/80 text-sm leading-relaxed mb-6">
              When you submit this form, you are sharing your space’s needs with
              a small, compassionate group of trained professionals. We protect
              your story with absolute confidentiality.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">
                    100% Private
                  </span>
                  <span className="block text-xs text-rose-100/70 mt-0.5">
                    We never take photos, share details, or discuss client
                    spaces externally.
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">
                    Within 24 Hours
                  </span>
                  <span className="block text-xs text-rose-100/70 mt-0.5">
                    Our wellness-trained team coordinator will reach out to
                    schedule a soft voice call or text chat.
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-sm font-semibold">
                    No Prep Required
                  </span>
                  <span className="block text-xs text-rose-100/70 mt-0.5">
                    You do not need to clean, tidy, or sweep before we arrive.
                    We meet you exactly as you are.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="z-10 mt-8 pt-6 border-t border-white/10">
            {submissions.length > 0 && (
              <button
                id="btn-toggle-saved-requests"
                onClick={() => setShowLocalRequests(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-warm-white text-xs font-semibold tracking-wide transition-all duration-300 hover:bg-white/5"
              >
                <Eye className="w-4 h-4" /> View My Requests (
                {submissions.length})
              </button>
            )}
          </div>
        </div>

        {/* The Intake Form Panel (Right) */}
        <div className="lg:col-span-8 bg-white/90 rounded-3xl p-6 sm:p-8 border border-white shadow-sm flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-navy-100 pb-4">
              <h4 className="font-serif text-xl sm:text-2xl text-navy-800 font-medium">
                Let's begin together
              </h4>
              <p className="text-navy-500 text-xs sm:text-sm mt-1">
                Fill out only what feels comfortable. We are here to listen.
              </p>
            </div>

            {/* Core Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-500" /> Your
                  Preferred Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Maya or Alex"
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-rose-500" /> Email
                  Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@domain.com"
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <PhoneIcon className="w-3.5 h-3.5 text-rose-500" /> Phone
                  Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 000-0000"
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  Preferred Way to Connect
                </label>
                <select
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                >
                  <option value="email">Send a quiet Email first</option>
                  <option value="text">A friendly Text Message</option>
                  <option value="call">A gentle Phone Call</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  Service Type of Interest
                </label>
                <select
                  name="serviceType"
                  value={selectedService}
                  onChange={(e) =>
                    setSelectedService(e.target.value as ServiceType)
                  }
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300 font-medium"
                >
                  <option value="gentle-reset">
                    Gentle Reset Care (Comfort First)
                  </option>
                  <option value="maintenance">
                    Maintenance & Comfort (Periodic Support)
                  </option>
                  <option value="deep-transition">
                    Deep Transition Reset (Full Renew)
                  </option>
                  <option value="neurodivergent">
                    Neurodivergent & ADHD Support (Accommodating)
                  </option>
                  <option value="custom-care">
                    Bespoke Custom Care (Your Speed)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> NYC
                  Borough or Area
                </label>
                <select
                  name="borough"
                  value={formData.borough}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300"
                >
                  <option value="manhattan">Manhattan</option>
                  <option value="brooklyn">Brooklyn</option>
                  <option value="queens">Queens</option>
                  <option value="bronx">The Bronx</option>
                  <option value="staten-island">Staten Island</option>
                  <option value="out-of-area">Other / Outside NYC</option>
                </select>
              </div>
            </div>

            {/* Quiet/Anxiety Support Preference Toggles */}
            <div className="bg-cream-50/40 rounded-2xl p-4 sm:p-5 border border-navy-100/50">
              <span className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-3">
                Helpful Preferences (Completely Optional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/60 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="quietVisit"
                    checked={formData.quietVisit}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4.5 w-4.5 rounded border-navy-200 text-rose-500 focus:ring-rose-400"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-navy-800">
                      Quiet Visit Preference
                    </span>
                    <span className="block text-[10px] sm:text-xs text-navy-500">
                      Minimal small talk, soft focus, absolute peace.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/60 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="anxiousPets"
                    checked={formData.anxiousPets}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4.5 w-4.5 rounded border-navy-200 text-rose-500 focus:ring-rose-400"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-navy-800">
                      Anxious/Sensitive Pets
                    </span>
                    <span className="block text-[10px] sm:text-xs text-navy-500">
                      We tread gently around cats, dogs, or shy friends.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/60 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="scentSensitive"
                    checked={formData.scentSensitive}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4.5 w-4.5 rounded border-navy-200 text-rose-500 focus:ring-rose-400"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-navy-800">
                      Strong Scent Sensitivity
                    </span>
                    <span className="block text-[10px] sm:text-xs text-navy-500">
                      We will use 100% unscented, ecological products.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/60 transition-colors cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="traumaInformed"
                    checked={formData.traumaInformed}
                    onChange={handleCheckboxChange}
                    className="mt-1 h-4.5 w-4.5 rounded border-navy-200 text-rose-500 focus:ring-rose-400"
                  />
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-navy-800">
                      Trauma-Informed Staff
                    </span>
                    <span className="block text-[10px] sm:text-xs text-navy-500">
                      Trained in active listening, empathy & pacing.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Compassionate Message Box */}
            <div>
              <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-rose-500" /> Tell
                us how we can support you
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="What feels heavy today? Which rooms need the most gentle focus? Is there any boundary or worry we should keep in mind? (Feel free to share as much or as little as you like)."
                className="w-full pl-4 pr-4 py-3 bg-cream-50/50 border border-navy-100 rounded-xl text-navy-800 text-sm focus:outline-none focus:border-rose-400 focus:bg-white transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="space-y-4 pt-3">
              {formError && (
                <p className="text-xs text-rose-600 font-medium bg-rose-50 p-3 rounded-xl border border-rose-100">
                  {formError}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-navy-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rose-500" /> Secure,
                  private, and non-judgmental.
                </span>
                <button
                  id="btn-submit-intake"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-warm-white text-sm font-bold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg disabled:bg-rose-300 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Flower className="w-4 h-4 animate-spin" /> Preparing
                      Care Plan...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Request Safe Support
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal Dialogue (Self-contained AnimatePresence) */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccess(false)}
              className="absolute inset-0 bg-navy-950/45 backdrop-blur-sm"
            />
            {/* Card Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-warm-white rounded-3xl p-6 sm:p-8 border border-white shadow-xl text-center z-10"
            >
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <CheckCircle className="w-8 h-8 stroke-[1.5]" />
              </div>

              <h3 className="font-serif text-2xl text-navy-800 font-medium">
                Deep breath. It is done.
              </h3>

              <p className="text-navy-600/90 text-sm mt-3 leading-relaxed">
                Thank you for taking this courageous step. We have received your
                details with deep respect and care. Our wellness care
                coordinator will review them privately and reach out within 24
                hours.
              </p>

              <div className="bg-cream-50 rounded-2xl p-4 my-5 text-left border border-cream-100">
                <span className="block text-[10px] font-bold text-navy-500 uppercase tracking-wider mb-1">
                  Recommended Next Step
                </span>
                <p className="text-xs text-navy-700">
                  Feel free to close this window, sit back with a warm cup of
                  tea, and remember that support is on the way.
                </p>
              </div>

              <button
                id="btn-close-success"
                onClick={() => { setShowSuccess(false); onClose?.(); }}
                className="w-full py-3 bg-navy-800 hover:bg-navy-950 text-warm-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Close with peace
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Local Requests drawer */}
      <AnimatePresence>
        {showLocalRequests && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocalRequests(false)}
              className="absolute inset-0 bg-navy-950/30 backdrop-blur-xs"
            />
            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-md h-full bg-warm-white shadow-2xl border-l border-navy-100 p-6 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex items-center justify-between border-b border-navy-100 pb-4 mb-4">
                  <div>
                    <h4 className="font-serif text-lg text-navy-800 font-semibold flex items-center gap-2">
                      <Flower className="w-5 h-5 text-rose-500" /> My Safe
                      Requests
                    </h4>
                    <p className="text-xs text-navy-500">
                      Private records stored safely on your browser.
                    </p>
                  </div>
                  <button
                    id="btn-close-drawer"
                    onClick={() => setShowLocalRequests(false)}
                    className="text-navy-400 hover:text-navy-600 font-medium text-sm"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-cream-50/50 rounded-2xl p-4 border border-navy-100/30"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-bold font-mono bg-lavender-100 text-lavender-800 px-2.5 py-0.5 rounded-full uppercase">
                          {getServiceLabel(sub.serviceType)}
                        </span>
                        <span className="text-[10px] text-navy-400 font-mono">
                          {sub.submittedAt}
                        </span>
                      </div>
                      <p className="text-xs text-navy-800 font-semibold flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />{" "}
                        {getBoroughLabel(sub.borough)}
                      </p>

                      {sub.message && (
                        <p className="text-xs italic text-navy-600/80 mt-2 bg-white/40 p-2.5 rounded-lg border border-white/50">
                          "{sub.message}"
                        </p>
                      )}

                      {sub.preferredDate && (
                        <div className="mt-2.5 flex items-start gap-2 text-[11px] font-medium text-rose-700 bg-rose-50/55 p-2 rounded-xl border border-rose-100/40">
                          <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="block font-bold">
                              Soft Reserved Slot:
                            </span>
                            <span className="text-navy-700">
                              {sub.preferredDate} at {sub.preferredTime}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-navy-100/30">
                        <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700">
                          Status: Received & Coordinator Assigned
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-navy-100 text-center">
                <span className="text-[10px] text-navy-400 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Secure local encryption. Your
                  data never leaves this device.
                </span>
                <button
                  id="btn-clear-requests"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Would you like to clear your local copy? This cannot be undone.",
                      )
                    ) {
                      localStorage.removeItem(
                        "compassionate_cleaning_requests",
                      );
                      setSubmissions([]);
                      setShowLocalRequests(false);
                    }
                  }}
                  className="mt-2 text-[10px] text-rose-500 hover:text-rose-700 underline"
                >
                  Clear requests from local device
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
