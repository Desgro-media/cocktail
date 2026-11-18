import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DURATION = 1400; // ms — keeps the animation from flashing on fast loads
const MAX_DURATION = 6000; // ms — never block the site longer than this

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let done = false;

    // Ease progress toward 90% while the page loads
    const tick = setInterval(() => {
      setProgress((p) => (p < 90 ? p + (90 - p) * 0.08 : p));
    }, 60);

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_DURATION - (performance.now() - start));
      setTimeout(() => {
        clearInterval(tick);
        setProgress(100);
        setTimeout(() => setVisible(false), 350);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    const fallback = setTimeout(finish, MAX_DURATION);

    return () => {
      clearInterval(tick);
      clearTimeout(fallback);
      window.removeEventListener('load', finish);
    };
  }, []);

  // Lock scrolling while the loader is on screen
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark-grad text-white"
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Soft glow */}
          <div className="absolute w-[420px] h-[420px] max-w-[90vw] max-h-[90vw] rounded-full bg-brandRed/20 blur-2xl md:blur-3xl" />

          {/* Logo with pulsing rings */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }}
          >
            <span className="absolute inset-0 rounded-full border-2 border-gold/60 animate-pulse-ring" />
            <span
              className="absolute inset-0 rounded-full border-2 border-brandRed/60 animate-pulse-ring"
              style={{ animationDelay: '1.3s' }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, #EAB94F 90deg, #C8151E 180deg, transparent 270deg)',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src="/logo.png"
              alt="Cocktail Custom"
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-2xl"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="relative mt-8 px-6 text-center text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase text-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Print whatever you imagine
          </motion.p>

          {/* Progress bar */}
          <div className="relative mt-6 w-48 md:w-64 h-[3px] rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-button-grad rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.3 }}
            />
          </div>
          <span className="relative mt-3 text-[11px] tabular-nums text-white/50">
            {Math.round(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
