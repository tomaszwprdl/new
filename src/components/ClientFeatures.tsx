'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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
  StarIcon,
  CreditCardIcon,
  MapIcon
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
    titlePL: 'Bez kaucji',
    titleEN: 'No deposit',
    descPL: 'Płacisz tylko za wynajem, bez blokady środków.',
    descEN: 'Pay only for the rental, with no blocked funds.',
    isPrimary: true,
    accentColor: '#FFD700',
    iconBg: 'from-amber-100 to-amber-50'
  },
  {
    id: 'insurance',
    icon: ShieldCheckIcon,
    titlePL: 'Pełne ubezpieczenie w cenie',
    titleEN: 'Full insurance included',
    descPL: 'Bez dopłat i bez dodatkowych pakietów przy odbiorze.',
    descEN: 'No insurance upsells or extra packages at pickup.',
    isPrimary: true,
    accentColor: '#48BB78',
    iconBg: 'from-green-100 to-green-50'
  },
  {
    id: 'no-card',
    icon: CreditCardIcon,
    titlePL: 'Bez karty kredytowej',
    titleEN: 'No credit card required',
    descPL: 'Do wynajmu nie potrzebujesz karty kredytowej.',
    descEN: 'You do not need a credit card to rent.',
    isPrimary: true,
    accentColor: '#4FC3F7',
    iconBg: 'from-blue-100 to-blue-50'
  },
  {
    id: 'delivery',
    icon: TruckIcon,
    titlePL: 'Podstawienie i odbiór auta',
    titleEN: 'Pickup & return options',
    descPL: 'Lotnisko, apartament lub ustalone miejsce.',
    descEN: 'Airport, apartment or agreed location.',
    accentColor: '#9F7AEA',
    iconBg: 'from-purple-100 to-purple-50'
  },
  {
    id: 'mileage',
    icon: MapIcon,
    titlePL: 'Bez limitu kilometrów w Hiszpanii',
    titleEN: 'Unlimited mileage in Spain',
    descPL: 'Jeździsz po Hiszpanii bez limitu kilometrów.',
    descEN: 'Drive across Spain with no mileage limit.',
    accentColor: '#F56565',
    iconBg: 'from-red-100 to-red-50'
  },
  {
    id: 'support',
    icon: ChatBubbleLeftRightIcon,
    titlePL: 'Polska obsługa 24/7',
    titleEN: 'Support 24/7',
    descPL: 'Pomoc w Twoim języku, kiedy jej potrzebujesz.',
    descEN: 'Help when you need it during your rental.',
    accentColor: '#ED8936',
    iconBg: 'from-orange-100 to-orange-50'
  },
  {
    id: 'clean-cars',
    icon: SparklesIcon,
    titlePL: 'Czyste, zadbane auta',
    titleEN: 'Clean, well-maintained cars',
    descPL: 'Auto przygotowane przed każdym wynajmem.',
    descEN: 'Prepared before every rental.',
    accentColor: '#ED8936',
    iconBg: 'from-orange-100 to-orange-50'
  },
  {
    id: 'advice',
    icon: HeartIcon,
    titlePL: 'Uczciwa pomoc w wyborze auta',
    titleEN: 'Honest help choosing a car',
    descPL: 'Doradzimy klasę auta do Twojego wyjazdu.',
    descEN: 'We recommend the right class for your trip.',
    accentColor: '#38B2AC',
    iconBg: 'from-teal-100 to-teal-50'
  }
];

const promiseCard = {
  id: 'promise',
  icon: UserCircleIcon,
  titlePL: 'Nasza obietnica',
  titleEN: 'Our promise',
  descPL: 'Żadnych ukrytych kosztów, szczere doradztwo i osobiste podejście — od pierwszej wiadomości do zwrotu auta.',
  descEN: 'No hidden fees, honest advice and personal support — from the first message to car return.',
  signature: 'Michał Nowak, CEO NowRent'
};

export default function ClientFeatures() {
  const { language } = useLanguage();
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Width of a single slide including the flex gap (gap-4 = 16px)
  const getItemWidth = (carousel: HTMLDivElement) => {
    const firstItem = carousel.firstElementChild as HTMLElement | null;
    return firstItem ? firstItem.offsetWidth + 16 : carousel.offsetWidth;
  };

  // Native scroll-snap: derive the active card from the scroll position
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const index = Math.round(carousel.scrollLeft / getItemWidth(carousel));
    setActiveIndex(Math.max(0, Math.min(features.length - 1, index)));
  };

  // Programmatic navigation (dots) — lets the browser snap cleanly
  const scrollToItem = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    carousel.scrollTo({ left: getItemWidth(carousel) * index, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <section 
      id="features"
      className="relative pt-16 md:pt-24 pb-28 md:pb-24 bg-white overflow-hidden"
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
              src="/images/graphics/citta-standing.svg"
              alt=""
              width={140}
              height={140}
              className="-rotate-12"
              aria-hidden="true"
            />
          </div>
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
              ? 'Jasne zasady, polska obsługa i auto przygotowane na Twój pobyt.'
              : 'Clear rules, direct support and a car prepared for your stay.'}
          </p>
        </motion.div>

        {/* Features Grid/Carousel */}
        <div className="relative bg-primary/30 backdrop-blur-md rounded-3xl p-4 md:p-6 border border-primary/10 lg:max-w-5xl xl:max-w-6xl lg:mx-auto">
          {/* Desktop man illustration — stands intentionally beside the panel, in front */}
          <div
            className="absolute left-0 bottom-0 z-20 hidden xl:block pointer-events-none"
            style={{ transform: 'translateX(-72%)' }}
            aria-hidden="true"
          >
            <img
              src="/images/graphics/citta-standing.svg"
              alt=""
              width="160"
              height="256"
              style={{ display: 'block', width: '160px', height: 'auto' }}
            />
          </div>

          {/* Desktop Grid (8 feature cards) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 relative">
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

            {/* 4th card with the woman illustration poking above it */}
            <div className="relative group">
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="relative h-full"
                style={{ zIndex: 1 }}
              >
                <div className="absolute -right-6 -top-8 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl transform rotate-45" />
                <FeatureCard
                  feature={features[3]}
                  index={3}
                  language={language}
                  isInView={isInView}
                />
              </motion.div>

              {/* Desktop Allura (woman) Illustration */}
              <div 
                className="absolute -right-8 -top-[160px] hidden xl:block pointer-events-none"
                style={{ zIndex: 30 }}
                aria-hidden="true"
              >
                <img
                  src="/images/graphics/Allura - Sitting.svg"
                  alt=""
                  width="180"
                  height="180"
                  style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
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
          </div>

          {/* Mobile Carousel — native scroll-snap (1 card per swipe, no autoplay) */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex snap-x snap-mandatory gap-4 hide-scrollbar scroll-pl-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
            }}
            role="region"
            aria-label={language === 'pl' ? 'Karuzela funkcji' : 'Features carousel'}
          >
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className="snap-start w-[82vw] min-w-[82vw] flex-shrink-0"
                role="group"
                aria-label={language === 'pl' ? `Slajd ${index + 1} z ${features.length}` : `Slide ${index + 1} of ${features.length}`}
              >
                <FeatureCard
                  feature={feature}
                  index={index}
                  language={language}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>

          {/* Carousel Navigation Dots + counter */}
          <div className="md:hidden mt-5">
            <div 
              className="flex justify-center gap-2"
              role="tablist"
              aria-label={language === 'pl' ? 'Nawigacja karuzeli' : 'Carousel navigation'}
            >
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-6 bg-[#FFD700]' 
                      : 'w-2 bg-primary/20'
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
            <p className="text-center text-sm text-primary/60 mt-2" aria-hidden="true">
              {activeIndex + 1} / {features.length}
            </p>
          </div>
        </div>

        {/* Closing trust card — full width, below the grid/carousel */}
        <PromiseCard promise={promiseCard} language={language} isInView={isInView} />
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
      className={`group p-6 md:p-6 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50
      transition-all duration-500 relative overflow-hidden transform h-full flex flex-col
      ${feature.isPrimary 
        ? 'shadow-[0_4px_20px_-4px_rgba(255,215,0,0.15)] border-2 border-[#FFD700]/20' 
        : 'shadow-sm hover:shadow-lg border border-gray-100'}`}
    >
      {/* Icon */}
      <div className="relative z-10">
        <div className={`w-14 h-14 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br 
        ${feature.iconBg}
        flex items-center justify-center group-hover:scale-110 transition-transform duration-500
        ${feature.isPrimary ? 'shadow-[0_8px_16px_-4px_rgba(255,215,0,0.2)]' : ''}`}>
          <Icon 
            className={`w-7 h-7 md:w-7 md:h-7 transition-colors duration-300`} 
            style={{ color: feature.accentColor }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <h3 className="text-xl md:text-xl font-bold text-gray-900 mt-6 md:mt-5 mb-3 md:mb-2">
          {language === 'pl' ? feature.titlePL : feature.titleEN}
        </h3>
        <p className="text-base md:text-base text-gray-700 leading-relaxed">
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
          delay: 0.6
        }
      } : {}}
      className="mt-8 md:mt-10 p-6 md:p-10 rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white 
      shadow-xl relative overflow-hidden transition-all duration-500"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

      {/* Content — horizontal on desktop, stacked on mobile */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="flex items-center gap-4 md:flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 p-1 shadow-inner flex-shrink-0">
            <Image
              src="/images/ceo.webp"
              alt="CEO Michał Nowak"
              width={80}
              height={80}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white md:hidden">
            {language === 'pl' ? promise.titlePL : promise.titleEN}
          </h3>
        </div>
        <div className="md:flex-1">
          <h3 className="hidden md:block text-3xl font-bold text-white mb-2">
            {language === 'pl' ? promise.titlePL : promise.titleEN}
          </h3>
          <p className="text-base md:text-lg text-white/95 leading-relaxed">
            {language === 'pl' ? promise.descPL : promise.descEN}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 