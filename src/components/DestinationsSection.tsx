'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPinIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

interface Destination {
  id: string;
  name: { en: string; pl: string };
  image: string;
  description: { en: string; pl: string };
  distanceKm: number;
  travelTime: string;
  tags: { en: string[]; pl: string[] };
  mapsUrl: string;
  routeNote?: { en: string; pl: string };
}

const destinations: Record<string, Destination> = {
  alicante: {
    id: 'alicante',
    name: { en: 'Alicante Old Town', pl: 'Stare Miasto Alicante' },
    image: '/images/places/Alicante.webp',
    description: {
      en: 'A walk, Santa Barbara Castle and old-town atmosphere — a good choice even for a short trip.',
      pl: 'Spacer, zamek Santa Barbara i klimat starego miasta — dobry wybór nawet na krótki wypad.',
    },
    distanceKm: 10,
    travelTime: '15 min',
    tags: { en: ['castle', 'old town', 'views'], pl: ['zamek', 'stare miasto', 'widoki'] },
    mapsUrl: 'https://maps.google.com/?q=Alicante+Old+Town,Spain',
  },
  elche: {
    id: 'elche',
    name: { en: 'Elche', pl: 'Elche' },
    image: '/images/places/Elche.webp',
    description: {
      en: 'Palm trees, old town and a walk through a UNESCO-listed place.',
      pl: 'Palmy, stare miasto i spacer w miejscu wpisanym na listę UNESCO.',
    },
    distanceKm: 25,
    travelTime: '25 min',
    tags: { en: ['palms', 'UNESCO', 'walk'], pl: ['palmy', 'UNESCO', 'spacer'] },
    mapsUrl: 'https://maps.google.com/?q=Elche,Spain',
  },
  torrevieja: {
    id: 'torrevieja',
    name: { en: 'Torrevieja', pl: 'Torrevieja' },
    image: '/images/places/torrevieja.webp',
    description: {
      en: 'Pink lake, promenade and beaches — ideal for an easy day by the sea.',
      pl: 'Różowe jezioro, promenada i plaże — idealne na spokojny dzień blisko morza.',
    },
    distanceKm: 50,
    travelTime: '35 min',
    tags: { en: ['pink lake', 'beaches', 'promenade'], pl: ['różowe jezioro', 'plaże', 'promenada'] },
    mapsUrl: 'https://maps.google.com/?q=Torrevieja,Spain',
  },
  tabarca: {
    id: 'tabarca',
    name: { en: 'Tabarca Island', pl: 'Wyspa Tabarca' },
    image: '/images/places/isla de Tabarca.webp',
    description: {
      en: 'Drive to the port, then take a short boat trip to an island with crystal-clear water.',
      pl: 'Dojazd autem do portu, a potem krótki rejs na wyspę z krystalicznie czystą wodą.',
    },
    distanceKm: 25,
    travelTime: '30 min',
    tags: { en: ['island', 'boat trip', 'snorkeling'], pl: ['wyspa', 'rejs', 'snorkeling'] },
    mapsUrl: 'https://maps.google.com/?q=Isla+de+Tabarca,Spain',
    routeNote: { en: 'Drive to port + ferry', pl: 'Dojazd do portu + rejs' },
  },
  murcia: {
    id: 'murcia',
    name: { en: 'Murcia', pl: 'Murcja' },
    image: '/images/places/Castillo de Monteagudo murcia.webp',
    description: {
      en: 'Cathedral, tapas and a relaxed city atmosphere — a good day away from the coast.',
      pl: 'Katedra, tapas i spokojny miejski klimat — dobry plan na dzień poza wybrzeżem.',
    },
    distanceKm: 80,
    travelTime: '50 min',
    tags: { en: ['cathedral', 'tapas', 'old town'], pl: ['katedra', 'tapas', 'stare miasto'] },
    mapsUrl: 'https://maps.google.com/?q=Murcia,Spain',
  },
  cartagena: {
    id: 'cartagena',
    name: { en: 'Cartagena', pl: 'Kartagena' },
    image: '/images/places/cartagena.webp',
    description: {
      en: 'Harbour, Roman ruins and sea views — a strong choice for a full-day trip.',
      pl: 'Port, rzymskie ruiny i morski klimat — świetny kierunek na całodniowy wypad.',
    },
    distanceKm: 120,
    travelTime: '1h 10 min',
    tags: { en: ['harbour', 'history', 'Roman theatre'], pl: ['port', 'historia', 'teatr rzymski'] },
    mapsUrl: 'https://maps.google.com/?q=Cartagena,Spain',
  },
  marmenor: {
    id: 'marmenor',
    name: { en: 'Mar Menor', pl: 'Mar Menor' },
    image: '/images/places/Mar Menor.webp',
    description: {
      en: 'Lagoon, sunsets and calmer beaches on the Murcia side.',
      pl: 'Laguna, zachody słońca i spokojniejsze plaże po stronie Murcji.',
    },
    distanceKm: 90,
    travelTime: '55 min',
    tags: { en: ['lagoon', 'beaches', 'sunset'], pl: ['laguna', 'plaże', 'zachód słońca'] },
    mapsUrl: 'https://maps.google.com/?q=Mar+Menor,Spain',
  },
  benidorm: {
    id: 'benidorm',
    name: { en: 'Benidorm', pl: 'Benidorm' },
    image: '/images/places/benidorm.webp',
    description: {
      en: 'Beaches, viewpoints and the evening energy of a larger coastal city.',
      pl: 'Plaże, punkty widokowe i wieczorny klimat dużego nadmorskiego miasta.',
    },
    distanceKm: 130,
    travelTime: '1h 20 min',
    tags: { en: ['beaches', 'skyline', 'city'], pl: ['plaże', 'panorama', 'miasto'] },
    mapsUrl: 'https://maps.google.com/?q=Benidorm,Spain',
  },
  guadalest: {
    id: 'guadalest',
    name: { en: 'Guadalest', pl: 'Guadalest' },
    image: '/images/places/guadalest.webp',
    description: {
      en: 'Mountains, castle and some of the best views in the area.',
      pl: 'Góry, zamek i jedne z najładniejszych widoków w okolicy.',
    },
    distanceKm: 140,
    travelTime: '1h 30 min',
    tags: { en: ['mountains', 'castle', 'views'], pl: ['góry', 'zamek', 'widoki'] },
    mapsUrl: 'https://maps.google.com/?q=Guadalest,Spain',
  },
  altea: {
    id: 'altea',
    name: { en: 'Altea', pl: 'Altea' },
    image: '/images/places/altea.webp',
    description: {
      en: 'White streets, sea views and a calm old-town atmosphere — a beautiful drive beyond the apartment area.',
      pl: 'Białe uliczki, widok na morze i spokojny klimat starego miasta — idealna trasa na piękny dzień poza apartamentem.',
    },
    distanceKm: 55,
    travelTime: '50 min',
    tags: { en: ['old town', 'views', 'sea'], pl: ['stare miasto', 'widoki', 'morze'] },
    mapsUrl: 'https://maps.google.com/?q=Altea,Alicante,Spain',
  },
  valencia: {
    id: 'valencia',
    name: { en: 'Valencia', pl: 'Walencja' },
    image: '/images/places/valencia.webp',
    description: {
      en: 'A bigger trip: Oceanogràfic, old town and the City of Arts and Sciences.',
      pl: 'Większa wyprawa: oceanarium, stare miasto i Miasto Sztuki i Nauki.',
    },
    distanceKm: 170,
    travelTime: '1h 45 min',
    tags: { en: ['Oceanogràfic', 'old town', 'architecture'], pl: ['oceanarium', 'stare miasto', 'architektura'] },
    mapsUrl: 'https://maps.google.com/?q=Valencia,Spain',
  },
};

const groups = [
  {
    id: 'easy',
    title: { en: 'Close and easy', pl: 'Blisko i łatwo' },
    subtitle: {
      en: 'Short trips when you want to go beyond the nearest beach.',
      pl: 'Krótkie wypady, kiedy chcesz ruszyć się dalej niż najbliższa plaża.',
    },
    meta: { en: '4 destinations · 15–35 min', pl: '4 kierunki · 15–35 min' },
    ids: ['alicante', 'elche', 'torrevieja', 'tabarca'],
  },
  {
    id: 'halfday',
    title: { en: 'Half-day or full-day trips', pl: 'Na pół dnia albo cały dzień' },
    subtitle: {
      en: 'Cities, ports and places best explored without rushing.',
      pl: 'Miasta, porty i miejsca, które najlepiej zwiedzać bez pośpiechu.',
    },
    meta: { en: '4 destinations · 50 min–1h20', pl: '4 kierunki · 50 min–1h20' },
    ids: ['murcia', 'cartagena', 'marmenor', 'benidorm'],
  },
  {
    id: 'adventure',
    title: { en: 'Bigger adventure', pl: 'Większa przygoda' },
    subtitle: {
      en: 'Longer drives for people who really want to see more.',
      pl: 'Dłuższe trasy dla tych, którzy naprawdę chcą zobaczyć coś więcej.',
    },
    meta: { en: '3 destinations · 50 min–1h45', pl: '3 kierunki · 50 min–1h45' },
    ids: ['guadalest', 'altea', 'valencia'],
  },
];

function DestinationCard({ destination, language, priority }: { destination: Destination; language: 'en' | 'pl'; priority?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col bg-[#1A2B49]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#FFD700]/40 transition-all duration-300 shadow-lg hover:-translate-y-1"
    >
      <div className="relative h-36 sm:h-40 overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name[language]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          loading={priority ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B33]/85 via-[#0D1B33]/10 to-transparent" />
        <h4 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white drop-shadow">
          {destination.name[language]}
        </h4>
      </div>

      <div className="flex flex-col flex-grow p-4 md:p-5">
        <p className="text-sm text-white/75 leading-relaxed mb-3 flex-grow">
          {destination.description[language]}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/70 text-xs mb-3">
          {destination.routeNote ? (
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4 text-[#FFD700]" />
              {destination.routeNote[language]}
            </span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4 text-[#FFD700]" />
                {destination.distanceKm} km {language === 'pl' ? 'z Alicante' : 'from Alicante'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4 text-[#FFD700]" />
                {destination.travelTime}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {destination.tags[language].slice(0, 3).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/80">
              {tag}
            </span>
          ))}
        </div>

        <a
          href={destination.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all"
        >
          <span>{language === 'pl' ? 'Zobacz na mapie' : 'View on map'}</span>
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </a>
      </div>
    </motion.article>
  );
}

export default function DestinationsSection() {
  const { language } = useLanguage();

  // Mobile-only accordion state: first group open by default.
  const [openGroups, setOpenGroups] = useState<string[]>([groups[0].id]);
  const toggleGroup = (id: string) =>
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

  const scrollToBooking = () => {
    const booking = document.getElementById('booking');
    if (booking) booking.scrollIntoView({ behavior: 'smooth' });
  };

  let cardCounter = 0;

  return (
    <section
      id="destinations"
      className="relative pt-16 md:pt-24 pb-28 md:pb-24 bg-gradient-to-b from-[#0D1B33] to-[#1A2B49] overflow-hidden"
    >
      {/* Subtle background pattern (keeps the dark navy mood) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'url("/images/pattern.svg")', backgroundSize: '40px' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <MapPinIcon className="w-5 h-5 text-[#FFD700]" />
            <span className="text-[#FFD700]/90 uppercase tracking-[0.2em] text-xs md:text-sm font-semibold">
              {language === 'pl' ? 'ODKRYJ COSTA BLANCA' : 'EXPLORE COSTA BLANCA'}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            {language === 'pl' ? 'Zobacz więcej niż okolice apartamentu' : 'See more than your apartment area'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-white/80 leading-relaxed"
          >
            {language === 'pl'
              ? 'Hiszpania wokół Alicante to nie tylko plaża — z autem masz swobodę na spontaniczne wypady, całodzienne wycieczki i miejsca poza utartym szlakiem.'
              : 'Alicante and Costa Blanca are more than the beach. With a car, you get the freedom for spontaneous stops, day trips and places that are hard to reach comfortably without your own transport.'}
          </motion.p>

          {/* Value strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <SparklesIcon className="w-4 h-4 text-[#FFD700] flex-shrink-0" />
            <span className="text-xs md:text-sm text-white/75">
              {language === 'pl'
                ? '1 auto · 11 kierunków · od 15 min do 1h 45 min · plaże · miasta · góry · wyspy'
                : '1 car · 11 destinations · from 15 min to 1h 45 min · beaches · cities · mountains · islands'}
            </span>
          </motion.div>
        </div>

        {/* Mobile: collapsible accordion groups (below md) */}
        <div className="md:hidden space-y-4">
          {groups.map((group, groupIndex) => {
            const isOpen = openGroups.includes(group.id);
            return (
              <div
                key={group.id}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={`group-panel-${group.id}`}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="min-w-0">
                    <span className="block text-lg font-bold text-white">
                      {group.title[language]}
                    </span>
                    <span className="mt-1 block text-xs text-white/60">
                      {group.meta[language]}
                    </span>
                  </span>
                  <ChevronDownIcon
                    className={`w-5 h-5 flex-shrink-0 text-[#FFD700] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`group-panel-${group.id}`}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5 pt-1 space-y-4">
                        {group.ids.map((id, cardIndex) => (
                          <DestinationCard
                            key={id}
                            destination={destinations[id]}
                            language={language}
                            priority={groupIndex === 0 && cardIndex === 0}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop: grouped inspiration board (md+) — unchanged */}
        <div className="hidden md:block space-y-12 md:space-y-16">
          {groups.map((group) => {
            const count = group.ids.length;
            let gridClass = 'xl:grid-cols-4';
            if (count <= 2) {
              gridClass = 'xl:grid-cols-2 xl:max-w-4xl';
            } else if (count === 3) {
              gridClass = 'xl:grid-cols-3 xl:max-w-6xl';
            }
            return (
              <div key={group.id}>
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {group.title[language]}
                  </h3>
                  <p className="text-sm md:text-base text-white/65 mt-1 max-w-2xl">
                    {group.subtitle[language]}
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 ${gridClass}`}
                >
                  {group.ids.map((id) => {
                    const isFirst = cardCounter === 0;
                    cardCounter += 1;
                    return (
                      <DestinationCard
                        key={id}
                        destination={destinations[id]}
                        language={language}
                        priority={isFirst}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 md:mt-20 text-center">
          <p className="text-lg md:text-xl text-white/85 mb-5">
            {language === 'pl'
              ? 'Masz plan na wycieczkę? Sprawdź auto na swoje daty'
              : 'Planning a day trip? Check a car for your dates'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToBooking}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-[#1A2B49] font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            {language === 'pl' ? 'Sprawdź dostępność' : 'Check availability'}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
