import React, { useState } from 'react';

// Shows the product photo; falls back to a branded tile if the file isn't added yet.
export default function ProductImage({ src, alt = '', label, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-[#181818] flex flex-col items-center justify-center text-center p-4 text-white ${className}`}
      >
        <span className="font-display text-xl leading-tight opacity-90">{label || alt}</span>
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 mt-2">Cocktail Custom</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}
