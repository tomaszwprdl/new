'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cars = [
  { src: '/images/graphics/Beep Beep - Medium Vehicle (3).svg', width: 286, height: 117 },
  { src: '/images/graphics/Beep Beep - Medium Vehicle (4).svg', width: 286, height: 117 },
  { src: '/images/graphics/Beep Beep - Medium Vehicle (5).svg', width: 286, height: 117 },
  { src: '/images/graphics/Beep Beep - Medium Vehicle.png', width: 286, height: 117 }
];

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-[100002] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      {/* Company Logo */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        className="mb-16 relative w-[300px] h-[200px]"
      >
        <Image
          src="/images/logo tezzz.svg"
          alt=""
          fill
          sizes="300px"
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Animated Line of Cars — ~2s sweep matches ~1s overlay duration */}
      <motion.div
        initial={{ x: '100vw' }}
        animate={{ x: '-120%' }}
        transition={{
          duration: 2,
          delay: 0,
          ease: 'linear',
        }}
        className="absolute left-0 flex gap-6 md:gap-16 items-end md:bottom-[40px] bottom-[80px]"
        style={{ pointerEvents: 'none', minWidth: 'max-content' }}
      >
        {cars.map((car, index) => (
          <motion.div
            key={index}
            className="relative w-[286px] h-[117px] flex items-end"
            initial={{ opacity: 1, scale: 1 }}
          >
            <Image
              src={car.src}
              alt=""
              fill
              sizes="286px"
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
