import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const navigation = {
  main: [
    { name: { en: 'Home', pl: 'Strona główna' }, href: '#home' },
    { name: { en: 'How it Works', pl: 'Jak to działa' }, href: '#how' },
    { name: { en: 'Testimonials', pl: 'Opinie' }, href: '#testimonials' },
    { name: { en: 'Contact', pl: 'Kontakt' }, href: '#contact' },
  ],
  social: [
    { 
      name: 'Facebook', 
      href: '#', 
      icon: 'facebook',
      ariaLabel: 'Visit our Facebook page'
    },
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/34694229035', 
      icon: 'whatsapp',
      ariaLabel: 'Contact us on WhatsApp'
    },
    { 
      name: 'Instagram', 
      href: '#', 
      icon: 'instagram',
      ariaLabel: 'Follow us on Instagram'
    },
    { 
      name: 'TikTok', 
      href: '#', 
      icon: 'tiktok',
      ariaLabel: 'Follow us on TikTok'
    },
  ],
};

export default function Footer() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary pt-10 pb-4 mt-12 relative overflow-hidden">
      {/* Background accent - subtle palm tree silhouette */}
      <div className="absolute right-0 bottom-0 text-white opacity-10 text-[200px] pointer-events-none">
        🌴
      </div>
      
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 relative z-10">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-2 relative w-[60px] h-[60px]">
            <Image 
              src="/images/logo.png" 
              alt="NowRent logo" 
              fill
              className="object-contain"
            />
          </div>
          <p className="text-white font-semibold text-lg">NowRent</p>
          <p className="text-white text-sm mt-1">
            {language === 'pl' ? 'Wypożyczalnia aut Costa Blanca' : 'Car Rental Costa Blanca'}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          {navigation.main.map((item) => (
            <Link
              key={item.name[language]}
              href={item.href}
              className="text-white hover:text-accent font-medium transition-colors"
            >
              {item.name[language]}
            </Link>
          ))}
        </nav>

        {/* Contact and Social */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Contact info */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a 
              href="tel:+34694229035" 
              className="text-white hover:text-accent font-medium transition-colors flex items-center gap-2"
            >
              <span>📞</span> +34 694 22 90 35
            </a>
            <a 
              href="mailto:nowrentes@gmail.com"
              className="text-white hover:text-accent font-medium transition-colors flex items-center gap-2"
            >
              <span>✉️</span> nowrentes@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4 mt-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                aria-label={item.ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent transition-colors"
              >
                <i className={`fab fa-${item.icon} text-2xl`} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-accent">
        <p>© {currentYear} NowRent. {language === 'pl' ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}</p>
      </div>
      {/* Designer credit */}
      <div className="mt-2 text-center text-xs text-accent">
        <p>Designed with ❤ by Weston</p>
      </div>
    </footer>
  );
} 