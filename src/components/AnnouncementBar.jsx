import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ANNOUNCEMENTS = [
  'PRINT WHATEVER YOU IMAGINE',
  'T-SHIRTS • SHIRTS • HOODIES • CAPS',
  'TRIVANDRUM • ALL INDIA SHIPPING',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[30px] w-full animate-announcement-gradient text-white flex items-center justify-center overflow-hidden px-4 text-center select-none z-40 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }}
          className="text-[11px] md:text-[12.5px] font-bold tracking-[0.14em] uppercase"
        >
          {ANNOUNCEMENTS[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
