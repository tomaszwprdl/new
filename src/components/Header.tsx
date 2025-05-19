"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const navigation = [
  { name: 'nav.home', href: '#home' },
  { name: 'nav.about', href: '#about' },
  { name: 'nav.howItWorks', href: '#how-it-works' },
  { name: 'nav.testimonials', href: '#testimonials' },
  { name: 'nav.contact', href: '#contact' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'WhatsApp', href: '#', icon: 'whatsapp' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'TikTok', href: '#', icon: 'tiktok' },
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

  // Only render header on lg and up
  return (
    <div className="hidden lg:block">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={`fixed w-full z-[1001] transition-all duration-300 ${
          scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          {/* Logo & Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex lg:flex-1"
          >
            <Link
              href="#home"
              className="-m-1.5 p-1.5 flex items-center gap-2"
              onClick={() => handleNavigation('#home')}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo.svg"
                  alt="NowRent Logo"
                  width={60}
                  height={60}
                  className="h-16 w-auto rounded-full"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`text-2xl font-bold drop-shadow-lg ${scrolled ? 'text-white' : 'text-primary'}`}
              >
                Now
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl font-bold drop-shadow-lg ${scrolled ? 'text-white' : 'text-primary-light'}`}
              >
                Rent
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item, i) => (
              <motion.button
                key={item.name}
                custom={i}
                variants={navItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(item.href)}
                className={`text-[17px] font-bold leading-6 transition-colors focus:text-accent ${
                  scrolled 
                    ? 'text-white hover:text-accent' 
                    : 'text-primary hover:text-accent drop-shadow-lg'
                }`}
              >
                {t(item.name)}
              </motion.button>
            ))}
          </div>

          {/* Desktop Language Switcher & Socials */}
          <div className="hidden lg:flex lg:flex-1 lg:gap-x-6">
            <div className="flex items-center gap-x-6 ml-auto">
              {/* Language Switcher */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('pl')}
                  className={`text-sm font-semibold leading-6 transition-colors ${
                    language === 'pl' 
                      ? 'text-accent' 
                      : scrolled 
                        ? 'text-white hover:text-accent' 
                        : 'text-primary hover:text-accent drop-shadow-lg'
                  }`}
                >
                  PL
                </motion.button>
                <span className={scrolled ? 'text-white' : 'text-primary drop-shadow-lg'}>|</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLanguage('en')}
                  className={`text-sm font-semibold leading-6 transition-colors ${
                    language === 'en' 
                      ? 'text-accent' 
                      : scrolled 
                        ? 'text-white hover:text-accent' 
                        : 'text-primary hover:text-accent drop-shadow-lg'
                  }`}
                >
                  EN
                </motion.button>
              </motion.div>
              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-x-4"
              >
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`transition-colors ${
                      scrolled 
                        ? 'text-white hover:text-accent' 
                        : 'text-primary hover:text-accent drop-shadow-lg'
                    }`}
                    aria-label={item.name}
                  >
                    <i className={`fab fa-${item.icon} text-lg`} />
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </nav>
      </motion.header>
    </div>
  );
} 