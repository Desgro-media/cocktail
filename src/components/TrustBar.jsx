import React from 'react';
import { Palette, Truck, Users } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

const ITEMS = [
  { icon: Palette, title: 'FULLY CUSTOM', subtitle: 'Print whatever you imagine' },
  { icon: Truck, title: 'ALL INDIA SHIPPING', subtitle: 'From Trivandrum, Kerala' },
  { icon: WhatsAppIcon, title: 'ORDER ON WHATSAPP', subtitle: 'Share your design, we handle the rest' },
  { icon: Users, title: 'GROUP & BULK ORDERS', subtitle: 'Temples, families, teams and events' },
];

export default function TrustBar() {
  return (
    <section className="bg-mist py-10 md:py-14 border-t border-line">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {ITEMS.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="bg-white p-5 md:p-6 border border-line hover:border-brandRed transition-all duration-300 group hover:-translate-y-1 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-mist flex items-center justify-center mb-4 group-hover:bg-brandRed/10 transition-colors">
              <Icon className="w-5 h-5 text-brandRed" />
            </div>
            <h4 className="font-display text-base md:text-lg text-ink mb-1">{title}</h4>
            <p className="text-[12px] md:text-[13px] text-muted leading-relaxed">{subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
