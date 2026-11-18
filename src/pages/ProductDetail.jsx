import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRAND, sectionName } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const [size, setSize] = useState(null);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [needSize, setNeedSize] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const buyRef = useRef(null);
  const sizeRef = useRef(null);

  // Show a sticky "Add to bag" bar on mobile once the main button scrolls out of view
  useEffect(() => {
    const check = () => {
      const el = buyRef.current;
      setShowSticky(!!el && el.getBoundingClientRect().bottom < 0);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [slug]);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setActive(0);
    setNeedSize(false);
  }, [slug]);

  if (!product) {
    return (
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl mb-4">PRODUCT NOT FOUND</h1>
        <Link to="/shop" className="text-ink underline decoration-brand decoration-[3px] underline-offset-4 font-bold uppercase text-sm">Back to shop</Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category)?.name;
  const section = product.for[0];
  // Same section first, then same type
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.for.some((f) => product.for.includes(f)))
    .sort((a, b) => (b.category === product.category) - (a.category === product.category))
    .slice(0, 4);
  const off = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const add = (e) => {
    if (!size) {
      setNeedSize(true);
      sizeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    addToCart(product, size, qty, e);
  };

  return (
    <div className="bg-mist py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <p className="text-[12px] uppercase tracking-wider text-muted mb-6">
          <Link to="/shop" className="hover:underline decoration-brand decoration-2 underline-offset-4">Shop</Link> / <Link to={`/shop?for=${section}`} className="hover:underline decoration-brand decoration-2 underline-offset-4">{sectionName(section)}</Link> / <Link to={`/shop?for=${section}&category=${product.category}`} className="hover:underline decoration-brand decoration-2 underline-offset-4">{category}</Link>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          <div>
            <div className="aspect-[4/5] bg-white border border-line overflow-hidden">
              <ProductImage src={product.images[active]} alt={product.name} label={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {product.images.map((src, i) => (
                  <button key={src} onClick={() => setActive(i)}
                    className={`shrink-0 w-16 h-20 md:w-20 md:h-24 border overflow-hidden ${i === active ? 'border-ink border-2' : 'border-line'}`}>
                    <ProductImage src={src} alt="" label="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            {product.badge && <span className="bg-brand text-ink text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">{product.badge}</span>}
            <h1 className="font-display text-4xl md:text-5xl leading-[0.95] mt-3">{product.name}</h1>
            <p className="text-muted mt-2">{product.tagline}</p>

            <div className="flex items-center gap-3 mt-5">
              <span className="font-bold text-3xl">₹{product.price.toLocaleString()}</span>
              {off > 0 && (
                <>
                  <span className="text-muted line-through">₹{product.mrp.toLocaleString()}</span>
                  <span className="text-[11px] font-bold bg-brand text-ink px-2 py-0.5">{off}% OFF</span>
                </>
              )}
            </div>

            <div className="mt-7 scroll-mt-28" ref={sizeRef}>
              <p className="text-[12px] font-bold uppercase tracking-wider mb-2">
                Size {needSize && !size && <span className="text-danger normal-case tracking-normal ml-2">Please choose a size</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => { setSize(s); setNeedSize(false); }}
                    className={`min-w-[48px] px-3 py-2.5 rounded-[10px] border text-[13px] font-bold ${
                      size === s ? 'bg-ink text-white border-ink' : 'bg-white border-line hover:border-ink'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6" ref={buyRef}>
              <div className="flex items-center border border-line bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-12" aria-label="Decrease">−</button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-12" aria-label="Increase">+</button>
              </div>
              <button onClick={add}
                className="flex-1 h-12 rounded-full bg-button-grad text-ink font-bold text-[13px] uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition">
                Add to bag
              </button>
            </div>

            <a href={BRAND.whatsapp} target="_blank" rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 h-12 rounded-full border border-ink font-bold text-[13px] uppercase tracking-wider hover:bg-ink hover:text-white transition">
              <WhatsAppIcon className="w-4 h-4" /> Customise on WhatsApp
            </a>

            <p className="mt-8 text-[15px] leading-relaxed text-ink/80">{product.description}</p>
            <ul className="mt-4 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-2 text-[14px]"><Check className="w-4 h-4 text-ink mt-0.5 shrink-0" />{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {product.reel && (
          <div className="mt-16">
            <h2 className="font-display text-3xl mb-4">SEE IT ON INSTAGRAM</h2>
            <div className="max-w-[360px] mx-auto md:mx-0 bg-white">
              <iframe
                src={`https://www.instagram.com/reel/${product.reel}/embed`}
                title={product.name}
                loading="lazy"
                allowFullScreen
                scrolling="no"
                className="w-full h-[580px] border-0"
              />
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl mb-4">YOU MAY ALSO LIKE</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky add-to-bag bar (WhatsAppFloat lifts itself above this id) */}
      {showSticky && (
        <div
          id="sticky-add-to-cart"
          className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-white/95 backdrop-blur border-t border-line px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex items-center gap-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]"
        >
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold truncate">{product.name}</p>
            <p className="text-[13px] text-muted">
              ₹{product.price.toLocaleString()}{size ? ` · Size ${size}` : ' · Choose size'}
            </p>
          </div>
          <button onClick={add}
            className="shrink-0 h-11 px-6 rounded-full bg-button-grad text-ink font-bold text-[12px] uppercase tracking-wider active:scale-[0.98] transition">
            {size ? 'Add to bag' : 'Select size'}
          </button>
        </div>
      )}
    </div>
  );
}
