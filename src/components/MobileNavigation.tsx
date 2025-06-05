"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, ChatBubbleLeftIcon, Bars3Icon, XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '@/context/LanguageContext';

const navigation = [
  { name: { pl: 'Strona główna', en: 'Home' }, href: '#home' },
  { name: { pl: 'Samochody', en: 'Cars' }, href: '#cars' },
  { name: { pl: 'Jak to działa', en: 'How It Works' }, href: '#how-it-works' },
  { name: { pl: 'O nas', en: 'About' }, href: '#features' },
  { name: { pl: 'Kontakt', en: 'Contact' }, href: '#booking' },
];

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/1EGhm46q8X/', icon: 'fa-facebook' },
  { name: 'WhatsApp', href: 'https://wa.me/34694229035', icon: 'fa-whatsapp' },
  { name: 'Instagram', href: 'https://www.instagram.com/nowrente/', icon: 'fa-instagram' },
  { name: 'TikTok', href: 'https://tiktok.com/@nowrentes', icon: 'fa-tiktok' },
];

export default function MobileNavigation() {
  const { language, setLanguage } = useLanguage();
  const [showMenu, setShowMenu] = useState(false);
  const [menuType, setMenuType] = useState<'nav' | 'quick' | null>(null);

  return (
    <>
      {/* Floating Language Switcher */}
      <div className="fixed top-4 right-4 z-[100000] lg:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100"
        >
          <button
            onClick={() => setLanguage('pl')}
            className={`text-sm font-bold transition-all ${
              language === 'pl'
                ? 'text-[#FFD700]'
                : 'text-gray-600'
            }`}
          >
            PL
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLanguage('en')}
            className={`text-sm font-bold transition-all ${
              language === 'en'
                ? 'text-[#FFD700]'
                : 'text-gray-600'
            }`}
          >
            EN
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => { setShowMenu(true); setMenuType('nav'); }}
        className="fixed top-4 left-4 z-[100000] p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-100 lg:hidden"
        aria-label="Open menu"
      >
        <Bars3Icon className="w-6 h-6 text-primary" />
      </button>

      {/* Sticky Bar for Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-[100000] lg:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
        >
          {/* Book Now Button - Primary Action */}
          <motion.a
            href="#cars"
            className="flex-1 mx-2 px-4 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-primary font-bold rounded-full text-center shadow-lg hover:shadow-xl transition-all active:scale-95"
            whileTap={{ scale: 0.95 }}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {language === 'pl' ? 'Zarezerwuj' : 'Book Now'}
          </motion.a>

          {/* More Button for Secondary Actions */}
          <button
            className="ml-2 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:bg-blue-900 transition-all"
            onClick={() => { setShowMenu(true); setMenuType('quick'); }}
            aria-label="More actions"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <EllipsisHorizontalIcon className="w-7 h-7" />
          </button>
        </motion.div>
      </div>

      {/* Overlay Menu for Navigation or Quick Actions */}
      <AnimatePresence>
        {showMenu && menuType === 'nav' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100001] flex items-end justify-center bg-black/40 md:hidden"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-sm mx-auto bg-white rounded-t-2xl p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Logo background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10 z-0">
                <Image src="/images/logo.svg" alt="NowRent Logo" width={180} height={180} className="w-40 h-40" />
              </div>
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 z-10"
                onClick={() => setShowMenu(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
              {/* Navigation Links */}
              <nav className="flex flex-col gap-4 mt-6 z-10">
                {navigation.map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-lg font-bold text-primary px-4 py-3 rounded-xl hover:bg-primary/10 transition-all text-center"
                    onClick={() => setShowMenu(false)}
                  >
                    {item.name[language]}
                  </a>
                ))}
              </nav>
              {/* Social Links */}
              <div className="flex justify-center gap-4 mt-6 z-10">
                {socialLinks.map((item, idx) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl text-primary hover:text-[#FFD700] transition-colors"
                    aria-label={item.name}
                  >
                    <i className={`fab ${item.icon}`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
        {showMenu && menuType === 'quick' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100001] flex items-end justify-center bg-black/40 md:hidden"
            onClick={() => setShowMenu(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-sm mx-auto bg-white rounded-t-2xl p-6 flex flex-col gap-4 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-700"
                onClick={() => setShowMenu(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
              <a
                href="tel:+34694229035"
                className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white font-bold rounded-xl text-center shadow hover:bg-blue-900 transition-all justify-center"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <PhoneIcon className="w-5 h-5" />
                {language === 'pl' ? 'Zadzwoń' : 'Call'}
              </a>
              <a
                href="https://wa.me/34694229035"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center gap-3 px-4 py-3 bg-[#25D366] text-white font-bold rounded-xl text-center shadow hover:bg-[#128C7E] transition-all justify-center"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <i className="fab fa-whatsapp text-xl" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 