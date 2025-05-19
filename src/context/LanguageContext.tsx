'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.howItWorks': 'How it Works',
    'nav.cars': 'Cars',
    'nav.destinations': 'Destinations',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Your Summer. Your Journey. Your Freedom.',
    'hero.subtitle': 'Explore the Alicante region your way. With NowRent, find the perfect car and enjoy an unforgettable Costa Blanca holiday.',
    'hero.cta.primary': 'Book Your Car',
    'hero.cta.secondary': 'See Our Cars',
    
    // Trust Section
    'trust.title': 'Trusted by Thousands of Happy Customers',
    'trust.subtitle': 'At NowRent, we make every journey across Costa Blanca comfortable, safe, and memorable. Trust the local experts and enjoy a worry-free drive – we\'ll handle the rest.',
    'trust.badges.local': '100% Local Service',
    'trust.badges.local.desc': 'We are a local company with deep roots in the community',
    'trust.badges.fees': 'No Hidden Fees',
    'trust.badges.fees.desc': 'Transparent pricing with no surprises',
    'trust.badges.delivery': 'Free Delivery',
    'trust.badges.delivery.desc': 'We deliver your car to your location',
    'trust.badges.support': '24/7 Support',
    'trust.badges.support.desc': 'Our team is always here to help',
  },
  pl: {
    // Navigation
    'nav.home': 'Strona główna',
    'nav.about': 'O nas',
    'nav.howItWorks': 'Jak to działa',
    'nav.cars': 'Samochody',
    'nav.destinations': 'Destynacje',
    'nav.testimonials': 'Opinie',
    'nav.contact': 'Kontakt',
    
    // Hero Section
    'hero.title': 'Twoje Lato.|Twoja Droga.|Twoja&nbsp;Wolność.',
    'hero.subtitle': 'Odkrywaj region Alicante na własnych zasadach. Z NowRent wynajmiesz idealny samochód i przeżyjesz niezapomniane wakacje na Costa Blanca.',
    'hero.cta.primary': 'Zarezerwuj samochód',
    'hero.cta.secondary': 'Zobacz Samochody',
    
    // Trust Section
    'trust.title': 'Zaufali nam tysiące zadowolonych klientów',
    'trust.subtitle': 'W NowRent dbamy o to, by każda podróż po Costa Blanca była wygodna, bezpieczna i pełna radości. Zaufaj lokalnym ekspertom i ciesz się jazdą bez stresu – my zajmiemy się resztą.',
    'trust.badges.local': '100% Lokalny Serwis',
    'trust.badges.local.desc': 'Jesteśmy lokalną firmą z głębokimi korzeniami w społeczności',
    'trust.badges.fees': 'Brak ukrytych opłat',
    'trust.badges.fees.desc': 'Przejrzyste ceny bez niespodzianek',
    'trust.badges.delivery': 'Darmowa dostawa',
    'trust.badges.delivery.desc': 'Dostarczamy samochód pod wskazany adres',
    'trust.badges.support': 'Wsparcie 24/7',
    'trust.badges.support.desc': 'Nasz zespół jest zawsze gotowy do pomocy',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      setLanguage(browserLanguage === 'pl' ? 'pl' : 'en');
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 