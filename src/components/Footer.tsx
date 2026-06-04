'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  const contactInfo = {
    phoneDisplay: '+34 694 22 90 35',
    phoneHref: 'tel:+34694229035',
    whatsappHref: 'https://wa.me/34694229035',
    email: 'nowrentes@gmail.com',
    address: {
      en: 'Costa Blanca South, Spain',
      pl: 'Costa Blanca, Hiszpania'
    },
    whatsapp: 'WhatsApp'
  };

  const quickLinks = [
    { 
      title: { en: 'About Us', pl: 'O Nas' },
      href: '#features'
    },
    {
      title: { en: 'Cars', pl: 'Samochody' },
      href: '#cars'
    },
    {
      title: { en: 'Book Now', pl: 'Zarezerwuj' },
      href: '#booking'
    },
    {
      title: { en: 'Contact', pl: 'Kontakt' },
      href: '#booking'
    }
  ];

  const legalLinks = [
    {
      title: { en: 'Privacy Policy', pl: 'Polityka prywatności' },
      href: '/[lang]/privacy-policy'
    },
    {
      title: { en: 'Terms & Conditions', pl: 'Regulamin' },
      href: '/[lang]/terms'
    },
    {
      title: { en: 'Cookie Policy', pl: 'Polityka cookies' },
      href: '/[lang]/cookies'
    }
  ];

  const content = {
    en: {
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      rights: 'All rights reserved',
      contact: {
        title: 'Contact',
        email: 'Email:',
        phone: 'Phone:',
        address: 'Address:'
      }
    },
    pl: {
      privacyPolicy: 'Polityka prywatności',
      terms: 'Regulamin',
      cookies: 'Polityka cookies',
      rights: 'Wszelkie prawa zastrzeżone',
      contact: {
        title: 'Kontakt',
        email: 'Email:',
        phone: 'Telefon:',
        address: 'Adres:'
      }
    }
  };

  return (
    <footer className="bg-[#0D1B33] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/images/logo.webp"
                alt="NowRent logo"
                width={32}
                height={32}
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="text-white text-xl font-semibold">NowRent</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {language === 'pl'
                ? 'NowRent, lokalny wynajem aut bez kaucji w okolicach Lotniska Alicante i Costa Blanca. Pełne ubezpieczenie i obsługa po polsku.'
                : 'NowRent, local no-deposit car rental around Alicante Airport and Costa Blanca. Full insurance included and support in English.'}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setLanguage('pl')}
                className={`relative overflow-hidden rounded-lg flex items-center justify-center p-1 bg-[#0D1B33] ${
                  language === 'pl' ? 'ring-2 ring-[#FFD700]' : 'border border-white/20'
                }`}
              >
                <div className="relative w-8 h-6 overflow-hidden">
                  <Image
                    src="/images/flags/poli.webp"
                    alt="Polish"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm ml-1">PL</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`relative overflow-hidden rounded-lg flex items-center justify-center p-1 bg-[#0D1B33] ${
                  language === 'en' ? 'ring-2 ring-[#FFD700]' : 'border border-white/20'
                }`}
              >
                <div className="relative w-8 h-6 overflow-hidden">
                  <Image
                    src="/images/flags/eng.webp"
                    alt="English"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-white text-sm ml-1">EN</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              {language === 'pl' ? 'Szybkie linki' : 'Quick links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="transition-colors"
                >
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-[#FFD700] text-sm"
                  >
                    {link.title[language]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              {language === 'pl' ? 'Kontakt' : 'Contact'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={contactInfo.phoneHref}
                  className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm"
                >
                  <PhoneIcon className="w-4 h-4" />
                  <span>{contactInfo.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <MapPinIcon className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>{contactInfo.address[language]}</span>
                </div>
              </li>
              <li>
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-[#FFD700] text-sm"
                >
                  <ChatBubbleLeftIcon className="w-4 h-4" />
                  <span>{contactInfo.whatsapp}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white/90">
              {language === 'pl' ? 'Informacje prawne' : 'Legal information'}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="transition-colors"
                >
                  <Link
                    href={link.href.replace('[lang]', language)}
                    className="text-white/70 hover:text-[#FFD700] text-sm"
                  >
                    {link.title[language]}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/60 text-sm">
          <div className="space-y-2">
            <p>
              © {new Date().getFullYear()} NowRent. {language === 'pl' ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'}
            </p>
            <p className="text-white/40">
              Designed with <span className="text-red-500">❤</span> by Weston
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 