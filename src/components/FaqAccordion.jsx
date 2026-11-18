import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FaqAccordion({ items = FAQS, title = 'FREQUENTLY ASKED QUESTIONS', subtitle = 'GOOD TO KNOW' }) {
  const [openId, setOpenId] = useState(items[0]?.id || null);

  return (
    <section className="py-20 md:py-24 bg-mist border-t border-line">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-brandRed">{subtitle}</span>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider text-ink mt-1">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`transition-colors duration-400 border border-line ${
                  isOpen ? 'bg-brandRed text-white border-brandRed shadow-lg' : 'bg-white text-ink hover:border-brandRed'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg md:text-xl tracking-wide uppercase">{faq.question}</span>
                  {isOpen ? <Minus className="w-5 h-5 shrink-0" /> : <Plus className="w-5 h-5 shrink-0" />}
                </button>
                {isOpen && <p className="px-5 md:px-6 pb-6 -mt-1 text-[15px] leading-relaxed text-white/90">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
