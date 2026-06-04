'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BackButtonProps {
  lang: 'en' | 'pl';
  tone?: 'dark' | 'light';
}

export default function BackButton({ lang, tone = 'dark' }: BackButtonProps) {
  const router = useRouter();

  const buttonText = {
    en: 'Back',
    pl: 'Powrót'
  };

  const toneClass =
    tone === 'light'
      ? 'text-white/80 hover:text-white'
      : 'text-primary hover:text-primary/80';

  const handleBack = () => {
    // Use normal back navigation when there is history to go back to
    // (e.g. the user came from the homepage); otherwise fall back to home
    // so a directly-opened legal page still has a working button.
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`mb-8 flex items-center gap-2 transition-colors group ${toneClass}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-lg font-medium">{buttonText[lang]}</span>
    </motion.button>
  );
} 