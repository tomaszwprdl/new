'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { WalletIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon, StarIcon } from '@heroicons/react/24/outline';

const trustBadges = [
  {
    id: 'no-deposit',
    Icon: WalletIcon,
    pl: 'Brak depozytu',
    en: 'No deposit',
    iconClasses: 'rotate-0',
    bgColor: 'from-amber-400/30 to-[#1A2B49]/40',
    iconColor: '#FFD700',
    pulseColor: 'rgba(255, 215, 0, 0.3)',
    glowColor: '#FFD700'
  },
  {
    id: 'insurance',
    Icon: ShieldCheckIcon,
    pl: 'Pełne ubezpieczenie',
    en: 'Full insurance',
    iconClasses: 'rotate-0',
    bgColor: 'from-blue-400/30 to-[#1A2B49]/40',
    iconColor: '#4FC3F7',
    pulseColor: 'rgba(79, 195, 247, 0.3)',
    glowColor: '#4FC3F7'
  },
  {
    id: 'support',
    Icon: ChatBubbleLeftRightIcon,
    pl: 'Polska obsługa',
    en: 'English support',
    iconClasses: '-rotate-6',
    bgColor: 'from-green-400/30 to-[#1A2B49]/40',
    iconColor: '#48BB78',
    pulseColor: 'rgba(72, 187, 120, 0.3)',
    glowColor: '#48BB78'
  },
  {
    id: 'rating',
    Icon: StarIcon,
    pl: '4.9/5 Ocena klientów',
    en: '4.9/5 Customer rating',
    iconClasses: 'rotate-12',
    bgColor: 'from-purple-400/30 to-[#1A2B49]/40',
    iconColor: '#9F7AEA',
    pulseColor: 'rgba(159, 122, 234, 0.3)',
    glowColor: '#9F7AEA'
  }
];

export default function HeroSection() {
  const { language } = useLanguage();

  return (
    <section id="home" className="relative bg-primary text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.webp"
          alt="Sunny coastal road in Costa Blanca"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
          style={{
            objectPosition: 'center 20%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40 backdrop-blur-[1px]" />
        
        {/* Sunny overlay effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(135,206,235,0.15)_0%,transparent_60%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#FFD700] rounded-full blur-lg opacity-30" />
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#87CEEB] rounded-full blur-lg opacity-30" />

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold mb-4 text-center max-w-[90%] xl:max-w-[80%] mx-auto"
            >
              <span className="text-gradient">
                {language === 'pl' 
                  ? 'Najlepszy wynajem aut na Costa Blanca'
                  : 'Best Car Rental in Costa Blanca'}
              </span>
            </motion.h1>

            {/* Playful Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl mb-4 font-bold text-center text-[#FFD700] drop-shadow-lg"
            >
              {language === 'pl'
                ? 'Twoja przygoda zaczyna się tutaj! 🌞'
                : 'Your adventure starts here! 🌞'}
            </motion.p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-10 font-medium text-white text-center drop-shadow-lg max-w-[95%] xl:max-w-[85%] mx-auto leading-relaxed"
            >
              {language === 'pl'
                ? 'Odkrywaj region Alicante i Costa Blanca na własnych zasadach – komfort, swoboda i niezapomniane chwile za kierownicą idealnego auta od NowRent.'
                : 'Explore Alicante and Costa Blanca on your own terms – comfort, freedom, and unforgettable moments behind the wheel of your perfect car from NowRent.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4 md:mb-8 lg:mb-12 hidden md:flex flex-col md:flex-row items-center justify-center gap-4"
            >
              {/* Call Now Button */}
              <a
                href="tel:+34694229035"
                className="btn-primary inline-flex items-center gap-3 group md:w-auto w-full"
              >
                <i className="fas fa-phone-alt text-2xl text-primary group-hover:rotate-12 transition-transform" />
                <span className="text-lg md:text-xl">
                  {language === 'pl' ? 'Zadzwoń teraz' : 'Call now'}
                </span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/34694229035"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-[#25D366] hover:bg-[#128C7E] inline-flex items-center gap-3 group md:w-auto w-full border-none"
              >
                <i className="fab fa-whatsapp text-2xl text-white group-hover:rotate-12 transition-transform" />
                <span className="text-lg md:text-xl text-white">
                  {language === 'pl' ? 'WhatsApp' : 'WhatsApp'}
                </span>
              </a>
            </motion.div>

            <span className="text-sm md:text-base text-white/90 text-center block italic font-medium tracking-wide mb-8 hidden md:block">
              {language === 'pl' ? 'Zarezerwuj auto na swój urlop w kilka minut!' : 'Book your holiday car in minutes!'}
            </span>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                  }}
                  className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${badge.bgColor} 
                  backdrop-blur-lg border border-white/20 p-4 md:p-6
                  hover:border-white/40 transition-all duration-500 animate-float-${index + 1}
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-1
                  lg:bg-gradient-to-br lg:to-[#1A2B49]/40`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    background: `linear-gradient(135deg, ${badge.pulseColor} 0%, rgba(26, 43, 73, 0.4) 100%)`
                  }}
                >
                  {/* Pulsing background effect - Only on desktop */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block"
                    style={{
                      background: `radial-gradient(circle at center, ${badge.pulseColor} 0%, rgba(26, 43, 73, 0.6) 70%)`,
                      animation: 'pulse 2s infinite'
                    }}
                  />
                  
                  {/* Glow effect - Only on desktop */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl hidden lg:block"
                    style={{
                      background: `radial-gradient(circle at center, ${badge.glowColor} 0%, rgba(26, 43, 73, 0.8) 70%)`
                    }}
                  />
                  
                  <div className="relative flex flex-col items-center gap-3 md:gap-4">
                    <div className="relative">
                      <div 
                        className="absolute inset-0 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: badge.iconColor }}
                      />
                      <badge.Icon 
                        className={`w-8 h-8 md:w-10 md:h-10 transition-all duration-500 transform
                        group-hover:scale-110 group-hover:rotate-[360deg] ${badge.iconClasses}`}
                        style={{ color: badge.iconColor, strokeWidth: 1.5 }}
                      />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-white text-center
                    group-hover:text-white transition-colors drop-shadow-lg">
                      {language === 'pl' ? badge.pl : badge.en}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Wave Effect */}
      <div className="absolute -bottom-1 left-0 w-full">
        <svg
          viewBox="0 0 1920 250"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path
            d="M1920 250H0V0s126.707 78.536 349.975 80.05c177.852 1.203 362.805-63.874 553.803-63.874 290.517 0 383.458 57.712 603.992 61.408 220.527 3.696 412.23-61.408 412.23-61.408V250z"
            fillOpacity="0.03"
          />
          <path
            d="M1920 144s-467.917 116.857-1027.243-17.294C369.986 1.322 0 45.578 0 45.578V250h1920V144z"
            fillOpacity="0.06"
          />
          <path
            d="M0 195.553s208.547-75.581 701.325-20.768c376.707 41.908 520.834-67.962 722.545-67.962 222.926 0 311.553 83.523 496.129 86.394V250H0v-54.447z"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* Add custom styles for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 