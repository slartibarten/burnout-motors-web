'use client';

import { useEffect, useRef } from 'react';

/**
 * Bakgrunnsvideo for hero-en, med respekt for «reduser bevegelse».
 *
 * Videoen har verken `autoplay` eller `<source>` ved server-render. Først når
 * klienten har bekreftet at brukeren IKKE har prefers-reduced-motion, legges
 * kilden på og avspillingen starter. Brukere med redusert bevegelse (eller uten
 * JavaScript) ser bare poster-bildet i ro – og laster aldri ned videofila.
 */
export default function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const start = () => {
      if (!v.querySelector('source')) {
        const s = document.createElement('source');
        s.src = src;
        s.type = 'video/mp4';
        v.appendChild(s);
        v.load();
      }
      v.play().catch(() => {
        /* autoplay kan blokkeres; poster vises da videre */
      });
    };

    const stop = () => {
      v.pause();
    };

    const apply = () => (mq.matches ? stop() : start());

    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
    />
  );
}
