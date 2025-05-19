'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function EntryAnimation({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 1000);
    }, 6000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 z-[1000] bg-white w-screen h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Centered Logo, no extra wrappers */}
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5,
              type: 'spring',
              stiffness: 100
            }}
            className="flex items-center justify-center"
          >
            <Image
              src="/images/logo tezzz.svg"
              alt="NowRent Logo"
              width={346}
              height={346}
              style={{ width: 'auto', height: 'auto', maxWidth: '70vw', maxHeight: '70vh' }}
              className=""
              priority
            />
          </motion.div>

          {/* Animated Line of Cars */}
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: '-120%' }}
            transition={{
              duration: 8,
              delay: 1.5,
              ease: 'easeInOut',
              onComplete: () => setTimeout(() => setIsVisible(false), 5000)
            }}
            className="absolute left-0 flex gap-6 md:gap-16 items-end md:bottom-[40px] bottom-[80px]"
            style={{ pointerEvents: 'none', minWidth: 'max-content' }}
          >
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (1).svg" alt="Car 1" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (2).svg" alt="Car 2" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (3).svg" alt="Car 3" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (4).svg" alt="Car 4" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (5).svg" alt="Car 5" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image src="/images/graphics/Beep Beep - Medium Vehicle (1).svg" alt="Car 6" width={286} height={117} style={{ width: 'auto', height: '100%' }} />
            </div>
            <div className="w-[286px] h-[117px] flex items-end">
              <Image 
                src="/images/graphics/Beep Beep - Medium Vehicle .svg" 
                alt="Car 7" 
                width={286} 
                height={117}
                className="object-contain"
                style={{ width: 'auto', height: '100%' }}
                priority
              />
            </div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 1000,
                  opacity: 0
                }}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 