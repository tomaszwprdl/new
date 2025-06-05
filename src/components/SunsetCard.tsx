import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SunsetCard: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="card w-full max-w-4xl mx-auto">
      <div className="card__content">
        <div className="card-details flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="flex-shrink-0">
            <svg 
              className="sunsetsvg w-32 h-32 animate-float" 
              viewBox="0 0 200 200" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 1, 0.5))'
              }}
            >
              <defs>
                <linearGradient id="SunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#FFA500" />
                  <stop offset="100%" stopColor="#FF4500" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle 
                cx="100" 
                cy="100" 
                r="50" 
                fill="url(#SunGradient)"
                filter="url(#glow)"
              />
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-gradient text-3xl font-bold mb-4">NowRent</h2>
            <p className="text-primary text-lg">
              {language === 'pl' 
                ? 'W NowRent dbamy o to, by każda podróż po Costa Blanca była wygodna, bezpieczna i pełna radości. Zaufaj lokalnym ekspertom i ciesz się jazdą bez stresu – my zajmiemy się resztą.'
                : 'At NowRent, we make every journey across Costa Blanca comfortable, safe, and memorable. Trust the local experts and enjoy a worry-free drive – we\'ll handle the rest.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunsetCard; 