import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Pause, Compass, MapPin, CheckCircle2 } from 'lucide-react';
import StoryAtmosphereCanvas from './StoryAtmosphereCanvas';
import { CATEGORIES, BRAND } from '../data/products';

export const STORY_CHAPTERS = [
  {
    id: 'spark',
    stepNumber: '01',
    chapterTag: 'CHAPTER 01 // THE SPARK',
    title: 'THE SPARK',
    subtitle: 'YOUR IDEA & SKETCH',
    badge: 'STAGE 1: THE SPARK',
    headlineHighlight: 'IMAGINE.',
    leadText:
      'Every piece begins with a spark. A rough sketch, a temple festival vision, a WhatsApp voice note, or your college gang logo. Send us your idea—we turn imagination into wearable art.',
    backdrop: '/story/backdrop_sketch.jpg',
    previewImage: '/story/model_temple_shirt.jpg',
    previewTag: 'REAL CUSTOM PRINT',
    previewTitle: 'Temple & Festival Vision',
    previewQuote: '“Sent our festival committee design on WhatsApp at night. Had the shirts printed for the pooja.”',
    studioNote: 'STUDIO NOTE #01 • TRIVANDRUM',
    pillText: 'CONCEPT TO CLOTH',
    accentColor: '#EAB94F',
  },
  {
    id: 'craft',
    stepNumber: '02',
    chapterTag: 'CHAPTER 02 // THE CRAFT',
    title: 'THE CRAFT',
    subtitle: 'HANDPRINTED IN TRIVANDRUM',
    badge: 'STAGE 2: TRIVANDRUM ATELIER',
    headlineHighlight: 'CRAFTED.',
    leadText:
      'In our Nedumangad workshop, vibrant high-density inks meet silk screen meshes and 240 GSM combed cotton. Hand-pulled, heat-pressed, and crafted to outlast every wash.',
    backdrop: '/story/backdrop_workshop.jpg',
    previewImage: '/story/print_craft_detail.jpg',
    previewTag: 'ATELIER WORKSHOP',
    previewTitle: 'Ayyappa Darshanam Print Detail',
    previewQuote: '“High-density multi-color silkscreen. The metallic gold and black ink definition is unmatched.”',
    studioNote: 'CRAFT LOG #02 • 08.5241° N',
    pillText: 'SILKSCREEN & HIGH-DENSITY',
    accentColor: '#D94A1C',
  },
  {
    id: 'streets',
    stepNumber: '03',
    chapterTag: 'CHAPTER 03 // THE STREETS',
    title: 'THE STREETS',
    subtitle: 'WORN WITH PRIDE PAN-INDIA',
    badge: 'STAGE 3: THE CELEBRATION',
    headlineHighlight: 'CELEBRATE.',
    leadText:
      'From temple festivals and Sabarimala pilgrimages to college fests and father-son traditions. Carefully packaged in Trivandrum and delivered across 28+ states in India.',
    backdrop: '/story/backdrop_streets.jpg',
    previewImage: '/story/father_son_combo.jpg',
    previewTag: 'REAL MEMORY • CELEBRATION',
    previewTitle: 'Dad & Son Matching Set',
    previewQuote: '“Matching printed shirts & kasavu mundu for the temple season. The smiles say everything.”',
    studioNote: 'ORDER #TRV-4192 • PAN-INDIA',
    pillText: '28+ STATES DELIVERED',
    accentColor: '#F59E0B',
  },
];

export default function StoryHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isHoveredRef = useRef(false);

  const durationMs = 6000;
  const activeChapter = STORY_CHAPTERS[activeIdx];

  // Auto-advancing story timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / durationMs) * 100;

    const timer = setInterval(() => {
      if (isHoveredRef.current) return; // pause progress while hovering

      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIdx((curr) => (curr + 1) % STORY_CHAPTERS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, activeIdx]);

  const selectChapter = (idx) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  return (
    <section
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden text-white pt-8 pb-12 select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* 1. Base dark background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0305] via-[#0F0405] to-[#0B0B0B] z-0" />

      {/* 2. Cross-fading cinematic backdrops */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {STORY_CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={ch.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-35 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{
                backgroundImage: `url(${ch.backdrop})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1.2s cubic-bezier(0.2, 0.75, 0.2, 1), transform 8s ease-out',
              }}
            />
          );
        })}
      </div>

      {/* 3. Luxury dark vignettes to ensure 100% text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-[#0B0B0B]/40 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/60 pointer-events-none" />

      {/* 4. Tactile Textile & Blueprint grid watermark */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Studio Blueprint Craft Marks */}
      <div className="absolute top-6 left-6 z-[3] hidden lg:flex items-center gap-2 text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono">
        <span className="text-gold">⌖</span> {activeChapter.studioNote}
      </div>
      <div className="absolute top-6 right-8 z-[3] hidden lg:flex items-center gap-2 text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono">
        <Compass className="w-3 h-3 text-brand" /> TRIVANDRUM ATELIER • KERALA
      </div>

      {/* 5. Living Particle & Fiber Atmosphere Canvas */}
      <StoryAtmosphereCanvas chapter={activeIdx} />

      {/* 6. Dynamic Ambient Glow Orbs */}
      <div
        className="absolute -top-20 -right-20 w-[450px] md:w-[650px] h-[450px] md:h-[650px] rounded-full pointer-events-none blur-[120px] transition-all duration-1000 z-[2]"
        style={{
          background: `radial-gradient(circle, ${activeChapter.accentColor} 0%, #C8151E 40%, transparent 70%)`,
          opacity: 0.35,
        }}
      />
      <div
        className="absolute bottom-1/4 -left-20 w-[350px] h-[350px] rounded-full pointer-events-none blur-[100px] transition-all duration-1000 z-[2]"
        style={{
          background: `radial-gradient(circle, ${activeChapter.accentColor} 0%, transparent 70%)`,
          opacity: 0.22,
        }}
      />

      {/* 7. MAIN HERO CONTENT */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 md:px-10 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Narrative & Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Story Chapter Live Badge */}
            <motion.div
              key={`badge-${activeIdx}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-5"
            >
              <span className="px-3.5 py-1.5 rounded-full bg-black/50 border border-gold/40 text-gold font-bold text-[11px] md:text-[12px] uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>{activeChapter.chapterTag}</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] text-white/50 tracking-widest uppercase font-mono">
                • {activeChapter.pillText}
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] uppercase tracking-normal leading-[0.98] select-none text-white max-w-2xl">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, ease: [0.2, 0.75, 0.2, 1] }}
                  className="inline-block"
                >
                  PRINT WHATEVER
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.75, 0.2, 1] }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold"
                >
                  YOU IMAGINE.
                </motion.span>
              </div>
            </div>

            {/* Dynamic Storytelling Lead Text */}
            <div className="min-h-[80px] sm:min-h-[72px] mt-6 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`lead-${activeIdx}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="text-[15px] sm:text-[16px] text-white/85 leading-relaxed font-normal"
                >
                  {activeChapter.leadText}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-7">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-full bg-white text-ink font-bold text-[13px] md:text-[14px] uppercase tracking-widest hover:bg-gold hover:text-ink active:scale-95 transition-all shadow-xl flex items-center gap-2 group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full border-2 border-white/80 bg-black/30 backdrop-blur-sm text-white font-bold text-[13px] md:text-[14px] uppercase tracking-widest hover:bg-white hover:text-ink active:scale-95 transition-all"
              >
                CUSTOMISE YOURS
              </a>
            </div>

            {/* Interactive 3-Step Chapter Stepper */}
            <div className="mt-10 pt-6 border-t border-white/10 max-w-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono text-white/60">
                  <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                  <span>THE JOURNEY BEHIND EVERY THREAD</span>
                </div>
                <button
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause Story' : 'Play Story'}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-gold" />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {STORY_CHAPTERS.map((ch, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => selectChapter(idx)}
                      className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? 'bg-white/10 border-gold/60 shadow-lg'
                          : 'bg-black/30 border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {/* Active chapter progress fill line */}
                      {isActive && (
                        <div
                          className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-gold via-brand to-gold transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                      <div className="text-[10px] sm:text-[11px] font-mono tracking-wider font-bold text-gold/90 mb-0.5">
                        {ch.stepNumber} // {ch.title}
                      </div>
                      <div className="text-[11px] sm:text-[12px] font-display uppercase tracking-wider text-white/90 truncate">
                        {ch.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Floating Interactive Story Card (Visual Storytelling Anchor) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              key={`story-card-${activeIdx}`}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.2, 0.75, 0.2, 1] }}
              className="relative w-full max-w-[390px] group"
            >
              {/* Outer decorative ambient glow */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-40 blur-xl transition-all duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${activeChapter.accentColor}, #C8151E, #2E0001)`,
                }}
              />

              {/* Glass Polaroid / Atelier Swatch Container */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#181818]/90 to-[#0F0F0F]/95 border border-white/20 p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
                
                {/* Header bar of the story card */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-[10px] uppercase tracking-[0.2em] font-mono text-white/60">
                  <span className="flex items-center gap-1.5 text-gold font-bold">
                    <CheckCircle2 className="w-3 h-3 text-gold" />
                    {activeChapter.previewTag}
                  </span>
                  <span>{activeChapter.stepNumber} / 03</span>
                </div>

                {/* Real Photography Preview Image */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-black/60 shadow-inner group">
                  <img
                    src={activeChapter.previewImage}
                    alt={activeChapter.previewTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette over image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                  {/* Corner stamp */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-white/90">
                    TRV • ATELIER
                  </div>

                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-gold block mb-0.5">
                      {activeChapter.previewBadge}
                    </span>
                    <h3 className="font-display text-lg uppercase tracking-wide text-white leading-tight">
                      {activeChapter.previewTitle}
                    </h3>
                  </div>
                </div>

                {/* Quote / Narrative note from real print orders */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[12.5px] text-white/75 italic leading-relaxed">
                    {activeChapter.previewQuote}
                  </p>
                  <div className="flex items-center justify-between mt-3 text-[10px] uppercase font-mono tracking-wider text-white/45">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-ink" /> Trivandrum, Kerala
                    </span>
                    <span className="text-gold/90 font-bold">100% Combed Cotton</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 8. CATEGORY PILLS (Bottom of Hero) */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-4 md:px-10 w-full mt-4">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 shrink-0 mr-1 hidden sm:inline">
            WHAT WE PRINT:
          </span>
          {CATEGORIES.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.05 }}
              className="shrink-0"
            >
              <Link
                to={`/shop?category=${c.id}`}
                className="block px-4 py-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider hover:bg-white hover:text-ink hover:border-white transition-all shadow-sm"
              >
                {c.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
