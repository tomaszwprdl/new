'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function StickyBookButton() {
  const { language } = useLanguage();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide the sticky CTA while these sections are in view so it doesn't
    // compete with / overlap their content on desktop.
    const sections = ['how-it-works', 'features']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setHidden(visible.size > 0);
      },
      // Only count as "inside" when the section fills the central part of the
      // viewport, so the button reappears just before/after each section.
      { rootMargin: '-20% 0px -20% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
      <motion.a
        href="#cars"
        initial={{ scale: 0, opacity: 0 }}
        animate={hidden ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: hidden ? 'none' : 'auto' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFB300] 
        text-primary font-bold rounded-full shadow-[0_8px_32px_rgba(255,215,0,0.3)] 
        hover:shadow-[0_16px_48px_rgba(255,215,0,0.4)] transition-all duration-300
        border border-white/20 hover:border-white/40"
      >
        {language === 'pl' ? 'Sprawdź dostępność' : 'Check availability'}
      </motion.a>
    </div>
  );
} 
