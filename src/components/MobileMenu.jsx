import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera } from 'lucide-react';
import { SECTIONS, CATEGORIES, BRAND } from '../data/products';
import WhatsAppIcon from './WhatsAppIcon';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.aside
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.2, 0.75, 0.2, 1] }}
            className="fixed top-0 left-0 h-full w-[86%] max-w-[380px] bg-white z-50 flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-line">
              <span className="font-display text-xl ">{BRAND.short} CUSTOM</span>
              <button onClick={onClose} aria-label="Close menu" className="p-2"><X className="w-6 h-6" /></button>
            </div>
            <nav className="p-4 flex flex-col">
              <Link to="/shop" onClick={onClose} className="py-3 font-display text-2xl border-b border-line">Shop All</Link>
              {SECTIONS.map((s) => (
                <React.Fragment key={s.id}>
                  <Link to={`/shop?for=${s.id}`} onClick={onClose} className="py-3 text-[15px] font-semibold uppercase tracking-wider border-b border-line text-ink/80">
                    {s.name}
                  </Link>
                  {s.children?.map((c) => (
                    <Link key={c.id} to={`/shop?for=${c.id}`} onClick={onClose} className="py-2.5 pl-4 text-[13px] font-semibold uppercase tracking-wider border-b border-line text-ink/60">
                      {c.name}
                    </Link>
                  ))}
                </React.Fragment>
              ))}
              <p className="pt-5 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Shop by type</p>
              <div className="flex flex-wrap gap-2 pb-4 border-b border-line">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} to={`/shop?category=${c.id}`} onClick={onClose} className="px-3 py-2 rounded-full border border-line text-[12px] font-semibold uppercase tracking-wider text-ink/80">
                    {c.name}
                  </Link>
                ))}
              </div>
              <Link to="/about" onClick={onClose} className="py-3 font-display text-2xl border-b border-line">About Us</Link>
              <Link to="/contact" onClick={onClose} className="py-3 font-display text-2xl border-b border-line">Contact</Link>
              <Link to="/login" onClick={onClose} className="py-3 font-display text-2xl border-b border-line">Sign in</Link>
            </nav>
            <div className="p-4 mt-auto space-y-3">
              <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-full bg-whatsapp text-white font-bold text-sm uppercase tracking-wider">
                <WhatsAppIcon className="w-4 h-4" /> Order on WhatsApp
              </a>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3 rounded-full border border-ink font-bold text-sm uppercase tracking-wider">
                <Camera className="w-4 h-4" /> @{BRAND.handle}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
