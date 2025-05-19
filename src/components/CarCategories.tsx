'use client';

import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const carTypes = [
  {
    type: { en: 'Van', pl: 'Van' },
    image: '/images/cars/van.png',
    price: 55,
    details: { en: 'Van, 7 seats', pl: 'Van, 7 miejsc' }
  },
  {
    type: { en: 'SUV', pl: 'SUV' },
    image: '/images/cars/suv.png',
    price: 45,
    details: { en: 'SUV, 5 seats', pl: 'SUV, 5 miejsc' }
  },
  {
    type: { en: 'Luxury', pl: 'Luksusowy' },
    image: '/images/cars/luksusowy.png',
    price: 75,
    details: { en: 'Luxury, 5 seats', pl: 'Luksusowy, 5 miejsc' }
  },
  {
    type: { en: 'Compact', pl: 'Kompaktowy' },
    image: '/images/cars/kompaktowy.png',
    price: 35,
    details: { en: 'Compact, 5 seats', pl: 'Kompaktowy, 5 miejsc' }
  },
  {
    type: { en: 'Economy', pl: 'Ekonomiczny' },
    image: '/images/cars/eco.png',
    price: 29,
    details: { en: 'Economy, 4 seats', pl: 'Ekonomiczny, 4 miejsca' }
  }
];

export default function CarCategories() {
  const { language } = useLanguage();
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 1,
      spacing: 12,
    },
    breakpoints: {
      '(min-width: 600px)': {
        slides: { perView: 2, spacing: 24 },
      },
      '(min-width: 900px)': {
        slides: { perView: 3, spacing: 40 },
      },
      '(min-width: 1400px)': {
        slides: { perView: 4, spacing: 56 },
      },
    },
  });

  // Auto-scroll effect: move left every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.prev();
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Palm tree animation
  useEffect(() => {
    // No JS needed, handled by CSS keyframes
  }, []);

  return (
    <section
      id="cars"
      className="relative w-full h-[420px] md:h-[500px] lg:h-[700px] overflow-hidden bg-[#e0eafc] flex flex-col justify-end"
    >
      {/* Road */}
      <div className="road absolute bottom-0 left-0 w-full h-[60px] md:h-[90px] bg-[#333] rounded-t-[30px] md:rounded-t-[40px] z-10 shadow-lg">
        <div className="road-dash w-full h-1 absolute top-[28px] md:top-[44px] left-0 z-20" />
      </div>
      {/* Carousel */}
      <div ref={sliderRef} className="keen-slider relative z-20 pb-[60px] md:pb-[90px] px-1 md:px-0">
        {carTypes.map((car, index) => (
          <div
            key={index}
            className="keen-slider__slide w-full h-[220px] md:h-[410px] lg:h-[600px] px-1 md:px-2 box-border text-center"
          >
            <div className="flex flex-col items-center w-full h-full justify-between">
              <div className="flex flex-col items-center w-full flex-1 justify-start mt-4 md:mt-16 lg:mt-32">
                <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4 text-center break-words whitespace-normal">
                  {car.type[language]}
                </h3>
                <span className="fleet-price inline-block px-4 py-1 md:px-7 md:py-2 rounded-full bg-blue-500 text-white text-base md:text-lg font-semibold shadow-md mb-2 md:mb-4">
                  {language === 'pl' ? 'od' : 'from'} {car.price} €/{language === 'pl' ? 'dzień' : 'day'}
                </span>
              </div>
              <Image
                src={car.image}
                alt={car.type[language]}
                width={240}
                height={160}
                className="car-img h-[140px] md:h-[180px] lg:h-[260px] object-contain drop-shadow-xl w-auto mx-auto"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .road-dash {
          background: repeating-linear-gradient(
            to right,
            #fff 0 30px,
            transparent 30px 60px
          );
        }
        @keyframes movePalm {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-120vw);
          }
        }
      `}</style>
    </section>
  );
} 