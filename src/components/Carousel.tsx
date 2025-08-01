import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CarouselProps {
  slides: React.ReactNode[];
  language: string;
}

export default function Carousel({ slides, language }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative">
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/20'
            }`}
            aria-label={`${language === 'pl' ? 'Przejdź do slajdu' : 'Go to slide'} ${index + 1}`}
            aria-current={currentSlide === index ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
} 