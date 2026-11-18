import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { CATEGORIES } from '../data/products';


export default function ProductCard({ product, showAddButton = false }) {
  const category = CATEGORIES.find((c) => c.id === product.category)?.name;
  const off = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="group flex flex-col justify-between bg-white border border-line hover:border-brandRed transition-all duration-300 relative select-none">
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-mist">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            label={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 ease-luxury group-hover:scale-[1.06]"
          />
          <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 z-10">
            {off > 0 && (
              <span className="bg-white text-ink text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest shadow-sm">Sale</span>
            )}
            {product.badge && (
              <span className="bg-brandRed text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                {product.badge}
              </span>
            )}
          </div>
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="bg-ink/80 text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">{category}</span>
          </div>
        </div>

        <div className="p-3.5 md:p-4">
          <h3 className="font-display text-lg md:text-xl uppercase text-ink group-hover:text-brandRed transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] md:text-[12px] text-muted line-clamp-1 mb-3 mt-1">{product.tagline}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-base md:text-lg text-ink">₹{product.price.toLocaleString()}</span>
            {off > 0 && (
              <>
                <span className="text-[12px] text-muted line-through">₹{product.mrp.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-brandRed border border-brandRed px-1.5 py-0.5 uppercase tracking-wider">
                  {off}% OFF
                </span>
              </>
            )}
          </div>
        </div>
      </Link>

      {showAddButton && (
        <div className="p-3.5 md:p-4 pt-0">
          <Link
            to={`/product/${product.slug}`}
            className="w-full py-2.5 px-4 rounded-full font-bold text-[12px] uppercase tracking-wider flex items-center justify-center gap-2 bg-button-grad text-white shimmer-effect hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
          >
            Choose size &amp; order
          </Link>
        </div>
      )}
    </div>
  );
}
