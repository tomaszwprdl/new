'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import useResizeObserver from '@/hooks/useResizeObserver';
import { PhoneIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import { AnimatePresence } from 'framer-motion';

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

// Constants with relative units
const ROAD_CONFIG = {
  width: '20vw',
  minWidth: '200px',
  maxWidth: '300px',
  strokeWidth: '40',
  dashSize: '10',
};

// SVG paths for decorative elements
const ROAD_PATH = `
  M 100,100 
  C 140,400 60,650 100,900 
  C 140,1150 60,1400 100,1650
  C 140,1900 60,2150 100,2300
`;

const CLOUD_PATH = "M25,25 C25,15 35,5 50,5 C65,5 75,15 75,25 C85,15 100,15 100,30 C100,45 85,50 75,45 C75,55 65,60 50,60 C35,60 25,55 25,45 C15,50 0,45 0,30 C0,15 15,15 25,25 Z";

const CARS = [
  { emoji: '🚗', name: 'Economy', color: '#FFD600' },
  { emoji: '🚙', name: 'Compact', color: '#4FC3F7' },
  { emoji: '🚐', name: 'Van', color: '#FF9800' },
  { emoji: '🏎️', name: 'Premium', color: '#F44336' },
];

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

export default function HowItWorks() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<SVGPathElement>(null);
  const [cloudPositions, setCloudPositions] = useState<Array<{left: string, top: string}>>([]);
  const [showHelpButton, setShowHelpButton] = useState(false);
  const [carPositions, setCarPositions] = useState(CARS.map(() => ({ x: 100, y: 0, angle: 0, scale: 1 })));
  const [isMoving, setIsMoving] = useState(true);
  const isInView = useInView(containerRef, { margin: "-10%" });

  // Use ResizeObserver to handle container size changes
  const { width: containerWidth, height: containerHeight } = useResizeObserver(containerRef);

  // Initialize cloud positions on client-side only
  useEffect(() => {
    setCloudPositions([...Array(5)].map(() => ({
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 100}%`
    })));
  }, []);

  // Show/hide help button based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
      setShowHelpButton(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll progress using Intersection Observer with optimized settings
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 40%', 'end start']
  });

  // Smooth scroll progress with optimized spring settings
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 300,
    mass: 0.5,
    restDelta: 0.001
  });

  // Memoize car animation parameters
  const carAnimParams = useMemo(() => ({
    pathLength: roadRef.current?.getTotalLength() || 0,
    CURVE_DISTANCE: 5,
    END_THRESHOLD: 0.84,
    MAX_PROGRESS: 0.85
  }), []);

  // Optimize position calculation with useCallback
  const calculateCarPosition = useCallback((progress: number, index: number, pathLength: number) => {
    const carOffset = (index * 0.1);
    const adjustedProgress = Math.min(carAnimParams.MAX_PROGRESS, Math.max(0, (progress - 0.3 + carOffset) * 1.4));
    
    if (!roadRef.current) return { x: 100, y: 0, angle: 0, scale: 1 };
    
    const point = roadRef.current.getPointAtLength(adjustedProgress * pathLength);
        
    const prevPoint = roadRef.current.getPointAtLength(
      Math.max(0, (adjustedProgress * pathLength) - carAnimParams.CURVE_DISTANCE)
    );
    const nextPoint = roadRef.current.getPointAtLength(
      Math.min(pathLength, (adjustedProgress * pathLength) + carAnimParams.CURVE_DISTANCE)
    );
    
    const angle = Math.atan2(nextPoint.y - prevPoint.y, nextPoint.x - prevPoint.x) * (180 / Math.PI) + 180;
    const isAtEnd = adjustedProgress >= carAnimParams.END_THRESHOLD;

    // Optimize bounce calculation
    const bounceY = (!isMoving || isAtEnd) 
      ? Math.sin(performance.now() / 300 + index * 500) * 2 
      : 0;

        return {
          x: point.x,
          y: point.y + bounceY,
      angle,
      scale: isAtEnd ? 1.05 : 1
        };
  }, [isMoving, carAnimParams]);

  // Update car positions with optimized animation frame handling
  useEffect(() => {
    if (!roadRef.current || !containerWidth) return;

    const pathLength = roadRef.current.getTotalLength();
    let animationFrameId: number;

    const updateCarPositions = (progress: number) => {
      animationFrameId = requestAnimationFrame(() => {
        const newPositions = CARS.map((_, index) => 
          calculateCarPosition(progress, index, pathLength)
        );
        setCarPositions(newPositions);
      });
    };

    const unsubscribe = smoothProgress.on('change', updateCarPositions);
    
    return () => {
      unsubscribe();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [smoothProgress, containerWidth, calculateCarPosition]);

  // Optimize movement toggle with useCallback
  const toggleMovement = useCallback(() => {
    setIsMoving(prev => !prev);
  }, []);

  // Movement animation effect with optimized timer
  useEffect(() => {
    if (!isInView) {
      setIsMoving(false);
      return;
    }

    const timer = setInterval(toggleMovement, isMoving ? 2000 : 1000);
    return () => clearInterval(timer);
  }, [isInView, isMoving, toggleMovement]);

  // Create scroll-triggered animations for each card
  const cardVariants = {
    hidden: (isLeft: boolean) => ({
      opacity: 0,
      x: isLeft ? -100 : 100,
      y: 50,
      rotate: isLeft ? -10 : 10,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative min-h-[250vh] py-24 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, rgba(227, 242, 253, 0.4), rgba(255, 255, 255, 0.4)), url('/images/graphics/beach.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
      role="region"
      aria-label={language === 'pl' ? 'Jak to działa?' : 'How it works?'}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
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
              zIndex: 10
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
      <div className="max-w-6xl mx-auto px-4 relative" style={{ zIndex: 30 }}>
        {/* Road Container */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 h-full"
          style={{ 
            width: ROAD_CONFIG.width,
            minWidth: ROAD_CONFIG.minWidth,
            maxWidth: ROAD_CONFIG.maxWidth,
            top: '50px',
            zIndex: 20
          }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 200 2400"
            preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            {/* Station 1 (Start) */}
            <circle
              cx="100"
              cy="100"
              r="30"
              fill={COLORS.station1}
              opacity="0.2"
            />
            <circle
              cx="100"
              cy="100"
              r="20"
              fill={COLORS.station1}
              opacity="0.3"
            />

            {/* Road Shadow */}
            <path
              d={ROAD_PATH}
              stroke="#00000020"
              strokeWidth={ROAD_CONFIG.strokeWidth}
              fill="none"
              strokeLinecap="round"
              transform="translate(5,5)"
            />
            {/* Main Road */}
            <path
              ref={roadRef}
              d={ROAD_PATH}
              stroke="#1A2B49"
              strokeWidth={ROAD_CONFIG.strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
            {/* Center Line */}
            <path
              d={ROAD_PATH}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray={`${ROAD_CONFIG.dashSize},${ROAD_CONFIG.dashSize}`}
              fill="none"
              strokeLinecap="round"
            />

            {/* Station 2 (End) */}
            <circle
              cx="100"
              cy="2300"
              r="30"
              fill={COLORS.station2}
              opacity="0.2"
            />
            <circle
              cx="100"
              cy="2300"
              r="20"
              fill={COLORS.station2}
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Animated Cars */}
        {CARS.map((car, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2"
            style={{
              width: 'clamp(3rem, 5vw, 5rem)',
              aspectRatio: '1',
              x: carPositions[index].x - 100,
              y: carPositions[index].y,
              rotate: carPositions[index].angle,
              scale: carPositions[index].scale,
              filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.2))',
              transformOrigin: 'center center',
              zIndex: 25,
              transition: 'all 0.3s ease-out'
            }}
            animate={{
              scale: isMoving ? carPositions[index].scale : 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <div 
              className="w-full h-full rounded-xl shadow-lg flex items-center justify-center flex-col"
              style={{
                transform: 'translate(-50%, -50%)',
                position: 'relative',
                left: '50%',
                backgroundColor: car.color,
                transition: 'all 0.3s ease-out'
              }}
            >
              <motion.span 
                className="text-[2em]" 
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
              <span className="text-[0.6em] font-bold text-white mt-1 bg-black/30 px-2 py-1 rounded-full">
                {car.name}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Steps */}
        <div className="relative pt-24" style={{ zIndex: 40 }}>
          {STEPS.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`
                  flex mb-48 relative
                  ${isLeft ? 'md:justify-end md:pr-[60%]' : 'md:justify-start md:pl-[60%]'}
                  justify-center pr-0 pl-0
                `}
                style={{ zIndex: 40 }}
                variants={cardVariants}
                custom={isLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ 
                  once: false,
                  margin: "-20%",
                  amount: 0.4
                }}
              >
                <motion.div
                  className={`
                    bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2
                    ${index % 2 === 0 ? 'border-[#FFD600]' : 'border-[#4FC3F7]'}
                    transform transition-all duration-300
                    mx-auto
                    w-[96vw] max-w-[420px] h-[230px] p-3
                    md:w-full md:max-w-sm md:h-auto md:p-6 md:mx-0
                  `}
                  style={{ position: 'relative', zIndex: 40 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: isLeft ? -2 : 2,
                    transition: { duration: 0.3 }
                  }}
                  tabIndex={0}
                  role="article"
                  aria-label={`Step ${step.number}: ${step[language]}`}
                >
                  <div className="flex items-center mb-4 relative">
                    <motion.span 
                      className="text-4xl sm:text-6xl mr-6" 
                      role="img" 
                      aria-label={step.icon}
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      {step.icon}
                    </motion.span>
                    <span 
                      className="text-[8vw] font-black text-[#1A2B49]/5 absolute -top-8 -right-4 pointer-events-none select-none"
                      style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <motion.h3 
                    className="text-xl sm:text-2xl font-semibold mb-3 text-[#1A2B49]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {step[language]}
                  </motion.h3>
                  <motion.p 
                    className="text-base sm:text-lg text-[#1A2B49]/70"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {step.subtitle[language]}
                  </motion.p>
                  <div
                    className={`w-[1em] h-[1em] rounded-full absolute ${
                      isLeft ? '-right-[10%]' : '-left-[10%]'
                    } top-1/2 -translate-y-1/2`}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#FFD600' : '#4FC3F7',
                      boxShadow: '0 0.125em 0.25em rgba(0,0,0,0.1)',
                    }}
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: '2vh' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 relative z-50"
        >
          <button
            onClick={() => {
              const element = document.querySelector('#booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-block bg-[#FFD600] text-[#1A2B49] px-[4.4rem] py-[2.2rem] rounded-full font-bold text-[2.2em] shadow-lg hover:transform hover:scale-105 transition-transform duration-300"
          >
            {language === 'pl' ? 'Rozpocznij swoją podróż!' : 'Start your journey!'}
          </button>
        </motion.div>
      </div>
    </section>
  );
} 