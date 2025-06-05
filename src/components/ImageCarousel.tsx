'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface CarouselImage {
  src: string;
  title: string;
  desc: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const ChevronLeft = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
    <path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
    <path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Modal: React.FC<{ image: CarouselImage; onClose: () => void }> = ({ image, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
      <img src={image.src} alt={image.title} className="w-full rounded-lg mb-4" style={{maxHeight: '60vh', objectFit: 'contain'}} />
      <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
      <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
    </div>
  </div>
);

// Default images for demonstration
const defaultImages: CarouselImage[] = [
  {
    src: "/images/cars/car1.webp",
    title: "Sierra de Grazalema",
    desc: "Stunning mountain views and hiking trails."
  },
  {
    src: "/images/cars/car2.webp",
    title: "Las Salinas de Torrevieja",
    desc: "Famous pink salt lake, perfect for photos."
  },
  {
    src: "/images/cars/car3.webp",
    title: "Costa del Sol",
    desc: "Sunny beaches and vibrant nightlife."
  },
  {
    src: "/images/cars/car4.webp",
    title: "Barcelona",
    desc: "Iconic architecture and city life."
  },
  {
    src: "/images/cars/car5.webp",
    title: "Madrid",
    desc: "The heart of Spain, full of culture."
  }
];

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images = defaultImages }) => {
  const [centerIdx, setCenterIdx] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getIndices = () => {
    const len = images.length;
    return [
      (centerIdx + len - 1) % len, // left
      centerIdx,                   // center
      (centerIdx + 1) % len        // right
    ];
  };

  useEffect(() => {
    if (enlarged) return;
    const timer = setInterval(() => {
      setCenterIdx((idx) => (idx + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [centerIdx, enlarged, images.length]);

  const indices = getIndices();

  return (
    <div 
      className="relative w-full flex flex-col items-center py-12 overflow-hidden"
    >
      {/* Palm tree top right */}
      <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none z-0 opacity-80">
        <svg viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="160" cy="180" rx="32" ry="10" fill="#FDE68A" fillOpacity="0.3" />
          <rect x="150" y="100" width="8" height="80" fill="#A3A3A3" rx="3" />
          <path d="M154 110 Q140 90 170 100" stroke="#34D399" strokeWidth="4" fill="none" />
          <path d="M154 120 Q130 110 170 120" stroke="#34D399" strokeWidth="4" fill="none" />
          <path d="M154 130 Q140 130 170 140" stroke="#34D399" strokeWidth="4" fill="none" />
        </svg>
      </div>
      {/* Palm tree bottom left */}
      <div className="absolute bottom-0 left-0 w-64 h-40 pointer-events-none z-0 opacity-70">
        <svg viewBox="0 0 256 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="60" cy="110" rx="60" ry="10" fill="#FDE68A" fillOpacity="0.3" />
          <rect x="50" y="60" width="10" height="60" fill="#A3A3A3" rx="3" />
          <path d="M55 70 Q30 60 80 80" stroke="#34D399" strokeWidth="4" fill="none" />
          <path d="M55 80 Q20 90 90 90" stroke="#34D399" strokeWidth="4" fill="none" />
          <path d="M55 90 Q40 110 100 100" stroke="#34D399" strokeWidth="4" fill="none" />
        </svg>
      </div>
      <div className="w-full flex items-center justify-center mb-2 relative">
        <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-sm text-center">
          {language === 'pl' ? 'Popularne Destynacje' : 'Popular Destinations'}
        </h2>
      </div>
      <p className="text-lg text-blue-700 mb-8 max-w-2xl text-center mx-auto">
        {language === 'pl' 
          ? 'Odkryj najpiękniejsze i najbardziej unikalne miejsca do odwiedzenia podczas pobytu na Costa Blanca. Poznaj nasze starannie wybrane destynacje dla niezapomnianych wrażeń!'
          : 'Discover the most beautiful and unique places to visit during your stay on the Costa Blanca. Explore our handpicked destinations for unforgettable experiences!'}
      </p>
      <div className="w-full flex items-center justify-center">
        {/* Desktop carousel */}
        <div className="hidden md:flex flex-1 items-center justify-center relative z-20">
          <div className="relative flex items-center justify-center mx-auto h-[500px] w-full">
            <button
              className="absolute left-0 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
              onClick={() => setCenterIdx((idx) => (idx + images.length - 1) % images.length)}
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <div
              className="mx-2 cursor-pointer transition-transform duration-300"
              style={{
                transform: "scale(0.7)",
                opacity: 0.6,
                zIndex: 1
              }}
              onClick={() => setCenterIdx((idx) => (idx + images.length - 1) % images.length)}
            >
              <img
                src={images[indices[0]].src}
                alt={images[indices[0]].title}
                width={280}
                height={200}
                className="rounded-lg shadow-lg object-contain w-[280px] h-[200px] bg-white"
                loading="lazy"
              />
            </div>
            <div
              className="mx-4 cursor-pointer transition-transform duration-300"
              style={{
                transform: "scale(1.2)",
                zIndex: 2,
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
              }}
              onClick={() => setEnlarged(true)}
            >
              <img
                src={images[indices[1]].src}
                alt={images[indices[1]].title}
                width={440}
                height={300}
                className="rounded-xl shadow-2xl object-contain w-[440px] h-[300px] border-4 border-blue-300 bg-white"
                loading="eager"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">{images[indices[1]].title}</h3>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                  {language === 'pl' ? 'Kliknij, aby powiększyć' : 'Click to enlarge'}
                </span>
              </div>
            </div>
            <div
              className="mx-2 cursor-pointer transition-transform duration-300"
              style={{
                transform: "scale(0.7)",
                opacity: 0.6,
                zIndex: 1
              }}
              onClick={() => setCenterIdx((idx) => (idx + 1) % images.length)}
            >
              <img
                src={images[indices[2]].src}
                alt={images[indices[2]].title}
                width={280}
                height={200}
                className="rounded-lg shadow-lg object-contain w-[280px] h-[200px] bg-white"
                loading="lazy"
              />
            </div>
            <button
              className="absolute right-0 z-10 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
              onClick={() => setCenterIdx((idx) => (idx + 1) % images.length)}
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
        {/* Mobile: show only the center image, enlarged and accessible */}
        <div className="flex md:hidden flex-1 items-center justify-center relative z-20 w-full">
          <div className="relative flex flex-col items-center justify-center mx-auto w-full">
            <div className="relative w-full h-[60vw] max-h-[400px] min-h-[220px]">
              <Image
                src={images[centerIdx].src}
                alt={images[centerIdx].title}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-xl shadow-2xl object-contain border-4 border-blue-300 bg-white"
                priority={centerIdx === 0}
                loading={centerIdx === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="text-center mt-4 px-2">
              <h3 className="text-lg font-semibold">{images[centerIdx].title}</h3>
              <p className="text-base text-blue-800 mt-2">{images[centerIdx].desc}</p>
            </div>
            <div className="flex mt-4 space-x-4 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-colors duration-200 ${
                    idx === centerIdx ? "bg-blue-600" : "bg-blue-200"
                  }`}
                  onClick={() => setCenterIdx(idx)}
                  aria-label={`${language === 'pl' ? 'Przejdź do' : 'Go to'} ${img.title}`}
                  aria-current={idx === centerIdx ? 'true' : 'false'}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    minWidth: '24px',
                    minHeight: '24px',
                    padding: '8px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Only show modal on desktop */}
      {!isMobile && enlarged && (
        <Modal image={images[indices[1]]} onClose={() => setEnlarged(false)} />
      )}
    </div>
  );
}; 