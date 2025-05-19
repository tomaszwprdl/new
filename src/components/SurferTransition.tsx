import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const SurferTransition: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust start and end scroll positions for the animation
  const start = isMobile ? 2500 : 800; // px from top where animation starts (even later on mobile)
  const end = 2200;  // px from top where animation ends (reduced from 2400 to 2200 for 10% faster movement)

  // Animate x from -100px (off left) to 100vw (off right)
  const x = useTransform(scrollY, [start, end], ['-100px', '100vw']);

  return (
    <div ref={ref} className="relative w-full h-56" style={{ pointerEvents: 'none' }}>
      {/* Puddle SVG at the bottom */}
      <div className="absolute left-0 bottom-0 w-full z-10">
        <svg width="100%" height="80" viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <ellipse cx="600" cy="60" rx="600" ry="20" fill="#48CAE4" fillOpacity="0.7" />
        </svg>
      </div>
      {/* Animated Surfer on the puddle */}
      <motion.div
        style={{ x }}
        className="absolute left-0 bottom-8 z-20"
        initial={false}
      >
        <Image
          src="/images/graphics/swimming.svg"
          alt="Surfer"
          width={384}
          height={384}
          style={{ width: '384px', height: 'auto' }}
          className="pointer-events-none"
        />
      </motion.div>
    </div>
  );
};

export default SurferTransition; 