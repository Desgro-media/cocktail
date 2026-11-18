import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function FlyToCart() {
  const { flyingItem } = useCart();
  const [targetPos, setTargetPos] = useState({ x: window.innerWidth - 60, y: 35 });

  useEffect(() => {
    if (flyingItem) {
      const bagBtn = document.getElementById('header-bag-btn');
      if (bagBtn) {
        const rect = bagBtn.getBoundingClientRect();
        setTargetPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }
  }, [flyingItem]);

  return (
    <AnimatePresence>
      {flyingItem && (
        <motion.div
          key="flying-clone"
          initial={{
            left: flyingItem.startX,
            top: flyingItem.startY,
            scale: 1,
            opacity: 1,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            left: targetPos.x,
            top: targetPos.y,
            scale: 0.18,
            opacity: 0.85,
            x: '-50%',
            y: '-50%',
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.2, 0.75, 0.2, 1],
          }}
          className="fixed pointer-events-none z-[9999] w-28 h-36 rounded-lg overflow-hidden border-2 border-brand shadow-2xl bg-white"
        >
          <img
            src={flyingItem.imageSrc}
            alt="Adding"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
