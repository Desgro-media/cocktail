import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { BRAND, CATEGORIES } from '../data/products';

export default function About() {
  return (
    <div className="bg-mist">
      <section className="bg-dark-grad text-white py-20 md:py-28">
        <div className="max-w-[1000px] mx-auto px-4 md:px-10">
          <span className="text-[12px] font-bold text-gold uppercase tracking-[0.25em]">ABOUT US</span>
          <h1 className="font-display text-5xl md:text-8xl leading-[0.9] mt-3">PRINT WHATEVER<br />YOU IMAGINE</h1>
          <p className="text-white/80 text-[17px] max-w-2xl mt-6 leading-relaxed">
            {BRAND.name} is a custom clothing brand from {BRAND.city}. We print your ideas on T-shirts, shirts, hoodies and caps, and ship them all over India.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-4 md:px-10">
          <h2 className="font-display text-3xl md:text-4xl mb-6">WHAT WE MAKE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES.map((c) => (
              <Link key={c.id} to={`/shop?category=${c.id}`} className="p-6 bg-white border border-line hover:border-brandRed transition-colors">
                <h3 className="font-display text-xl ">{c.name}</h3>
                <p className="text-sm text-muted">{c.desc}</p>
              </Link>
            ))}
          </div>
          <a href={BRAND.instagram} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-full bg-ink text-white font-bold text-[13px] uppercase tracking-wider hover:bg-brandRed transition-colors">
            <Camera className="w-4 h-4" /> See our work on Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
