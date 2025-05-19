"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'fa-facebook' },
  { name: 'WhatsApp', href: '#', icon: 'fa-whatsapp' },
  { name: 'Instagram', href: '#', icon: 'fa-instagram' },
  { name: 'TikTok', href: '#', icon: 'fa-tiktok' },
];

export default function MobileNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Logo at top */}
      <div className="lg:hidden flex justify-center py-4 bg-primary">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="NowRent Logo"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
        </Link>
      </div>

      {/* Sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-screen bg-primary/95 shadow-lg z-[1002] flex flex-row items-center px-4 py-3">
        {/* Phone button */}
        <a
          href="tel:+34694229035"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white shadow-lg flex-shrink-0"
        >
          <PhoneIcon className="h-6 w-6" />
        </a>

        <div className="flex-1" />

        {/* Hamburger button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col justify-center items-center gap-1.5 w-12 h-12 z-[10050] flex-shrink-0"
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-white rounded-full" />
          <span className="w-6 h-0.5 bg-white rounded-full" />
          <span className="w-6 h-0.5 bg-white rounded-full" />
        </button>
      </div>

      {/* Full screen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/90 z-[99999]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-cream z-[100000] p-6 overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 p-2"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation links */}
              <nav className="mt-8 flex flex-col gap-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-bold px-4 py-2 text-primary hover:bg-accent hover:text-white rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Language switcher */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <button className="px-4 py-2 font-bold text-accent">PL</button>
                <span className="text-primary-light">|</span>
                <button className="px-4 py-2 font-bold text-primary">EN</button>
              </div>

              {/* Social icons */}
              <div className="mt-8 flex justify-center gap-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-primary-light hover:text-accent transition-colors text-2xl"
                    aria-label={item.name}
                  >
                    <i className={`fab ${item.icon}`} />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 