import React, { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { VIDEOS } from '../data/videos';

function VideoTile({ video, onOpen }) {
  const ref = useRef(null);

  // Play while visible on screen, pause when scrolled away (saves battery and data)
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <button
      onClick={() => onOpen(video)}
      className="group relative shrink-0 w-[220px] sm:w-[260px] mr-3 md:mr-4 aspect-[9/16] overflow-hidden bg-black border border-white/10 hover:border-brandRed transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      aria-label={`Play ${video.title}`}
    >
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-1000 ease-luxury"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-brandRed group-hover:border-brandRed transition-colors">
        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
      </span>
      <span className="absolute bottom-3 left-3 right-3 font-display text-lg text-white leading-tight">{video.title}</span>
    </button>
  );
}

export default function VideoGallery() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section className="py-20 md:py-28 bg-ink text-white" id="videos">
      <div className="max-w-[1320px] mx-auto px-4 md:px-10 mb-10 md:mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-brandRed animate-pulse" />
          <span className="text-[12px] font-bold text-white/70 uppercase tracking-[0.2em]">SEE IT IN MOTION</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl uppercase">WATCH IT, THEN WEAR IT</h2>
        <p className="text-white/70 text-[15px] max-w-xl mt-3">Real prints on real shirts. Hover to pause, tap any video to watch it full screen with sound.</p>
      </div>

      {/* Full width ticker, moves on its own */}
      <div className="gallery-viewport overflow-hidden no-scrollbar">
        <div className={`gallery-marquee flex w-max ${active ? 'is-paused' : ''}`}>
          {[...VIDEOS, ...VIDEOS].map((v, i) => (
            <VideoTile key={`${v.id}-${i}`} video={v} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-brandRed text-white flex items-center justify-center transition-colors"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
          <video
            src={active.src}
            poster={active.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-full aspect-[9/16] bg-black"
          />
        </div>
      )}
    </section>
  );
}
