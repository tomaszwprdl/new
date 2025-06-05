'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function StickyBookButton() {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden lg:block">
      <motion.a
        href="#cars"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFB300] 
        text-primary font-bold rounded-full shadow-[0_8px_32px_rgba(255,215,0,0.3)] 
        hover:shadow-[0_16px_48px_rgba(255,215,0,0.4)] transition-all duration-300
        border border-white/20 hover:border-white/40"
      >
        {language === 'pl' ? 'Zarezerwuj' : 'Book Now'}
      </motion.a>
    </div>
  );
} 