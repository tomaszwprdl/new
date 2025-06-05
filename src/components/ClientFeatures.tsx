'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import {
  WalletIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  TruckIcon,
  PhoneIcon,
  SparklesIcon,
  HeartIcon,
  UserCircleIcon,
  UsersIcon,
  HomeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Feature {
  id: string;
  icon: React.ElementType;
  titlePL: string;
  titleEN: string;
  descPL: string;
  descEN: string;
  isPrimary?: boolean;
  accentColor: string;
  iconBg: string;
}

interface PromiseCard extends Omit<Feature, 'accentColor' | 'iconBg' | 'isPrimary'> {
  signature: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  language: string;
  isInView: boolean;
}

interface PromiseCardProps {
  promise: PromiseCard;
  language: string;
  isInView: boolean;
}

const features: Feature[] = [
  {
    id: 'no-deposit',
    icon: WalletIcon,
    titlePL: 'Brak depozytu',
    titleEN: 'No Deposit',
    descPL: 'Płacisz tylko za wynajem, bez kaucji!',
    descEN: 'Pay only for the rental, no deposit required!',
    isPrimary: true,
    accentColor: '#FFD700',
    iconBg: 'from-amber-100 to-amber-50'
  },
  {
    id: 'insurance',
    icon: ShieldCheckIcon,
    titlePL: 'Pełne ubezpieczenie',
    titleEN: 'Full Insurance',
    descPL: 'Spokój na drodze, wszystko w cenie.',
    descEN: 'Peace of mind, full coverage included.',
    isPrimary: true,
    accentColor: '#4FC3F7',
    iconBg: 'from-blue-100 to-blue-50'
  },
  {
    id: 'support',
    icon: ChatBubbleLeftRightIcon,
    titlePL: 'Polska obsługa 24/7',
    titleEN: 'Polish Support 24/7',
    descPL: 'Zawsze możesz na nas liczyć.',
    descEN: 'Always here to help, in your language.',
    isPrimary: true,
    accentColor: '#48BB78',
    iconBg: 'from-green-100 to-green-50'
  },
  {
    id: 'delivery',
    icon: TruckIcon,
    titlePL: 'Darmowa dostawa',
    titleEN: 'Free Delivery',
    descPL: 'Podstawiamy auto gdzie chcesz w regionie Alicante',
    descEN: 'We deliver your car anywhere in Alicante region',
    accentColor: '#9F7AEA',
    iconBg: 'from-purple-100 to-purple-50'
  },
  {
    id: 'assistance',
    icon: PhoneIcon,
    titlePL: 'Pomoc 24/7',
    titleEN: '24/7 Assistance',
    descPL: 'Jesteśmy dostępni o każdej porze.',
    descEN: "We're here for you anytime.",
    accentColor: '#F56565',
    iconBg: 'from-red-100 to-red-50'
  },
  {
    id: 'premium',
    icon: SparklesIcon,
    titlePL: 'Zadbane auta',
    titleEN: 'Premium Cars',
    descPL: 'Czyste, zdezynfekowane, nowe modele.',
    descEN: 'Clean, disinfected, and well-maintained.',
    accentColor: '#ED8936',
    iconBg: 'from-orange-100 to-orange-50'
  },
  {
    id: 'advice',
    icon: HeartIcon,
    titlePL: 'Szczere doradztwo',
    titleEN: 'Honest Advice',
    descPL: 'Doradzimy najlepsze rozwiązania.',
    descEN: 'Personalized recommendations for your trip.',
    accentColor: '#38B2AC',
    iconBg: 'from-teal-100 to-teal-50'
  }
];

const promiseCard = {
  id: 'promise',
  icon: UserCircleIcon,
  titlePL: 'Nasza obietnica',
  titleEN: 'Our Promise',
  descPL: 'Żadnych ukrytych kosztów, szczere doradztwo, osobiste podejście.',
  descEN: 'No hidden fees, honest advice, and a personal touch.',
  signature: 'Michał Nowak, CEO NowRent'
};

export default function ClientFeatures() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Auto-slide functionality
  useEffect(() => {
    if (!carouselRef.current || !isInView || isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % (features.length + 1);
      scrollToItem(nextIndex);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isInView, isPaused]);

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!carouselRef.current) return;
    
    const itemWidth = carouselRef.current.offsetWidth * 0.8 + 16;
    const scrollPosition = carouselRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / itemWidth);
    scrollToItem(newIndex);
    
    // Resume auto-sliding after a delay
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Add useEffect to handle touch events with proper options
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const options = { passive: false };
    
    const touchStartHandler = (e: TouchEvent) => {
      setIsDragging(true);
      setIsPaused(true);
      setStartX(e.touches[0].pageX - (carousel.offsetLeft || 0));
      setScrollLeft(carousel.scrollLeft || 0);
    };

    const touchMoveHandler = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - (carousel.offsetLeft || 0);
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
    };

    const touchEndHandler = () => {
      setIsDragging(false);
      const itemWidth = carousel.offsetWidth * 0.8 + 16;
      const scrollPosition = carousel.scrollLeft;
      const newIndex = Math.round(scrollPosition / itemWidth);
      scrollToItem(newIndex);
      
      // Resume auto-sliding after a delay
      setTimeout(() => setIsPaused(false), 5000);
    };

    carousel.addEventListener('touchstart', touchStartHandler, options);
    carousel.addEventListener('touchmove', touchMoveHandler, options);
    carousel.addEventListener('touchend', touchEndHandler);

    return () => {
      carousel.removeEventListener('touchstart', touchStartHandler);
      carousel.removeEventListener('touchmove', touchMoveHandler);
      carousel.removeEventListener('touchend', touchEndHandler);
    };
  }, [isDragging, startX, scrollLeft]);

  // Scroll to item with improved accessibility
  const scrollToItem = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const itemWidth = carousel.offsetWidth * 0.8 + 16;
    carousel.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
    setActiveIndex(index);

    // Announce slide change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `${language === 'pl' ? 'Slajd' : 'Slide'} ${index + 1} ${language === 'pl' ? 'z' : 'of'} ${features.length + 1}`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  // Handle illustration rotation
  const illustrations = [
    { src: '/images/graphics/Allura - Sitting.svg', alt: 'Woman sitting illustration' },
    { src: '/images/graphics/Città - Standing.svg', alt: 'Person standing illustration' }
    // Add more illustrations here for rotation if needed
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="features"
      className="relative py-16 md:py-24 bg-white overflow-hidden"
      aria-label={language === 'pl' ? 'Sekcja funkcji' : 'Features section'}
    >
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

        {/* Mobile Illustrations - Watermark Style */}
        <div className="absolute inset-0 xl:hidden pointer-events-none overflow-hidden">
          {/* Top Right Decorative Illustration */}
          <div className="absolute right-0 top-0 opacity-[0.035] transform translate-x-1/4">
            <Image
              src="/images/graphics/Allura - Sitting.svg"
              alt=""
              width={160}
              height={160}
              className="rotate-12"
              aria-hidden="true"
            />
          </div>
          {/* Bottom Left Decorative Illustration */}
          <div className="absolute left-0 bottom-20 opacity-[0.035] transform -translate-x-1/4">
            <Image
              src="/images/graphics/Città - Standing.svg"
              alt=""
              width={140}
              height={140}
              className="-rotate-12"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Desktop Città Illustration */}
        <div 
          className="absolute left-0 bottom-24 hidden xl:block"
          style={{ transform: 'translateX(20%)' }}
        >
          <img
            src="/images/graphics/Città - Standing.svg"
            alt="Person standing illustration"
            width="152"
            height="152"
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div 
        className="container mx-auto px-4 relative" 
        ref={containerRef}
        style={{ 
          isolation: 'isolate'
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 relative"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
          >
            {language === 'pl' ? 'Dlaczego NowRent?' : 'Why NowRent?'}
          </h2>
          <p className="text-lg md:text-xl text-primary-text max-w-2xl mx-auto">
            {language === 'pl'
              ? 'Wypożyczalnia samochodów, która dba o Twój komfort i bezpieczeństwo.'
              : 'A car rental service that prioritizes your comfort and safety.'}
          </p>
        </motion.div>

        {/* Features Grid/Carousel */}
        <div className="relative bg-primary/30 backdrop-blur-md rounded-3xl p-4 md:p-8 border border-primary/10">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 relative">
            {/* First three features */}
            {features.slice(0, 3).map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                language={language}
                isInView={isInView}
              />
            ))}

            {/* Darmowa dostawa card with Allura */}
            <div className="relative group">
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="relative"
                style={{ zIndex: 1 }}
              >
                <div className="absolute -right-6 -top-8 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl transform rotate-45" />
                <FeatureCard
                  feature={features[3]} // Darmowa dostawa
                  index={3}
                  language={language}
                  isInView={isInView}
                />
              </motion.div>

              {/* Desktop Allura Illustration */}
              <div 
                className="absolute -right-8 -top-[160px] hidden xl:block"
                style={{
                  position: 'absolute',
                  zIndex: 9999
                }}
              >
                <img
                  src="/images/graphics/Allura - Sitting.svg"
                  alt="Woman sitting illustration"
                  width="180"
                  height="180"
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </div>

            {/* Remaining features */}
            {features.slice(4).map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index + 4}
                language={language}
                isInView={isInView}
              />
            ))}
            <PromiseCard promise={promiseCard} language={language} isInView={isInView} />
          </div>

          {/* Mobile Carousel with enhanced accessibility */}
          <div
            ref={carouselRef}
            className={`md:hidden overflow-x-auto pb-8 -mx-4 px-4 flex snap-x snap-mandatory gap-4 hide-scrollbar
            ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-x pinch-zoom',
            }}
            role="region"
            aria-label={language === 'pl' ? 'Karuzela funkcji' : 'Features carousel'}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className="snap-center w-[80vw] min-w-[80vw] flex-shrink-0 first:pl-4 last:pr-4"
                role="group"
                aria-label={language === 'pl' ? `Slajd ${index + 1} z ${features.length + 1}` : `Slide ${index + 1} of ${features.length + 1}`}
              >
                <div className="h-full">
                  <FeatureCard
                    feature={feature}
                    index={index}
                    language={language}
                    isInView={isInView}
                  />
                </div>
              </div>
            ))}
            <div 
              className="snap-center w-[80vw] min-w-[80vw] flex-shrink-0 last:pr-4"
              role="group"
              aria-label={language === 'pl' ? `Slajd ${features.length + 1} z ${features.length + 1}` : `Slide ${features.length + 1} of ${features.length + 1}`}
            >
              <div className="h-full">
                <PromiseCard promise={promiseCard} language={language} isInView={isInView} />
              </div>
            </div>
          </div>

          {/* Carousel Navigation Dots with enhanced accessibility */}
          <div 
            className="flex md:hidden justify-center gap-2 mt-6"
            role="tablist"
            aria-label={language === 'pl' ? 'Nawigacja karuzeli' : 'Carousel navigation'}
          >
            {[...features, promiseCard].map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-6 bg-[#FFD700]' 
                    : 'bg-primary/20'
                }`}
                onClick={() => scrollToItem(index)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={language === 'pl' 
                  ? `Przejdź do slajdu ${index + 1}` 
                  : `Go to slide ${index + 1}`
                }
              />
            ))}
          </div>
        </div>

        {/* Additional gradient to blend the illustration */}
        {/* Removing the white gradient overlay */}

        {/* Removed <style jsx> for .hide-scrollbar, migrated to globals.css */}
      </div>
    </section>
  );
}

function FeatureCard({ feature, index, language, isInView }: FeatureCardProps) {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 0.8,
          delay: index * 0.1
        }
      } : {}}
      whileHover={{ 
        y: -5,
        transition: { 
          type: "spring", 
          stiffness: 300,
          damping: 15
        }
      }}
      className={`group p-6 md:p-8 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50
      transition-all duration-500 relative overflow-hidden transform h-full flex flex-col
      ${feature.isPrimary 
        ? 'shadow-[0_4px_20px_-4px_rgba(255,215,0,0.15)] border-2 border-[#FFD700]/20' 
        : 'shadow-sm hover:shadow-lg border border-gray-100'}`}
    >
      {/* Icon */}
      <div className="relative z-10">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br 
        ${feature.iconBg}
        flex items-center justify-center group-hover:scale-110 transition-transform duration-500
        ${feature.isPrimary ? 'shadow-[0_8px_16px_-4px_rgba(255,215,0,0.2)]' : ''}`}>
          <Icon 
            className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300`} 
            style={{ color: feature.accentColor }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">
          {language === 'pl' ? feature.titlePL : feature.titleEN}
        </h3>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
          {language === 'pl' ? feature.descPL : feature.descEN}
        </p>
      </div>
    </motion.div>
  );
}

function PromiseCard({ promise, language, isInView }: PromiseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.3,
          duration: 0.8,
          delay: 0.8
        }
      } : {}}
      whileHover={{ 
        y: -5,
        transition: { 
          type: "spring", 
          stiffness: 300,
          damping: 15
        }
      }}
      className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white 
      shadow-xl hover:shadow-2xl relative overflow-hidden transform transition-all duration-500 h-full flex flex-col"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      {/* Content */}
      <div className="relative z-10 flex-grow flex flex-col">
        <div className="mb-6 flex items-center gap-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-1 shadow-inner">
            <Image
              src="/images/ceo.webp"
              alt="CEO Michał Nowak"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {language === 'pl' ? promise.titlePL : promise.titleEN}
          </h3>
        </div>
        <p className="text-base md:text-lg text-white/95 leading-relaxed flex-grow">
          {language === 'pl' ? promise.descPL : promise.descEN}
        </p>
      </div>
    </motion.div>
  );
} 