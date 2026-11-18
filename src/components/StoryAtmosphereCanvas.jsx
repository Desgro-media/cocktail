import React, { useRef, useEffect } from 'react';

/**
 * StoryAtmosphereCanvas
 * High-performance living particle canvas that renders soft floating craft motes,
 * golden cotton fibers, and ambient studio light glow.
 */
export default function StoryAtmosphereCanvas({ chapter = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animId;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle palette based on chapters:
    // Ch 0: Ideation (gold & stardust)
    // Ch 1: Craft (crimson, ember & gold)
    // Ch 2: Celebration (warm amber, gold & festive glow)
    const palettes = [
      ['rgba(254, 215, 0, 0.65)', 'rgba(255, 255, 255, 0.45)', 'rgba(254, 215, 0, 0.30)'],
      ['rgba(254, 215, 0, 0.60)', 'rgba(255, 255, 255, 0.40)', 'rgba(254, 215, 0, 0.35)'],
      ['rgba(234, 185, 79, 0.75)', 'rgba(245, 158, 11, 0.60)', 'rgba(255, 230, 160, 0.45)'],
    ];

    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 800),
      y: Math.random() * (height || 600),
      size: Math.random() * 2.4 + 0.8,
      speedY: Math.random() * 0.35 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      swayFreq: Math.random() * 0.003 + 0.001,
      swayAmp: Math.random() * 20 + 8,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.2,
      colorIdx: Math.floor(Math.random() * 3),
      isFiber: Math.random() > 0.75, // fiber shaped vs circular mote
      length: Math.random() * 6 + 4,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const currentPalette = palettes[chapter] || palettes[0];

      // Draw floating motes & fibers
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(time * p.swayFreq + p.phase) * 0.4 + p.speedX;
        p.rotation += p.rotSpeed;

        // Wrap around screen boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = currentPalette[p.colorIdx];
        ctx.strokeStyle = currentPalette[p.colorIdx];

        if (p.isFiber) {
          // Elongated cotton / textile fiber
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.lineWidth = p.size * 0.6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(-p.length / 2, 0);
          ctx.bezierCurveTo(-p.length / 4, 2, p.length / 4, -2, p.length / 2, 0);
          ctx.stroke();
        } else {
          // Glowing round dust / ember mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Soft subtle halo
          ctx.globalAlpha = p.opacity * 0.25;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [chapter]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
    />
  );
}
