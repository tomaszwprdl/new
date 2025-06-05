"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { PhoneIcon } from '@heroicons/react/24/solid';

const navigation = [
  { name: 'nav.home', href: '#home' },
  { name: 'nav.cars', href: '#cars' },
  { name: 'nav.howItWorks', href: '#how-it-works' },
  { name: 'nav.about', href: '#features' },
  { name: 'nav.contact', href: '#booking' },
];

const socialLinks = [
  { 
    name: 'WhatsApp', 
    href: 'https://wa.me/34694229035', 
    icon: 'whatsapp',
    ariaLabel: 'Contact us on WhatsApp',
    color: '#25D366'
  },
  { 
    name: 'Facebook', 
    href: 'https://www.facebook.com/share/1EGhm46q8X/', 
    icon: 'facebook',
    ariaLabel: 'Visit our Facebook page',
    color: '#1877F2'
  },
  { 
    name: 'Instagram', 
    href: 'https://www.instagram.com/nowrente/', 
    icon: 'instagram',
    ariaLabel: 'Follow us on Instagram',
    color: '#E4405F'
  },
  { 
    name: 'TikTok', 
    href: 'https://tiktok.com/@nowrentes', 
    icon: 'tiktok',
    ariaLabel: 'Follow us on TikTok',
    color: '#000000'
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="hidden lg:block">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed w-full z-[1001] transition-all duration-300 ${
          scrolled
            ? 'bg-primary shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          {/* Logo & Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex lg:flex-none min-w-[140px]"
          >
            <Link
              href="#home"
              className="-m-1.5 p-1.5 flex items-center gap-3 group"
              onClick={() => handleNavigation('#home')}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gold-gradient rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <Image
                  src="/images/logo.svg"
                  alt="NowRent Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  priority={true}
                  loading="eager"
                />
              </motion.div>
              <div className="flex items-baseline">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-xl font-bold ${
                    scrolled 
                      ? 'text-white' 
                      : 'text-gradient'
                  }`}
                >
                  Now
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-xl font-bold ml-1 ${
                    scrolled 
                      ? 'text-accent' 
                      : 'text-gradient'
                  }`}
                >
                  Rent
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-10 justify-center mx-4">
            {navigation.map((item, i) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: i * 0.1 }
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.href)}
                className={`relative text-base font-bold leading-6 transition-all duration-300 ${
                  scrolled 
                    ? 'text-white hover:text-accent' 
                    : 'text-[#0082BE] hover:text-accent'
                } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold-gradient hover:after:w-full after:transition-all after:duration-300`}
              >
                {t(item.name)}
              </motion.button>
            ))}
          </div>

          {/* Desktop Right Section: Language, Contact */}
          <div className="hidden lg:flex lg:flex-none lg:justify-end lg:gap-x-6 items-center space-x-4 min-w-[300px]">
            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-x-2 px-3 py-1.5 rounded-full ${
                scrolled 
                  ? 'bg-white/10 backdrop-blur-sm' 
                  : 'bg-white/80 backdrop-blur-md'
              }`}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage('pl')}
                className={`text-sm font-bold transition-all ${
                  language === 'pl' 
                    ? 'text-[#FFD700]' 
                    : scrolled 
                      ? 'text-white hover:text-[#FFD700]' 
                      : 'text-[#0082BE] hover:text-[#FFD700]'
                }`}
              >
                PL
              </motion.button>
              <span className={`text-xs ${scrolled ? 'text-white/50' : 'text-primary/50'}`}>|</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage('en')}
                className={`text-sm font-bold transition-all ${
                  language === 'en' 
                    ? 'text-[#FFD700]' 
                    : scrolled 
                      ? 'text-white hover:text-[#FFD700]' 
                      : 'text-[#0082BE] hover:text-[#FFD700]'
                }`}
              >
                EN
              </motion.button>
            </motion.div>

            {/* Contact Buttons */}
            <div className="flex items-center gap-x-4">
              <motion.a
                href="tel:+34694229035"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 ${
                  scrolled ? 'text-white' : 'text-primary'
                }`}
                aria-label="Call us"
              >
                <PhoneIcon className="w-5 h-5" />
              </motion.a>

              {/* Social Icons */}
              {socialLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className={`p-2 rounded-full transition-all duration-300 hover:bg-white/10 group ${
                    scrolled ? 'text-white' : 'text-primary'
                  }`}
                  aria-label={item.ariaLabel}
                  style={{
                    '--hover-color': item.color
                  } as React.CSSProperties}
                >
                  <i className={`fab fa-${item.icon} text-lg group-hover:text-[var(--hover-color)]`} />
                </motion.a>
              ))}
            </div>
          </div>
        </nav>
      </motion.header>
    </div>
  );
} 