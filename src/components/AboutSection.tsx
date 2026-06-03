'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { 
  ShieldCheckIcon,
  ClockIcon,
  CurrencyEuroIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const values = [
  {
    icon: ShieldCheckIcon,
    title: { en: 'Safety First', pl: 'Bezpieczeństwo' },
    description: {
      en: 'All our vehicles undergo regular maintenance and safety checks',
      pl: 'Wszystkie nasze pojazdy przechodzą regularne przeglądy i kontrole bezpieczeństwa'
    }
  },
  {
    icon: ClockIcon,
    title: { en: '24/7 Support', pl: 'Wsparcie 24/7' },
    description: {
      en: 'Our team is available around the clock to assist you',
      pl: 'Nasz zespół jest dostępny przez całą dobę, aby Ci pomóc'
    }
  },
  {
    icon: CurrencyEuroIcon,
    title: { en: 'Clear pricing', pl: 'Jasne ceny' },
    description: {
      en: 'Competitive pricing with no hidden fees',
      pl: 'Konkurencyjne ceny bez ukrytych opłat'
    }
  },
  {
    icon: UserGroupIcon,
    title: { en: 'Personal Service', pl: 'Osobista Obsługa' },
    description: {
      en: 'Dedicated support throughout your rental experience',
      pl: 'Dedykowane wsparcie przez cały okres wynajmu'
    }
  }
];

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#1A2B49]">
                  {language === 'pl' 
                    ? 'Lokalny wynajem aut — Lotnisko Alicante i Costa Blanca'
                    : 'Your local car rental around Alicante Airport & Costa Blanca South'}
                </h2>
                <p className="text-lg text-gray-600">
                  {language === 'pl'
                    ? 'Od 2020 pomagamy wynajmować auta w okolicach Lotniska Alicante, Torrevieja i Costa Blanca. Jasne zasady, brak kaucji i bezpośredni kontakt po polsku sprawiają, że wynajem jest prostszy i spokojniejszy.'
                    : 'Since 2020, we’ve helped customers rent cars around Alicante Airport and Costa Blanca South with clear rules, no deposit and direct support.'}
                </p>
                <p className="text-lg text-gray-600">
                  {language === 'pl'
                    ? 'Większość naszych klientów trafia do nas z polecenia, Facebooka i polskiej społeczności. Odpowiadamy bezpośrednio na WhatsApp lub telefonicznie i wyjaśniamy proste zasady przed rezerwacją.'
                    : 'Most of our customers come from referrals, Facebook and the Polish community. We reply directly on WhatsApp or by phone and explain the simple rules before you book.'}
                </p>
              </motion.div>

              {/* Company Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-[#1A2B49]/5 p-3 rounded-xl">
                      <value.icon className="w-6 h-6 text-[#1A2B49]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1A2B49] mb-2">
                        {value.title[language]}
                      </h3>
                      <p className="text-gray-600">
                        {value.description[language]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about-image-2.webp"
                alt="NowRent fleet of cars"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#FFD700] rounded-full p-2">
                      <UserGroupIcon className="w-6 h-6 text-[#1A2B49]" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {language === 'pl' ? '1000+ zrealizowanych wynajmów' : '1000+ completed rentals'}
                      </h4>
                      <p className="text-white/80">
                        {language === 'pl' ? 'Dołącz do naszej rodziny zadowolonych klientów' : 'Join our family of satisfied customers'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 