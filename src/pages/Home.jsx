import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Palette, Users, Volume2, VolumeX } from 'lucide-react';
import StoryAtmosphereCanvas from '../components/StoryAtmosphereCanvas';
import HeroVideo from '../components/HeroVideo';
import VideoGallery from '../components/VideoGallery';
import ProductCard from '../components/ProductCard';
import UspBento from '../components/UspBento';
import FaqAccordion from '../components/FaqAccordion';
import { PRODUCTS, SECTION_LINKS, BRAND } from '../data/products';
import { HERO_VIDEO } from '../data/videos';
import WhatsAppIcon from '../components/WhatsAppIcon';

const rise = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.7, ease: [0.2, 0.75, 0.2, 1] } };

// true on large screens (lg: 1024px+), where the video sits beside the copy
function useIsDesktop() {
  const query = '(min-width: 1024px)';
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return match;
}

// Mobile/tablet: the hero video fills the background behind the copy
function HeroVideoBackground({ src, poster }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          ref={ref}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Readability overlay: darker at the top (headline) and bottom (blends into next section) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#0B0B0E]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>
      <span className="absolute top-4 right-4 z-20 bg-brandRed text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg">
        Made to order
      </span>
      <button
        onClick={() => setMuted((m) => !m)}
        className="absolute bottom-5 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white flex items-center justify-center active:scale-95 transition"
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </>
  );
}

export default function Home() {
  const collection = PRODUCTS.slice(0, 8);
  const headline = ['PRINT', 'WHATEVER', 'YOU', 'IMAGINE.'];
  const isDesktop = useIsDesktop();

  return (
    <div className="overflow-hidden">
      {/* HERO: copy on the left, autoplaying video on the right */}
      <section className="relative bg-[#0B0B0E] text-white overflow-hidden">
        {/* Deep luxury ambient gradient base */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(120% 90% at 50% -10%, #1A0D0E 0%, #0B0B0E 60%, #060608 100%)',
          }}
        />

        {!isDesktop && <HeroVideoBackground src={HERO_VIDEO.src} poster={HERO_VIDEO.poster} />}

        {/* Ambient spotlight glow behind the featured video card */}
        <div
          aria-hidden="true"
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[420px] md:w-[680px] h-[420px] md:h-[680px] rounded-full pointer-events-none opacity-30 blur-[110px]"
          style={{
            background: 'radial-gradient(circle, #D94A1C 0%, #C8151E 45%, #EAB94F 80%, transparent 100%)',
          }}
        />

        {/* Subtle top-left warm illumination */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-[360px] md:w-[500px] h-[360px] md:h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #C8151E 0%, transparent 70%)',
          }}
        />

        {/* Studio micro-grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 25%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 35%, black 25%, transparent 85%)',
          }}
        />

        {/* Floating subtle craft motes and textile fibers */}
        <StoryAtmosphereCanvas chapter={1} />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 md:px-10 pt-14 pb-20 md:pt-16 md:pb-24 min-h-[calc(100svh-96px)] lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
              <span className="inline-flex px-3 py-1 rounded-full bg-brandRed/30 border border-brandRed text-gold font-bold text-[11px] md:text-[12px] uppercase tracking-[0.2em] items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" /> CUSTOM CLOTHING • TRIVANDRUM
              </span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[1.02] select-none max-w-3xl">
              {headline.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-3 md:mr-5">
                  <motion.span
                    initial={{ y: '108%' }} animate={{ y: '0%' }}
                    transition={{ duration: 1, delay: i * 0.09, ease: [0.2, 0.75, 0.2, 1] }}
                    className={`inline-block ${i === 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold' : ''}`}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-[15px] sm:text-[17px] text-white/90 max-w-xl mt-6 leading-relaxed">
              Custom printed shirts, T-shirts, hoodies and caps. Temple themes, festival designs, kids and family combos. Send us your idea and we print it in Trivandrum and ship it anywhere in India.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3, ease: [0.2, 0.75, 0.2, 1] }} className="flex flex-wrap items-center gap-4 mt-8">
              <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-button-grad text-white font-bold text-[13px] md:text-[14px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4" /> <span>START YOUR ORDER</span>
              </a>
              <Link to="/shop" className="px-8 py-4 rounded-full border-2 border-white text-white font-bold text-[13px] md:text-[14px] uppercase tracking-widest hover:bg-white hover:text-ink active:scale-95 transition-all flex items-center gap-2 group">
                SHOP NOW <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="flex flex-wrap gap-2 mt-10" aria-label="Shop by section">
              {SECTION_LINKS.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?for=${c.id}`} className="block px-4 py-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {isDesktop && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.2, 0.75, 0.2, 1] }} className="lg:col-span-5 flex justify-end">
            <div className="relative w-[270px] sm:w-[310px] xl:w-[340px]">
              <div className="absolute -inset-3 border border-gold/40 translate-x-4 translate-y-4 pointer-events-none" />
              <HeroVideo src={HERO_VIDEO.src} poster={HERO_VIDEO.poster} className="relative aspect-[9/16] border border-white/20 shadow-2xl" />
              <span className="absolute -left-3 top-8 bg-brandRed text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest shadow-lg">Made to order</span>
            </div>
          </motion.div>
          )}
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="bg-ink text-white border-y border-white/10">
        <div className="max-w-[1320px] mx-auto px-4 md:px-10 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Palette, t: 'Any design, any theme', d: 'Temple, festival, name or photo prints' },
            { icon: Users, t: 'Singles, groups and combos', d: 'Dad and son, family and team orders' },
            { icon: Truck, t: 'Ships all over India', d: 'Printed in Trivandrum, Kerala' },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-brandRed/20 flex items-center justify-center shrink-0"><Icon className="w-5 h-5 text-gold" /></span>
              <div>
                <p className="font-display text-base leading-tight">{t}</p>
                <p className="text-[12px] text-white/60">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE DO (service cards) */}
      <UspBento />

      {/* VIDEOS */}
      <VideoGallery />

      {/* COLLECTION */}
      <section className="py-20 md:py-28 bg-mist">
        <div className="max-w-[1320px] mx-auto px-4 md:px-10">
          <motion.div {...rise} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[12px] font-bold text-brandRed uppercase tracking-[0.2em] block mb-1">FRESH FROM THE STUDIO</span>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-ink">OUR COLLECTION</h2>
            </div>
            <Link to="/shop" className="text-[13px] font-bold uppercase tracking-wider text-brandRed hover:text-deepRed flex items-center gap-1 group">
              <span>Explore everything</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {collection.map((p) => (
              <ProductCard key={p.id} product={p} showAddButton />
            ))}
          </div>
        </div>
      </section>

      {/* STORY: real photos */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div {...rise} className="grid grid-cols-2 gap-3 md:gap-4">
            <img src="/story/model_temple_shirt.jpg" alt="Temple themed printed shirt worn by a customer" loading="lazy" className="w-full aspect-[3/4] object-cover" />
            <img src="/story/print_craft_detail.jpg" alt="Close up of an Ayyappa Darshanam print on a black shirt" loading="lazy" className="w-full aspect-[3/4] object-cover mt-10" />
          </motion.div>
          <motion.div {...rise}>
            <span className="text-[12px] font-bold text-brandRed uppercase tracking-[0.2em] block mb-1">THE DETAIL</span>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-ink">DESIGNED TO BE NOTICED UP CLOSE</h2>
            <p className="text-[15px] text-muted leading-relaxed mt-5 max-w-lg">
              From the artwork on the chest to the lettering on the back, every shirt is printed around the theme you choose. Temple festivals, Sabarimala season, family functions or your own idea.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] text-ink">
              {['Front, back and pocket print options', 'Shirt and mund combos for functions', 'Kids sizes 20 to 38 and matching dad and son sets'].map((t) => (
                <li key={t} className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-brandRed shrink-0" />{t}</li>
              ))}
            </ul>
            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-ink text-white font-bold text-[13px] uppercase tracking-widest hover:bg-brandRed transition-colors">
              <WhatsAppIcon className="w-4 h-4" /> Share your design
            </a>
          </motion.div>
        </div>
      </section>

      <FaqAccordion />

      {/* FINAL CTA */}
      <section className="bg-dark-grad text-white py-20 md:py-24 text-center relative overflow-hidden">
        <div className="max-w-[900px] mx-auto px-4 relative z-10">
          <h2 className="font-display text-4xl md:text-6xl">HAVE A DESIGN IN MIND?</h2>
          <p className="text-white/75 text-[16px] mt-4 max-w-xl mx-auto">Message us on WhatsApp with your idea. We will confirm the design, sizes and price with you before printing.</p>
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-8 px-10 py-4 rounded-full bg-button-grad text-white font-bold text-[14px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl">
            <WhatsAppIcon className="w-4 h-4" /> Start your order
          </a>
        </div>
      </section>
    </div>
  );
}
