import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { SECTION_LINKS, BRAND } from '../data/products';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  return (
    <footer className="bg-footerBlack text-white pt-16 md:pt-20 border-t border-white/10">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 md:gap-10 pb-14 border-b border-white/10">
          <div className="col-span-2 lg:col-span-5 space-y-4">
            <BrandLogo />
            <p className="text-[14px] text-white/70 leading-relaxed max-w-md">
              {BRAND.name}. {BRAND.tagline}. Custom printed T-shirts, shirts, hoodies and caps, made in {BRAND.city} and shipped all over India.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={BRAND.whatsapp} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-whatsapp text-white font-bold text-[13px] uppercase tracking-wider">
                <WhatsAppIcon className="w-4 h-4" /> Order on WhatsApp
              </a>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:bg-white hover:text-ink font-bold text-[13px] uppercase tracking-wider transition-colors">
                <Camera className="w-4 h-4" /> @{BRAND.handle}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-lg mb-4">Shop</h4>
            <ul className="space-y-0 md:space-y-2.5 text-[15px] md:text-[14px]">
              {SECTION_LINKS.map((c) => (
                <li key={c.id}>
                  <Link to={`/shop?for=${c.id}`} className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display text-lg mb-4">Help</h4>
            <ul className="space-y-0 md:space-y-2.5 text-[15px] md:text-[14px]">
              <li><Link to="/about" className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/faq" className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">Contact</Link></li>
              <li><Link to="/policy/shipping" className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">Shipping Policy</Link></li>
              <li><Link to="/policy/returns" className="block py-2 md:py-0 md:inline text-white/70 hover:text-brand transition-colors">Returns Policy</Link></li>
            </ul>
            <p className="text-[13px] text-white/50 mt-5">{BRAND.city}</p>
          </div>
        </div>
        <div className="pt-6 pb-24 md:pb-6 text-[12px] text-white/50 uppercase tracking-wider">
          © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
