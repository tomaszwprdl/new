'use client';

import { useEffect } from 'react';

export default function MobileOptimizations() {
  useEffect(() => {
    // Only apply these optimizations on mobile devices
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      // Reduce animation frame rate for better performance
      const originalRequestAnimationFrame = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) => {
        return originalRequestAnimationFrame((timestamp) => {
          // Only run every other frame on mobile
          if (Math.floor(timestamp / 16) % 2 === 0) {
            callback(timestamp);
          }
        });
      };

      // Optimize touch events
      document.addEventListener('touchstart', () => {}, { passive: true });
      document.addEventListener('touchmove', () => {}, { passive: true });

      // Reduce motion if user prefers reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0s');
      }

      // Cleanup function
      return () => {
        window.requestAnimationFrame = originalRequestAnimationFrame;
      };
    }
  }, []);

  return null;
} 