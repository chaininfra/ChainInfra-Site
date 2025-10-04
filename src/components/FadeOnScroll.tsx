'use client';

import React, { useEffect, useRef } from "react";

const FadeOnScroll: React.FC<{ className?: string; children: React.ReactNode }>
= ({ className = "", children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Initial hidden state (no Tailwind animation classes)
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = "opacity 300ms ease-out, transform 300ms ease-out";

    let ticking = false;

    const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Calculate how much of the element is visible
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const ratio = rect.height > 0 ? clamp(visible / rect.height) : 0;
      const eased = easeOutCubic(ratio);

      el.style.opacity = `${eased}`;
      el.style.transform = `translateY(${(1 - eased) * 12}px)`;
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    const onScroll = () => {
      if (!activeRef.current || reducedMotion) return;
      requestTick();
    };

    const onResize = () => {
      if (!activeRef.current || reducedMotion) return;
      requestTick();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([entry]) => {
      if (!el) return;
      if (entry.isIntersecting) {
        activeRef.current = true;
        if (reducedMotion) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        } else {
          requestTick();
        }
      } else {
        activeRef.current = false;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        // Smoothly transition out
        el.style.opacity = reducedMotion ? "0" : "0";
        el.style.transform = reducedMotion ? "translateY(0)" : "translateY(12px)";
      }
    }, { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });

    io.observe(el);

    // Run an initial update in case element is already in view
    requestTick();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  return (
    <div ref={ref} className={`will-change-[opacity,transform] ${className}`}>
      {children}
    </div>
  );
};

export default FadeOnScroll;
