'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import Image from 'next/image';

// Comic Wave SVG Path
const WAVE_PATH = "M0,40 Q300,80 600,40 T1200,40 V80 H0 Z";
const WAVE_PATH_2 = "M0,20 Q300,60 600,20 T1200,20 V80 H0 Z";
const WAVE_PATH_3 = "M0,60 Q300,20 600,60 T1200,60 V80 H0 Z";

const SurferTransition: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const controls = useAnimation();

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust start and end scroll positions for the animation
  const start = isMobile ? 2500 : 800;
  const end = 2200;

  // Animate x from -100px (off left) to 100vw (off right) with spring physics
  const x = useSpring(
    useTransform(scrollY, [start, end], ['-100px', '100vw']),
    { stiffness: 100, damping: 30 }
  );

  // Wave animation
  useEffect(() => {
    const waveAnimation = async () => {
      await controls.start({
        y: [0, -10, 0],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    };
    waveAnimation();
  }, [controls]);

  return (
    <div 
      ref={ref} 
      className="relative w-full h-80 overflow-hidden bg-gradient-to-b from-sky-100 to-sky-200"
      style={{ pointerEvents: 'none' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sun */}
        <div className="absolute top-4 right-8 w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="sunGradient">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#sunGradient)" />
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="20"
                stroke="#FFD700"
                strokeWidth="4"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>
        </div>

        {/* Clouds */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${5 + i * 10}%`,
              left: `${i * 30}%`,
            }}
            animate={{
              x: [0, 50, 0],
              transition: {
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" className="fill-white/80">
              <path d="M40,20 Q50,5 70,20 Q85,10 95,25 Q110,15 110,35 Q120,30 115,45 H35 Q25,45 25,35 Q25,25 40,20" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Comic-Style Waves */}
      <div className="absolute left-0 bottom-0 w-full">
        {/* Wave 3 (Back) */}
        <motion.svg
          width="100%"
          height="80"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          animate={controls}
          style={{ y: -20 }}
        >
          <path
            d={WAVE_PATH_3}
            fill="#93C5FD"
            fillOpacity="0.4"
          >
            <animate
              attributeName="d"
              dur="5s"
              repeatCount="indefinite"
              values={`${WAVE_PATH_3};${WAVE_PATH_3.replace('60', '50')};${WAVE_PATH_3}`}
            />
          </path>
        </motion.svg>

        {/* Wave 2 (Middle) */}
        <motion.svg
          width="100%"
          height="80"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          animate={controls}
          style={{ y: -10 }}
        >
          <path
            d={WAVE_PATH_2}
            fill="#60A5FA"
            fillOpacity="0.6"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values={`${WAVE_PATH_2};${WAVE_PATH_2.replace('20', '30')};${WAVE_PATH_2}`}
            />
          </path>
        </motion.svg>

        {/* Wave 1 (Front) */}
        <motion.svg
          width="100%"
          height="80"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          animate={controls}
        >
          <path
            d={WAVE_PATH}
            fill="#3B82F6"
            fillOpacity="0.8"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values={`${WAVE_PATH};${WAVE_PATH.replace('40', '50')};${WAVE_PATH}`}
            />
          </path>
          {/* Wave Highlights */}
          <path
            d="M300,40 Q350,50 400,40"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              dur="3s"
              repeatCount="indefinite"
              values="M300,40 Q350,50 400,40;M300,45 Q350,35 400,45;M300,40 Q350,50 400,40"
            />
          </path>
          <path
            d="M800,40 Q850,50 900,40"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          >
            <animate
              attributeName="d"
              dur="2.5s"
              repeatCount="indefinite"
              values="M800,40 Q850,50 900,40;M800,45 Q850,35 900,45;M800,40 Q850,50 900,40"
            />
          </path>
        </motion.svg>
      </div>

      {/* Animated Surfer */}
      <motion.div
        style={{ x }}
        className="absolute left-0 bottom-16 z-20"
        initial={false}
        animate={{
          y: [-2, 2],
          rotate: [-2, 2],
          transition: {
            y: {
              repeat: Infinity,
              duration: 1,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              repeat: Infinity,
              duration: 1.5,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }
        }}
      >
        <Image
          src="/images/graphics/swimming.svg"
          alt="Surfer"
          width={384}
          height={384}
          priority
          className="pointer-events-none object-contain"
        />
      </motion.div>
    </div>
  );
};

export default SurferTransition; 