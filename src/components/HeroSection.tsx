'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import EntryAnimation from './EntryAnimation';
import OptimizedImage from './OptimizedImage';

export default function HeroSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      id="home"
      className="relative min-h-[90vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      aria-label="Hero section"
    >
      {/* Hero Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <OptimizedImage
          src="/images/hero image.jpg"
          alt="Scenic view of a car by the sea in Spain"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority
          quality={90}
          objectPosition="40% 60%"
          className="w-full h-full"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent z-0"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-left text-white px-4 sm:pl-8 md:pl-16 lg:pl-24 max-w-2xl pt-52 sm:pt-32 md:pt-40"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg"
        >
          {(() => {
            const title = t('hero.title');
            if (title.includes('|')) {
              return title.split('|').map((part, idx) => (
              <React.Fragment key={idx}>
                <span dangerouslySetInnerHTML={{ __html: part }} />
                {idx !== title.split('|').length - 1 && <br />}
              </React.Fragment>
            ));
            }
            return title;
          })()}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-2xl"
        >
          {t('hero.subtitle')}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-primary bg-accent rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label={t('hero.cta.primary')}
          >
            <span className="relative z-10">{t('hero.cta.primary')}</span>
            <div 
              className="absolute inset-0 bg-white/20 rounded-lg transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"
        aria-hidden="true"
      />
    </motion.section>
  );
} 