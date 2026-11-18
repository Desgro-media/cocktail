import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center select-none ${className}`} aria-label="Cocktail Custom - Home">
      <img
        src="/logo.png"
        alt="Cocktail Custom"
        className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </Link>
  );
}
