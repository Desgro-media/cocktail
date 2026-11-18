import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.5, ease: [0.2, 0.75, 0.2, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-ink text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 border border-white/20 select-none pointer-events-none"
        >
          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
          <span className="text-[13px] font-bold tracking-wider uppercase">
            {toast}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
