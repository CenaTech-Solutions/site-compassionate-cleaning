import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Images, ArrowLeftRight, Heart } from 'lucide-react';

import before1 from '@/assets/images/before-and-afters/cc-before-1.webp';
import after1 from '@/assets/images/before-and-afters/cc-after-1.webp';
import before2 from '@/assets/images/before-and-afters/cc-before-2.webp';
import after2 from '@/assets/images/before-and-afters/cc-after-2.webp';
import before3 from '@/assets/images/before-and-afters/cc-before-3.webp';
import after3 from '@/assets/images/before-and-afters/cc-after-3.webp';

const transformations = [
  {
    before: before1,
    after: after1,
    label: 'Living Space',
    caption: 'Gentle Reset — restored breathing room and calm paths.',
  },
  {
    before: before2,
    after: after2,
    label: 'Kitchen Area',
    caption: 'Deep Transition Reset — surfaces cleared, dishes done, and dignity restored.',
  },
  {
    before: before3,
    after: after3,
    label: 'Bedroom & Rest Space',
    caption: 'Maintenance Care — a safe haven returned to rest and recovery.',
  },
];

interface SliderProps {
  before: string;
  after: string;
  label: string;
}

function BeforeAfterSlider({ before, after, label }: SliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clamped = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((clamped / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseUp = () => { dragging.current = false; };
  const onMouseLeave = () => { dragging.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onTouchStart = () => { dragging.current = true; };
  const onTouchEnd = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    updatePosition(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      aria-label={`${label} before and after comparison`}
      className="relative rounded-2xl overflow-hidden cursor-col-resize select-none aspect-4/3 xl:aspect-video 2xl:aspect-16/10 shadow-sm"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    >
      {/* Before image (full) */}
      <img
        src={before}
        alt={`${label} before cleaning`}
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* After image (clipped to right portion — reveals from left to right) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <img
          src={after}
          alt={`${label} after cleaning`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="flex-1 w-[2px] bg-white/90 shadow-md" />
        <div className="w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center border border-rose-100 shrink-0">
          <ArrowLeftRight className="w-4 h-4 text-navy-700" strokeWidth={2} />
        </div>
        <div className="flex-1 w-[2px] bg-white/90 shadow-md" />
      </div>

      {/* Corner labels */}
      <span className="absolute top-3 left-3 text-[10px] font-mono font-bold tracking-widest uppercase text-white bg-navy-800/70 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 text-[10px] font-mono font-bold tracking-widest uppercase text-warm-white bg-rose-500/85 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
        After
      </span>

      {/* Subtle vignette at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-navy-900/20 to-transparent pointer-events-none" />
    </div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section
      id="gallery-section"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cream-50/30 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-[10%] w-80 h-80 rounded-full bg-lavender-100/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-rose-100/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1500px] 2xl:max-w-[1800px] mx-auto relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-semibold tracking-wider text-rose-700 uppercase bg-rose-50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-rose-100">
            <Images className="w-3.5 h-3.5" /> Spaces Restored
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-800 font-medium mt-4 leading-tight">
            Real care, real transformation
          </h2>

          <p className="text-navy-600/80 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Every image here was shared with express client permission and gratitude. Drag the slider to reveal how a space can breathe again — without judgment, without rush.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 2xl:gap-10">
          {transformations.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {/* Slider card */}
              <div className="bg-white rounded-3xl p-3 border border-navy-100/10 shadow-xs hover:shadow-sm transition-shadow duration-300">
                <BeforeAfterSlider
                  before={item.before}
                  after={item.after}
                  label={item.label}
                />
              </div>

              {/* Caption */}
              <div className="px-1">
                <span className="block text-[10px] font-mono uppercase font-bold tracking-widest text-lavender-700 mb-1">
                  {item.label}
                </span>
                <p className="text-navy-600/90 text-xs sm:text-sm leading-relaxed font-light">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dignity note */}
        <motion.div
          className="mt-16 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/70 border border-rose-100/60 rounded-2xl px-5 py-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <p className="text-[11px] font-light text-navy-600/80 leading-relaxed">
              All spaces shown here belong to clients who chose to share their journey. We never photograph without consent — your story belongs to you.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
