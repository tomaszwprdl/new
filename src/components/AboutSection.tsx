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
    title: { en: 'Safety first', pl: 'Bezpieczeństwo' },
    description: {
      en: 'Cars are checked and inspected before handover.',
      pl: 'Auta przechodzą przeglądy i kontrolę przed wydaniem.'
    }
  },
  {
    icon: ClockIcon,
    title: { en: 'Support 24/7', pl: 'Wsparcie 24/7' },
    description: {
      en: 'Help during your rental when you need it.',
      pl: 'Pomoc podczas wynajmu, gdy jej potrzebujesz.'
    }
  },
  {
    icon: CurrencyEuroIcon,
    title: { en: 'Clear prices', pl: 'Jasne ceny' },
    description: {
      en: 'We confirm the final price before booking.',
      pl: 'Końcową cenę potwierdzamy przed rezerwacją.'
    }
  },
  {
    icon: UserGroupIcon,
    title: { en: 'Personal service', pl: 'Osobista obsługa' },
    description: {
      en: 'Direct contact throughout the rental period.',
      pl: 'Bezpośredni kontakt przez cały okres wynajmu.'
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
                    ? 'Lokalny wynajem aut bez kaucji w Alicante i na Costa Blanca'
                    : 'Local no-deposit car rental in Alicante and Costa Blanca'}
                </h2>
                <p className="text-lg text-gray-600">
                  {language === 'pl'
                    ? 'Od 2020 pomagamy klientom wynajmować auta w okolicach Lotniska Alicante, Torrevieja i Costa Blanca. Jasne zasady, brak kaucji i kontakt po polsku sprawiają, że wynajem jest prostszy i spokojniejszy.'
                    : 'Since 2020, we have helped customers rent cars around Alicante Airport, Torrevieja and Costa Blanca. Clear rules, no deposit and direct contact make the rental process simpler and calmer.'}
                </p>
                <p className="text-lg text-gray-600">
                  {language === 'pl'
                    ? 'Większość klientów trafia do nas z polecenia, Facebooka i polskiej społeczności w Hiszpanii. Odpowiadamy bezpośrednio na WhatsApp lub telefonicznie i wyjaśniamy warunki przed rezerwacją.'
                    : 'Most of our customers come from recommendations, Facebook and the local Polish community in Spain. We reply directly by WhatsApp or phone and explain the rental terms before booking.'}
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
                        {language === 'pl' ? 'Dziękujemy naszym klientom za zaufanie.' : 'Thank you to our customers for trusting us.'}
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