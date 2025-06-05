'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const cars = [
  {
    src: '/images/graphics/Beep Beep - Medium Vehicle (3).svg',
    category: { en: 'Economy', pl: 'Ekonomiczne' },
    width: 286,
    height: 117
  },
  {
    src: '/images/graphics/Beep Beep - Medium Vehicle (4).svg',
    category: { en: 'Standard', pl: 'Standardowe' },
    width: 286,
    height: 117
  },
  {
    src: '/images/graphics/Beep Beep - Medium Vehicle (5).svg',
    category: { en: 'Premium', pl: 'Premium' },
    width: 286,
    height: 117
  },
  {
    src: '/images/graphics/Beep Beep - Medium Vehicle.webp',
    category: { en: 'Luxury', pl: 'Luksusowe' },
    width: 286,
    height: 117
  }
];

export default function CarParade() {
  const { language } = useLanguage();
  const [isMoving, setIsMoving] = useState(true);

  // Calculate total width needed for seamless loop
  const carWidth = 200; // width of each car container
  const carSpacing = 96; // space between cars (lg:space-x-32 = 8rem = 96px)
  const totalWidth = cars.length * (carWidth + carSpacing);

  return (
    <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16">
        {language === 'pl' ? 'Nasza flota' : 'Our Fleet'}
      </h2>
      
      <div className="relative max-w-full mx-auto h-[400px] overflow-hidden">
        {/* Road */}
        <div 
          className="absolute left-0 right-0 bottom-32 h-16"
          style={{
            background: 'linear-gradient(to right, transparent, #94a3b8 10%, #94a3b8 90%, transparent)',
            borderRadius: '999px',
            opacity: 0.3
          }}
        />

        {/* Car Container */}
        <div className="relative h-full flex items-center">
          <motion.div
            className="flex space-x-32"
            initial={{ x: -totalWidth }}
            animate={{ x: 0 }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Double the cars array for seamless loop */}
            {[...cars, ...cars].map((car, idx) => (
              <motion.div
                key={idx}
                className="relative flex flex-col items-center"
                animate={{ 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-[200px] h-[140px] flex items-center justify-center bg-transparent">
                  <motion.div
                    animate={{ 
                      rotate: [-1, 1],
                      y: [-2, 2]
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Image
                      src={car.src}
                      alt={car.category[language]}
                      width={car.width}
                      height={car.height}
                      className="max-w-full max-h-full object-contain select-none"
                      draggable={false}
                      priority={idx < 4} // Only prioritize first set of cars
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg whitespace-nowrap"
                  animate={{
                    y: [-1, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {car.category[language]}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 