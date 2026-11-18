import React, { useRef, useEffect } from 'react';

// Flowing silk ribbons background for the hero (canvas, respects reduced motion).
export default function SilkCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(200,21,30,0.22)', 'rgba(217,74,28,0.18)', 'rgba(234,185,79,0.14)', 'rgba(116,27,19,0.30)'];

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      colors.forEach((c, i) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 12) {
          const y =
            h * (0.45 + i * 0.1) +
            Math.sin(x * 0.0016 + t + i * 1.4) * h * 0.09 +
            Math.sin(x * 0.0041 - t * 0.7 + i) * h * 0.04;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = c;
        ctx.fill();
      });
      t += 0.006;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />;
}
