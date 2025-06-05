'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cars = [
    { src: '/images/graphics/Beep Beep - Medium Vehicle (3).svg', width: 286, height: 117 },
    { src: '/images/graphics/Beep Beep - Medium Vehicle (4).svg', width: 286, height: 117 },
    { src: '/images/graphics/Beep Beep - Medium Vehicle (5).svg', width: 286, height: 117 },
    { src: '/images/graphics/Beep Beep - Medium Vehicle.png', width: 286, height: 117 }
  ];

  // Optimize for mobile by reducing the number of cars shown
  const displayCars = isMobile ? cars.slice(0, 2) : cars;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    >
      {/* Company Logo */}
      <motion.div 
        initial={{ opacity: 1, scale: 1 }}
        className={`mb-16 relative ${isMobile ? 'w-[200px] h-[133px]' : 'w-[300px] h-[200px]'}`}
      >
        <Image
          src="/images/logo tezzz.svg"
          alt="NowRent Logo"
          fill
          sizes={isMobile ? "200px" : "300px"}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Animated Line of Cars */}
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: '-120%' }}
        transition={{
          duration: isMobile ? 1.5 : 8,
          delay: 0,
          ease: 'linear',
          onComplete: () => {
            setLoadingComplete(true);
            onLoadingComplete();
          }
        }}
        className="absolute left-0 flex gap-6 md:gap-16 items-end md:bottom-[40px] bottom-[80px]"
        style={{ pointerEvents: 'none', minWidth: 'max-content' }}
      >
        {displayCars.map((car, index) => (
          <motion.div
            key={index}
            className={`relative ${isMobile ? 'w-[200px] h-[82px]' : 'w-[286px] h-[117px]'} flex items-end`}
            initial={{ opacity: 1, scale: 1 }}
          >
            <Image 
              src={car.src}
              alt={`Car ${index + 1}`}
              fill
              sizes={isMobile ? "200px" : "286px"}
              className="object-contain"
              priority
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Loading indicator */}
      <div className="mt-8">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#1A2B49] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}