import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasStickyBar, setHasStickyBar] = useState(false);

  useEffect(() => {
    // Enters after 1.2s
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    // Watch for sticky bar presence
    const checkStickyBar = () => {
      const stickyBar = document.getElementById('sticky-add-to-cart');
      setHasStickyBar(!!stickyBar);
    };

    const interval = setInterval(checkStickyBar, 300);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.55, ease: [0.2, 0.75, 0.2, 1] }}
          className={`fixed right-4 md:right-8 z-40 transition-all duration-300 ${
            hasStickyBar ? 'bottom-24 md:bottom-28' : 'bottom-6 md:bottom-8'
          }`}
        >
          <a
            href="https://wa.me/message/ULSJXJDDOUOVL1"
            target="_blank"
            rel="noreferrer"
            className="relative flex items-center gap-2.5 px-3.5 py-3 md:px-5 md:py-3.5 bg-whatsapp text-white rounded-full shadow-[0_8px_25px_rgba(31,170,89,0.4)] hover:brightness-110 active:scale-95 transition-all group"
            aria-label="Chat on WhatsApp"
          >
            {/* Pulsing ring every 2.6s */}
            <span className="absolute -inset-1 rounded-full bg-whatsapp/40 animate-pulse-ring pointer-events-none" />

            <WhatsAppIcon className="w-5 h-5 shrink-0" />
            <span className="hidden md:inline font-bold text-[13px] uppercase tracking-wider">
              Chat With Us
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
