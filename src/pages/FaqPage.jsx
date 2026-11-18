import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../data/products';

// Tabs come from the FAQs themselves, so a tab never shows up empty.
// To add one (e.g. Returns), give a FAQ in data/products.js that category.
const CATEGORIES = ['All', ...new Set(FAQS.map((f) => f.category).filter(Boolean))];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(FAQS[0]?.id ?? null);

  const filteredFaqs =
    activeCategory === 'All'
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="bg-mist min-h-screen pb-24">
      {/* Title band with gradient text */}
      <div className="bg-ink text-white py-16 md:py-20 text-center border-b border-line/20">
        <div className="max-w-[1320px] mx-auto px-4 md:px-10">
          <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-gold block mb-2">
            HELP
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-signature-grad">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-[15px] text-white/70 max-w-xl mx-auto mt-3">
            Everything you need to know about custom orders, sizes and shipping.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 md:px-8 pt-10">
        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar pb-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-[12.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-white text-ink border border-line hover:border-brandRed'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Red-Open Accordion Items */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
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
                >
                  <span
                    className={`font-display text-lg md:text-xl transition-colors ${
                      isOpen ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-white text-brandRed rotate-180' : 'bg-mist text-ink'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className="grid transition-all duration-500 ease-luxury overflow-hidden"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="min-h-0">
                    <div
                      className={`px-5 md:px-6 pb-6 text-[14px] md:text-[15px] leading-relaxed ${
                        isOpen ? 'text-white/90' : 'text-muted'
                      }`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
