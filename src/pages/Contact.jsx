import React from 'react';
import { Camera, MapPin } from 'lucide-react';
import { BRAND } from '../data/products';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function Contact() {
  return (
    <div className="bg-mist min-h-screen py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 md:px-10">
        <span className="text-[12px] font-bold uppercase tracking-[0.25em] text-brandRed block mb-2">CONTACT</span>
        <h1 className="font-display text-4xl sm:text-6xl text-ink">GET IN TOUCH</h1>
        <p className="text-[15px] text-muted max-w-xl mt-2 mb-10">
          Have a design in mind? Send it to us and we will tell you how we can print it.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="p-8 bg-whatsapp text-white hover:brightness-110 transition">
            <WhatsAppIcon className="w-8 h-8 mb-4" />
            <h3 className="font-display text-2xl ">WhatsApp</h3>
            <p className="text-sm text-white/90 mt-1">Fastest way to order or customise</p>
          </a>
          <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="p-8 bg-ink text-white hover:bg-brandRed transition">
            <Camera className="w-8 h-8 mb-4" />
            <h3 className="font-display text-2xl ">Instagram</h3>
            <p className="text-sm text-white/80 mt-1">@{BRAND.handle}, DMs open</p>
          </a>
          <div className="p-8 bg-white border border-line">
            <MapPin className="w-8 h-8 mb-4 text-brandRed" />
            <h3 className="font-display text-2xl text-ink">Studio</h3>
            <p className="text-sm text-muted mt-1">{BRAND.city}. Shipping all over India.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
