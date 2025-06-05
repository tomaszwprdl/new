'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function CarParade() {
  const { language } = useLanguage();
  const [isMoving, setIsMoving] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cars = [
    { src: '/images/cars/eco.png', alt: 'Economy Car' },
    { src: '/images/cars/kompaktowy.png', alt: 'Compact Car' },
    { src: '/images/cars/suv.png', alt: 'SUV' },
    { src: '/images/cars/van.png', alt: 'Van' },
    { src: '/images/cars/luksusowy.png', alt: 'Luxury Car' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
    }, 3000); // Change car every 3 seconds

    return () => clearInterval(interval);
  }, [cars.length]);

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div 
        ref={containerRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {cars.map((car, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative w-full aspect-[4/3]"
            >
              <Image
                src={car.src}
                alt={car.alt}
                fill
                className="object-contain"
                priority={index === 0}
              />
            </motion.div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-[#FFD700]' : 'bg-white/20'
            }`}
            aria-label={`${language === 'pl' ? 'Przejdź do' : 'Go to'} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 