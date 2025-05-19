import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const SunsetCard: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="card w-full max-w-4xl mx-auto">
      <div className="card__content">
        <div className="card-details flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="flex-shrink-0">
            <svg className="sunsetsvg w-32 h-32" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="MyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD701" />
                  <stop offset="50%" stopColor="#FD2E24" />
                  <stop offset="100%" stopColor="#ca1eb3" />
                </linearGradient>
              </defs>
              <path id="sun" d="M100,50 C127.6,50 150,72.4 150,100 C150,127.6 127.6,150 100,150 C72.4,150 50,127.6 50,100 C50,72.4 72.4,50 100,50 Z" />
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-title text-3xl font-bold mb-4">NowRent</h2>
            <p className="text-body text-lg">
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