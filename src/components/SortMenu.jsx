import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

// Custom dropdown so the option list always opens right under the button
// (the browser's native <select> popup can open detached from the page).
export default function SortMenu({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = options.find((o) => o.value === value) || options[0];

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('pointerdown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative w-full md:w-60 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full h-11 flex items-center justify-between gap-3 border border-line bg-white px-4 text-[12px] font-bold uppercase tracking-wider hover:border-ink transition-colors"
      >
        <span>
          <span className="text-muted">Sort: </span>
          {current.label}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 left-0 top-full mt-1 z-30 bg-white border border-line shadow-xl py-1"
        >
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={o.value === value}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-[12px] font-bold uppercase tracking-wider transition-colors ${
                  o.value === value ? 'text-ink bg-brand/30' : 'text-ink hover:bg-mist'
                }`}
              >
                {o.label}
                {o.value === value && <Check className="w-4 h-4" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
