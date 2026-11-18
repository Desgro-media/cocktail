import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES, SECTION_LINKS } from '../data/products';
import ProductImage from './ProductImage';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
    else setQuery('');
  }, [isOpen]);

  const q = query.trim().toLowerCase();
  const results = q
    ? PRODUCTS.filter((p) =>
        [p.name, p.tagline, p.description, p.category, ...p.for].join(' ').toLowerCase().includes(q)
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-white overflow-y-auto"
        >
          <div className="max-w-[900px] mx-auto px-4 pt-6 pb-16">
            <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
              <Search className="w-6 h-6" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH SHIRTS, HOODIES, CAPS, COMBOS..."
                className="flex-1 font-display text-xl md:text-3xl outline-none placeholder:text-ink/30"
              />
              <button onClick={onClose} aria-label="Close search"><X className="w-6 h-6" /></button>
            </div>

            {!q && (
              <div className="mt-8">
                <p className="text-[12px] font-bold text-muted uppercase tracking-[0.2em] mb-3">Browse</p>
                <div className="flex flex-wrap gap-2">
                  {[...SECTION_LINKS.map((c) => ({ ...c, to: `/shop?for=${c.id}` })), ...CATEGORIES.map((c) => ({ ...c, to: `/shop?category=${c.id}` }))].map((c) => (
                    <Link key={c.id} to={c.to} onClick={onClose}
                      className="px-4 py-2 rounded-full border border-line hover:border-brandRed hover:text-brandRed text-sm font-semibold uppercase tracking-wider">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {q && (
              <div className="mt-6">
                <p className="text-sm text-muted mb-4">
                  {results.length ? `${results.length} result${results.length > 1 ? 's' : ''}` : `Nothing found for "${query}"`}
                </p>
                <div className="space-y-3">
                  {results.map((p) => (
                    <Link key={p.id} to={`/product/${p.slug}`} onClick={onClose}
                      className="flex items-center gap-4 p-3 border border-line hover:border-brandRed">
                      <ProductImage src={p.images[0]} alt={p.name} label="" className="w-16 h-20 object-cover shrink-0" />
                      <div>
                        <span className="font-display text-lg block">{p.name}</span>
                        <span className="text-sm text-muted">₹{p.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
