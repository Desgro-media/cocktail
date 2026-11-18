import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  { title: 'PRINTED SHIRTS', text: 'Temple, festival and devotional themes with front or back prints.', to: '/shop?category=shirts', image: '/products/temple-themed-shirt-1.jpg', pos: 'object-top' },
  { title: 'CHRISTMAS COLLECTION', text: 'Santa, reindeer and devotional prints for the season.', to: '/shop?collection=christmas', image: '/products/christmas/santas-village-red-shirt.jpg', pos: 'object-center' },
  { title: 'SHIRT & MUND COMBOS', text: 'Matching shirt and mund sets for functions and poojas.', to: '/shop?category=combos', image: '/products/sabarimala-back-print-shirt-1.jpg', pos: 'object-top' },
  { title: 'CAPS, T-SHIRTS & HOODIES', text: 'Your logo, name or artwork on caps, tees and hoodies.', to: '/shop?category=caps', image: '/story/print_craft_detail.jpg', pos: 'object-center' },
];

export default function UspBento() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }} className="mb-12">
          <span className="inline-block bg-brand text-ink px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.2em] mb-2">WHAT WE DO</span>
          <h2 className="font-display text-4xl md:text-5xl uppercase text-ink">CUSTOM PRINTING, MADE EASY</h2>
          <p className="text-muted text-[15px] max-w-xl mt-3">Choose a product, send us your idea on WhatsApp, and we print and ship it from Trivandrum to anywhere in India.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.75, 0.2, 1] }}>
              <Link to={s.to} className="group relative block aspect-[3/4] overflow-hidden bg-ink border border-line hover:border-brand transition-colors">
                <img src={s.image} alt={s.title} loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${s.pos} group-hover:scale-[1.06] transition-transform duration-1000 ease-luxury`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                  <h3 className="font-display text-xl md:text-2xl leading-tight mb-2">{s.title}</h3>
                  <p className="text-[12px] md:text-[13px] text-white/75 leading-relaxed mb-3 hidden sm:block">{s.text}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                    Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
