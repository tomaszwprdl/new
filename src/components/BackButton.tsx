'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface BackButtonProps {
  lang: 'en' | 'pl';
}

export default function BackButton({ lang }: BackButtonProps) {
  const router = useRouter();

  const buttonText = {
    en: 'Back',
    pl: 'Powrót'
  };

  return (
    <motion.button
      onClick={() => router.back()}
      className="mb-8 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="text-lg font-medium">{buttonText[lang]}</span>
    </motion.button>
  );
} 