'use client'
import { useEffect, useRef } from "react";

export default function CredizzaMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);


  const items = Array.from({ length: 12 }, (_, i) => `CREDIZZA-${i}`);

  useEffect(() => {
    const scrollTrack = trackRef.current;
    if (!scrollTrack) return;

    let lastW = scrollTrack.scrollWidth;

    const tick = () => {
      offsetRef.current += 1.2; // velocidad: más grande = más rápido
      if (offsetRef.current >= lastW / 2) {
        offsetRef.current = 0;
      }
      scrollTrack.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      lastW = scrollTrack.scrollWidth;
    });
    ro.observe(scrollTrack);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full h-10 my-2 overflow-hidden bg-background-seccion"
      aria-label="Marquee Credizza"
    >
      <div
        ref={trackRef}
        className="absolute inset-y-0 left-0 flex items-center whitespace-nowrap [will-change:transform] shrink-0"
      >
        {items.concat(items).map((key, i) => (
          <span
            key={key + i}
            className="text-heading2 tracking-[4px] px-4"
          >
            CREDIZZA
          </span>
        ))}
      </div>
    </div>
  );
}
