'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const COLORS = {
  road: '#1A2B49',
  roadDash: '#FFFFFF',
  car: '#FFD600',
  station1: '#FFD600',
  station2: '#4FC3F7',
  white: '#FFFFFF',
  accent: '#FF9800',
  bg: 'linear-gradient(180deg, #E3F2FD 0%, #FFFFFF 100%)',
};

const STEPS = [
  {
    number: '01',
    pl: 'Napisz do nas lub zadzwoń – doradzimy i pomożemy wybrać idealny samochód',
    en: 'Contact us - we\'ll help you choose the perfect car',
    icon: '📞',
    subtitle: {
      pl: 'Jesteśmy dostępni 24/7, aby pomóc Ci w wyborze',
      en: 'We\'re available 24/7 to help you choose'
    }
  },
  {
    number: '02',
    pl: 'Wybierz termin i miejsce odbioru – resztą zajmiemy się my',
    en: 'Pick your dates and pickup location - we\'ll handle the rest',
    icon: '🚗',
    subtitle: {
      pl: 'Elastyczne terminy i wygodne miejsca odbioru',
      en: 'Flexible dates and convenient pickup locations'
    }
  },
  {
    number: '03',
    pl: 'Odbierz gotowy samochód – szybka, jasna umowa, bez ukrytych kosztów',
    en: 'Pick up your ready car - quick, clear contract, no hidden fees',
    icon: '📝',
    subtitle: {
      pl: 'Przejrzyste zasady i uczciwe ceny',
      en: 'Transparent terms and fair prices'
    }
  },
  {
    number: '04',
    pl: 'Ciesz się podróżą – zwrot auta to czysta formalność',
    en: 'Enjoy your journey - returning the car is easy and hassle-free',
    icon: '🏖️',
    subtitle: {
      pl: 'Bezstresowy zwrot - dowolne miejsce w regionie',
      en: 'Stress-free return anywhere in the region'
    }
  },
];

// SVG paths for decorative elements
const ROAD_PATH = `
  M 100,150 
  C 140,400 60,650 100,900 
  C 140,1150 60,1400 100,1650
  C 140,1900 60,2150 100,2400
`;

const CLOUD_PATH = "M25,25 C25,15 35,5 50,5 C65,5 75,15 75,25 C85,15 100,15 100,30 C100,45 85,50 75,45 C75,55 65,60 50,60 C35,60 25,55 25,45 C15,50 0,45 0,30 C0,15 15,15 25,25 Z";

const CARS = [
  { emoji: '🚗', name: 'Economy', color: '#FFD600' },
  { emoji: '🚙', name: 'Compact', color: '#4FC3F7' },
  { emoji: '🚐', name: 'Van', color: '#FF9800' },
  { emoji: '🏎️', name: 'Premium', color: '#F44336' },
];

export default function HowItWorks() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const [cloudPositions, setCloudPositions] = useState<Array<{left: string, top: string}>>([]);

  // Initialize cloud positions on client-side only
  useEffect(() => {
    setCloudPositions([...Array(5)].map(() => ({
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 100}%` // Changed to use full height (0-100%)
    })));
  }, []);

  // Scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end start'] // Starts movement even later
  });

  // Smooth out the scroll progress with faster response
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15, // Reduced damping for faster response
    stiffness: 200, // Increased stiffness for quicker movement
    mass: 0.2 // Reduced mass for faster acceleration
  });

  // Calculate positions for multiple cars
  const [carPositions, setCarPositions] = useState(CARS.map(() => ({ x: 100, y: 0, angle: 0 })));
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    let stopTimeout: NodeJS.Timeout;
    let moveTimeout: NodeJS.Timeout;

    const updateCarPositions = (progress: number) => {
      if (!roadRef.current) return;
      
      const path = roadRef.current;
      const pathLength = path.getTotalLength();
      
      // Update positions for all cars with staggered offsets
      const newPositions = CARS.map((_, index) => {
        const carOffset = (index * 0.1); // Stagger cars along the path
        const adjustedProgress = Math.max(0, (progress - 0.3 + carOffset) * 1.4);
        const point = path.getPointAtLength(adjustedProgress * pathLength);
        
        const CURVE_DISTANCE = 5;
        const prevPoint = path.getPointAtLength(Math.max(0, (adjustedProgress * pathLength) - CURVE_DISTANCE));
        const nextPoint = path.getPointAtLength(Math.min(pathLength, (adjustedProgress * pathLength) + CURVE_DISTANCE));
        const angle = Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * (180 / Math.PI) + 180; // Changed to 180 degrees to make cars face down

        // Add small vertical bounce when stopping
        const bounceY = !isMoving ? Math.sin((Date.now() + index * 500) / 300) * 2 : 0;

        return {
          x: point.x,
          y: point.y + bounceY,
          angle: angle
        };
      });

      setCarPositions(newPositions);

      // Random stops between 2-4 seconds
      if (isMoving) {
        stopTimeout = setTimeout(() => {
          setIsMoving(false);
          // Resume after 1-2 seconds
          moveTimeout = setTimeout(() => {
            setIsMoving(true);
          }, 1000 + Math.random() * 1000);
        }, 2000 + Math.random() * 2000);
      }
    };

    const unsubscribe = smoothProgress.on('change', updateCarPositions);
    
    return () => {
      unsubscribe();
      clearTimeout(stopTimeout);
      clearTimeout(moveTimeout);
    };
  }, [smoothProgress, isMoving]);

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative min-h-[250vh] py-24 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(227, 242, 253, 0.4), rgba(255, 255, 255, 0.4)), url('/images/graphics/beach.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Clouds */}
        {cloudPositions.map((position, i) => (
          <motion.svg
            key={i}
            className="absolute"
            width="150"
            height="80"
            viewBox="0 0 100 65"
            style={{
              ...position,
              opacity: 0.7,
              zIndex: 30
            }}
            initial={{ x: -20 }}
            animate={{ x: 20 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 5 + Math.random() * 5,
              delay: Math.random() * 5
            }}
          >
            <path d={CLOUD_PATH} fill="white" filter="url(#cloud-shadow)" />
            <defs>
              <filter id="cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="2" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </motion.svg>
        ))}
      </div>

      {/* Header */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        className="text-center mb-16 px-4"
        >
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <h2 className="text-4xl font-bold text-[#1A2B49] mb-4">
          {language === 'pl' ? 'Jak to działa?' : 'How it works?'}
          </h2>
            <p className="text-lg text-[#1A2B49] max-w-2xl mx-auto font-medium">
            {language === 'pl' 
            ? 'Prosty proces w 4 krokach do wynajęcia samochodu'
            : 'A simple 4-step process to rent your car'}
          </p>
          </div>
        </motion.div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Road Container */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full" style={{ width: '200px', top: '100px' }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 200 2400"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {/* Road Shadow */}
            <path
              d={ROAD_PATH}
              stroke="#00000020"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
              transform="translate(5,5)"
            />
            {/* Main Road */}
            <path
              ref={roadRef}
              d={ROAD_PATH}
              stroke={COLORS.road}
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
            />
            {/* Center Line */}
            <path
              d={ROAD_PATH}
              stroke={COLORS.roadDash}
              strokeWidth="2"
              strokeDasharray="10,10"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Animated Cars */}
        {CARS.map((car, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 w-20 h-20"
            style={{
              x: carPositions[index].x - 100,
              y: carPositions[index].y,
              rotate: carPositions[index].angle,
              filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.2))',
              transformOrigin: 'center center',
              zIndex: 20
            }}
            animate={{
              scale: isMoving ? 1 : 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div 
              className="w-full h-full rounded-xl shadow-lg flex items-center justify-center flex-col"
              style={{
                transform: 'translate(-50%, -50%)',
                position: 'relative',
                left: '50%',
                backgroundColor: car.color
              }}
            >
              <motion.span 
                className="text-3xl" 
                style={{ transform: 'rotate(90deg)' }}
                animate={{ 
                  y: isMoving ? [0, -2, 0] : 0 
                }}
                transition={{ 
                  repeat: isMoving ? Infinity : 0, 
                  duration: 0.3 
                }}
              >
                {car.emoji}
              </motion.span>
              <span className="text-xs font-bold text-white mt-1 bg-black/30 px-2 py-1 rounded-full">
                {car.name}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Steps */}
        <div className="relative pt-24">
          {STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`flex ${
                  isLeft ? 'justify-end pr-[60%]' : 'justify-start pl-[60%]'
                } mb-48 relative`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className={`
                    w-full max-w-sm bg-white rounded-xl p-6 shadow-lg border-2
                    ${index % 2 === 0 ? 'border-[#FFD600]' : 'border-[#4FC3F7]'}
                    transform hover:scale-105 transition-transform duration-300
                  `}
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl sm:text-4xl mr-4">{step.icon}</span>
                    <span className="text-4xl sm:text-6xl font-bold text-[#1A2B49]/10">{step.number}</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold mb-2 text-[#1A2B49]">
                    {step[language]}
                  </h3>
                  <p className="text-sm text-[#1A2B49]/60">
                    {step.subtitle[language]}
                  </p>
                  <div
                    className={`w-4 h-4 rounded-full absolute ${
                      isLeft ? '-right-[10%]' : '-left-[10%]'
                    } top-1/2 -translate-y-1/2`}
                    style={{
                      backgroundColor: index % 2 === 0 ? COLORS.station1 : COLORS.station2,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-64 relative z-50"
        >
          <a
            href="#contact"
            className="inline-block bg-[#FFD600] text-[#1A2B49] px-16 py-8 rounded-full font-bold text-3xl shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
          >
            {language === 'pl' ? 'Rozpocznij swoją podróż!' : 'Start your journey!'}
          </a>
        </motion.div>
      </div>
    </section>
  );
} 