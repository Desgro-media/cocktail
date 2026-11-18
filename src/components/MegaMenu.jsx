import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, SECTION_LINKS } from '../data/products';
import ProductImage from './ProductImage';

export default function MegaMenu({ onClose }) {
  const featured = PRODUCTS[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.2, 0.75, 0.2, 1] }}
      className="absolute top-full left-0 w-full bg-white border-b border-line shadow-2xl z-50 py-8 px-6 md:px-12"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1320px] mx-auto grid grid-cols-12 gap-8 items-start">
        <div className="col-span-8 border-r border-line pr-8">
          <p className="text-[12px] font-bold text-muted uppercase tracking-[0.2em] mb-4">Shop For</p>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {SECTION_LINKS.map((s) => (
              <Link
                key={s.id}
                to={`/shop?for=${s.id}`}
                onClick={onClose}
                className="p-4 border border-line hover:border-ink hover:bg-mist transition-colors group"
              >
                <span className="font-display text-lg text-ink group-hover:underline decoration-brand decoration-[3px] underline-offset-4 block">{s.name}</span>
                <span className="text-[12px] text-muted">{s.desc}</span>
              </Link>
            ))}
          </div>
          <p className="text-[12px] font-bold text-muted uppercase tracking-[0.2em] mb-4">Shop By Type</p>
          <div className="grid grid-cols-5 gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={`/shop?category=${c.id}`}
                onClick={onClose}
                className="p-4 border border-line hover:border-ink hover:bg-mist transition-colors group"
              >
                <span className="font-display text-lg text-ink group-hover:underline decoration-brand decoration-[3px] underline-offset-4 block">{c.name}</span>
                <span className="text-[12px] text-muted">{c.desc}</span>
              </Link>
            ))}
          </div>
          <Link
            to="/shop"
            onClick={onClose}
            className="inline-flex items-center gap-1 mt-5 text-[13px] font-bold uppercase tracking-wider text-ink underline decoration-brand decoration-[3px] underline-offset-4 group"
          >
            View everything <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <Link to={`/product/${featured.slug}`} onClick={onClose} className="col-span-4 group block">
          <p className="text-[12px] font-bold text-muted uppercase tracking-[0.2em] mb-4">Featured</p>
          <div className="aspect-[4/5] max-h-[260px] w-full overflow-hidden bg-mist">
            <ProductImage src={featured.images[0]} alt={featured.name} label={featured.name} className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-xl mt-3 block group-hover:underline decoration-brand decoration-[3px] underline-offset-4">{featured.name}</span>
          <span className="text-sm font-bold">₹{featured.price}</span>
        </Link>
      </div>
    </motion.div>
  );
}
