import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';

const HANDLE = 'cocktail_custom_';

// Real reels from instagram.com/cocktail_custom_ (id = Instagram shortcode)
export const INSTAGRAM_REELS = [
  { id: 'DetHeojBF5a', title: 'Kids Ayyappa collection' },
  { id: 'DejnJE5h_hw', title: 'Poornathrayeesa Temple themed shirt' },
  { id: 'Dee4LAHh1_G', title: 'Back print Sabarimala themed shirt' },
  { id: 'DeZJ1w1hvVo', title: 'Ayyappa darshanam shirt for kids' },
  { id: 'DeT-q49Bjs4', title: 'Shiva Parvathi printed shirt' },
  { id: 'DdgEJAahQad', title: 'Swami Ayyappan dad and son combo shirts' },
];

export default function InstagramReels() {
  return (
    <section className="py-20 md:py-24 bg-ink text-white">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brandRed animate-pulse" />
              <span className="text-[12px] font-bold text-white/70 uppercase tracking-[0.2em]">REAL ORDERS • REAL PRINTS</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wider">WATCH IT, THEN WEAR IT</h2>
          </div>
          <a
            href={`https://www.instagram.com/${HANDLE}/`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:bg-white hover:text-ink transition-colors text-[13px] font-bold uppercase tracking-wider"
          >
            <Camera className="w-4 h-4" /> Follow @{HANDLE} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
          {INSTAGRAM_REELS.map((r) => (
            <div key={r.id} className="shrink-0 snap-start w-[290px] sm:w-[320px] bg-white border border-white/10">
              <iframe src={`https://www.instagram.com/reel/${r.id}/embed`} title={r.title} loading="lazy" scrolling="no" className="w-full h-[540px] border-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
