import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import WhatsAppIcon from '../components/WhatsAppIcon';
import SortMenu from '../components/SortMenu';
import { PRODUCTS, CATEGORIES, SECTIONS, ALL_SECTIONS, inSection, BRAND } from '../data/products';

// URL: /shop?for=<section>&category=<type>   e.g. /shop?for=kids-girls&category=shirts
export default function Shop() {
  const [params, setParams] = useSearchParams();
  const section = params.get('for') || 'all';
  const category = params.get('category') || 'all';
  const [sort, setSort] = useState('featured');

  const current = ALL_SECTIONS.find((s) => s.id === section);
  const kids = SECTIONS.find((s) => s.children);
  const inKids = section === kids.id || kids.children.some((c) => c.id === section);

  // Products in the chosen section (before the type filter), to show only types that exist there
  const inChosenSection = useMemo(
    () => (section === 'all' ? PRODUCTS : PRODUCTS.filter((p) => inSection(p, section))),
    [section]
  );
  const types = CATEGORIES.filter((c) => inChosenSection.some((p) => p.category === c.id));

  const products = useMemo(() => {
    let r = category === 'all' ? [...inChosenSection] : inChosenSection.filter((p) => p.category === category);
    if (sort === 'low') r.sort((a, b) => a.price - b.price);
    if (sort === 'high') r.sort((a, b) => b.price - a.price);
    return r;
  }, [inChosenSection, category, sort]);

  const update = (next) => {
    const merged = { for: section, category, ...next };
    const out = {};
    if (merged.for !== 'all') out.for = merged.for;
    if (merged.category !== 'all') out.category = merged.category;
    setParams(out);
  };
  // Switching section resets the type filter, since that type may not exist in the new section
  const pickSection = (id) => update({ for: id, category: 'all' });
  const pickType = (id) => update({ category: id });

  const chip = (active, small) =>
    `${small ? 'px-3.5 py-1.5 text-[11px]' : 'px-4 py-2 text-[12px]'} rounded-full font-bold uppercase tracking-wider border transition-colors whitespace-nowrap shrink-0 ${
      active ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-line hover:border-brandRed'
    }`;
  const row = 'flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0';

  return (
    <div className="bg-mist min-h-screen py-12 md:py-16">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <span className="text-[12px] font-bold text-brandRed uppercase tracking-[0.2em] block mb-1">THE COLLECTION</span>
        <h1 className="font-display text-4xl md:text-6xl text-ink mb-8">{current ? current.name : 'SHOP ALL'}</h1>

        <div className="space-y-3 mb-8">
          {/* Who it's for */}
          <div className={row} role="group" aria-label="Shop by section">
            <button onClick={() => pickSection('all')} className={chip(section === 'all')}>All</button>
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => pickSection(s.id)}
                className={chip(s.children ? inKids : section === s.id)}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Kids: boys / girls */}
          {inKids && (
            <div className={row} role="group" aria-label="Kids">
              <button onClick={() => pickSection(kids.id)} className={chip(section === kids.id, true)}>All kids</button>
              {kids.children.map((c) => (
                <button key={c.id} onClick={() => pickSection(c.id)} className={chip(section === c.id, true)}>
                  {c.name}
                </button>
              ))}
            </div>
          )}

          {/* Product type + sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-line">
            {types.length > 1 ? (
              <div className={row} role="group" aria-label="Product type">
                <button onClick={() => pickType('all')} className={chip(category === 'all', true)}>All types</button>
                {types.map((c) => (
                  <button key={c.id} onClick={() => pickType(c.id)} className={chip(category === c.id, true)}>
                    {c.name}
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}
            <SortMenu
              value={sort}
              onChange={setSort}
              options={[
                { value: 'featured', label: 'Featured' },
                { value: 'low', label: 'Price: Low to High' },
                { value: 'high', label: 'Price: High to Low' },
              ]}
            />
          </div>
        </div>

        {products.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="py-20 text-center max-w-md mx-auto">
            <p className="font-display text-2xl text-ink">New designs coming soon</p>
            <p className="text-muted mt-2">
              We print to order, so we can still make {current ? `${current.name.toLowerCase()} pieces` : 'this'} for you. Send us your idea.
            </p>
            <a
              href={BRAND.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-whatsapp text-white font-bold text-[13px] uppercase tracking-wider"
            >
              <WhatsAppIcon className="w-4 h-4" /> Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
