'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function SurferAnimation() {
  const [localScroll, setLocalScroll] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 50% larger surfer dimensions
  const SURFER_WIDTH = isMobile ? 240 : 360;
  const SURFER_HEIGHT = isMobile ? 165 : 240;
  const SECTION_HEIGHT = isMobile ? 320 : 440;
  const MAIN_WAVE_Y = isMobile ? 170 : 260; // y-position for main wave crest

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const scroll = window.scrollY - sectionTop;
        setLocalScroll(scroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Surfer moves horizontally as you scroll through the section
  const containerWidth = windowWidth;
  const startScroll = 0; // px before surfer starts moving
  const maxScroll = 400; // px of scroll for full movement
  let scrollRatio = 0;
  if (localScroll > startScroll) {
    scrollRatio = Math.max(0, Math.min(1, (localScroll - startScroll) / (maxScroll - startScroll)));
  }
  const surferX = scrollRatio * (containerWidth - SURFER_WIDTH);
  // Bobbing effect: gentle up and down as surfer moves
  const surferBob = Math.sin(scrollRatio * Math.PI * 2) * (isMobile ? 15 : 24);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        height: SECTION_HEIGHT,
        background: 'linear-gradient(to bottom, #e0f3ff 80%, #3B82F6 100%)',
      }}
    >
      {/* Sun */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 24,
          zIndex: 2,
        }}
      >
        <svg width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} viewBox="0 0 100 100">
          <defs>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#sunGradient)" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="10" x2="50" y2="20" stroke="#FFD700" strokeWidth="4" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </svg>
      </div>
      {/* Clouds */}
      <svg width="100%" height={SECTION_HEIGHT / 2} style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
        <g>
          <ellipse cx={isMobile ? 60 : 120} cy={30} rx={isMobile ? 24 : 40} ry={isMobile ? 10 : 18} fill="#fff" opacity="0.8" />
          <ellipse cx={isMobile ? 180 : 300} cy={50} rx={isMobile ? 18 : 30} ry={isMobile ? 8 : 14} fill="#fff" opacity="0.7" />
          <ellipse cx={isMobile ? 320 : 500} cy={28} rx={isMobile ? 20 : 32} ry={isMobile ? 9 : 15} fill="#fff" opacity="0.8" />
          <ellipse cx={isMobile ? 220 : 400} cy={70} rx={isMobile ? 14 : 22} ry={isMobile ? 6 : 10} fill="#fff" opacity="0.6" />
        </g>
      </svg>
      {/* Background wave layers */}
      <svg width="100%" height={SECTION_HEIGHT} style={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}>
        {/* Farthest wave */}
        <path d={`M0,${MAIN_WAVE_Y - 60} Q${containerWidth / 2},${MAIN_WAVE_Y - 80} ${containerWidth},${MAIN_WAVE_Y - 60} V0 H0 Z`} fill="#b3e0ff" opacity="0.5" />
        {/* Mid wave */}
        <path d={`M0,${MAIN_WAVE_Y - 20} Q${containerWidth / 2},${MAIN_WAVE_Y - 40} ${containerWidth},${MAIN_WAVE_Y - 20} V0 H0 Z`} fill="#7ecbfa" opacity="0.6" />
      </svg>
      {/* Main wave (surfer rides this) */}
      <svg width="100%" height={SECTION_HEIGHT} style={{ position: 'absolute', left: 0, top: 0, zIndex: 3 }}>
        <path d={`M0,${MAIN_WAVE_Y} Q${containerWidth / 2},${MAIN_WAVE_Y + 30} ${containerWidth},${MAIN_WAVE_Y} V${SECTION_HEIGHT} H0 Z`} fill="#4faaff" opacity="0.9" />
        {/* Foam details */}
        <path d={`M${containerWidth * 0.25},${MAIN_WAVE_Y + 10} Q${containerWidth * 0.3},${MAIN_WAVE_Y + 18} ${containerWidth * 0.35},${MAIN_WAVE_Y + 10}`} stroke="#fff" strokeWidth="2" fill="none" opacity="0.7" />
        <path d={`M${containerWidth * 0.7},${MAIN_WAVE_Y + 12} Q${containerWidth * 0.75},${MAIN_WAVE_Y + 20} ${containerWidth * 0.8},${MAIN_WAVE_Y + 12}`} stroke="#fff" strokeWidth="2" fill="none" opacity="0.7" />
      </svg>
      {/* Foreground wave */}
      <svg width="100%" height={SECTION_HEIGHT} style={{ position: 'absolute', left: 0, top: 0, zIndex: 4 }}>
        <path d={`M0,${MAIN_WAVE_Y + 60} Q${containerWidth / 2},${MAIN_WAVE_Y + 80} ${containerWidth},${MAIN_WAVE_Y + 60} V${SECTION_HEIGHT} H0 Z`} fill="#3B82F6" opacity="0.8" />
      </svg>
      {/* Surfer on the main wave */}
      <div
        className="absolute z-10"
        style={{
          left: surferX,
          top: MAIN_WAVE_Y - SURFER_HEIGHT / 2 + surferBob,
          width: SURFER_WIDTH,
          height: SURFER_HEIGHT,
          transition: isMobile ? 'none' : 'transform 0.1s ease-out',
          willChange: 'transform',
        }}
      >
        <Image
          alt="Surfer"
          src="/images/graphics/swimming.svg"
          width={SURFER_WIDTH}
          height={SURFER_HEIGHT}
          priority
          className="pointer-events-none object-contain"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
} 