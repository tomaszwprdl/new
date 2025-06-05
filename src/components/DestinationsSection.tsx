'use client';

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  HeartIcon,
  ClockIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/solid';

const destinations = [
  {
    id: 1,
    name: { en: 'Alicante Old Town', pl: 'Stare Miasto Alicante' },
    image: '/images/places/Alicante.webp',
    description: {
      en: 'Historic center with charming streets and the iconic Santa Barbara Castle',
      pl: 'Historyczne centrum z urokliwymi uliczkami i ikonicznym zamkiem Santa Barbara'
    },
    distance: '10km',
    attractions: ['Santa Barbara Castle', 'Explanada', 'Central Market'],
    travelTime: '15 min',
    isTopPick: true,
    bookings: 1240,
    rating: 4.8,
    mapsUrl: 'https://maps.google.com/?q=Alicante+Old+Town,Spain'
  },
  {
    id: 2,
    name: { en: 'Torrevieja', pl: 'Torrevieja' },
    image: '/images/places/torrevieja.webp',
    description: {
      en: 'Charming coastal city famous for its pink salt lakes and beautiful beaches',
      pl: 'Urokliwe nadmorskie miasto słynące z różowych jezior solnych i pięknych plaż'
    },
    distance: '50km',
    attractions: ['Pink Salt Lake', 'La Mata Beach', 'Marina', 'Seafront Promenade'],
    travelTime: '35 min',
    isTopPick: true,
    bookings: 980,
    rating: 4.7,
    mapsUrl: 'https://maps.google.com/?q=Torrevieja,Spain'
  },
  {
    id: 3,
    name: { en: 'Elche', pl: 'Elche' },
    image: '/images/places/Elche.webp',
    description: {
      en: 'UNESCO World Heritage site with the largest palm grove in Europe',
      pl: 'Obiekt UNESCO z największym gajem palmowym w Europie'
    },
    distance: '25km',
    attractions: ['Palm Grove', 'Basilica of Santa Maria', 'Altamira Palace'],
    travelTime: '25 min',
    isTopPick: true,
    bookings: 850,
    rating: 4.7,
    mapsUrl: 'https://maps.google.com/?q=Elche,Spain'
  },
  {
    id: 4,
    name: { en: 'Murcia', pl: 'Murcja' },
    image: '/images/places/Castillo de Monteagudo murcia.webp',
    description: {
      en: 'Baroque city with stunning cathedral and vibrant food scene',
      pl: 'Barokowe miasto ze wspaniałą katedrą i bogatą sceną kulinarną'
    },
    distance: '80km',
    attractions: ['Cathedral of Murcia', 'Casino', 'Terra Natura'],
    travelTime: '50 min',
    isTopPick: true,
    bookings: 920,
    rating: 4.6,
    mapsUrl: 'https://maps.google.com/?q=Murcia,Spain'
  },
  {
    id: 5,
    name: { en: 'Cartagena', pl: 'Kartagena' },
    image: '/images/places/cartagena.webp',
    description: {
      en: 'Historic port city with Roman ruins and maritime heritage',
      pl: 'Historyczne miasto portowe z ruinami rzymskimi i morskim dziedzictwem'
    },
    distance: '120km',
    attractions: ['Roman Theater', 'Naval Museum', 'Fortress'],
    travelTime: '1h 10min',
    bookings: 780,
    rating: 4.6,
    mapsUrl: 'https://maps.google.com/?q=Cartagena,Spain'
  },
  {
    id: 6,
    name: { en: 'Isla de Tabarca', pl: 'Wyspa Tabarca' },
    image: '/images/places/isla de Tabarca.webp',
    description: {
      en: 'Beautiful island with crystal clear waters, perfect for snorkeling',
      pl: 'Piękna wyspa z krystalicznie czystą wodą, idealna do snorkelingu'
    },
    distance: '25km',
    attractions: ['Marine Reserve', 'Historic Fortifications', 'Beaches'],
    travelTime: '30 min',
    bookings: 650,
    rating: 4.8,
    mapsUrl: 'https://maps.google.com/?q=Isla+de+Tabarca,Spain'
  },
  {
    id: 7,
    name: { en: 'Guadalest', pl: 'Guadalest' },
    image: '/images/places/guadalest.webp',
    description: {
      en: 'Mountain village with stunning castle and reservoir views',
      pl: 'Górska miejscowość z zapierającym dech w piersiach zamkiem i widokami na zbiornik wodny'
    },
    distance: '140km',
    attractions: ['Castle Museum', 'Reservoir', 'San José Church'],
    travelTime: '1h 30min',
    bookings: 580,
    rating: 4.7,
    mapsUrl: 'https://maps.google.com/?q=Guadalest,Spain'
  },
  {
    id: 8,
    name: { en: 'Benidorm', pl: 'Benidorm' },
    image: '/images/places/benidorm.webp',
    description: {
      en: 'Vibrant coastal city with stunning beaches and entertainment',
      pl: 'Tętniące życiem nadmorskie miasto ze wspaniałymi plażami i rozrywką'
    },
    distance: '130km',
    attractions: ['Levante Beach', 'Terra Mítica', 'Old Town'],
    travelTime: '1h 20min',
    bookings: 890,
    rating: 4.6,
    mapsUrl: 'https://maps.google.com/?q=Benidorm,Spain'
  },
  {
    id: 9,
    name: { en: 'Mar Menor', pl: 'Mar Menor' },
    image: '/images/places/Mar Menor.webp',
    description: {
      en: 'Europe\'s largest saltwater lagoon with healing mud baths',
      pl: 'Największa w Europie laguna słonowodna ze zdrowotnymi kąpielami błotnymi'
    },
    distance: '90km',
    attractions: ['Mud Baths', 'Water Sports', 'Fishing Villages'],
    travelTime: '55 min',
    bookings: 720,
    rating: 4.7,
    mapsUrl: 'https://maps.google.com/?q=Mar+Menor,Spain'
  },
  {
    id: 10,
    name: { en: 'Valencia', pl: 'Walencja' },
    image: '/images/places/valencia.webp',
    description: {
      en: 'Modern city famous for its City of Arts and Sciences, historic center, and birthplace of paella',
      pl: 'Nowoczesne miasto słynące z Miasta Sztuki i Nauki, historycznego centrum i miejsca narodzin paelli'
    },
    distance: '170km',
    attractions: ['City of Arts and Sciences', 'Central Market', 'Valencia Cathedral', 'Turia Gardens'],
    travelTime: '1h 45min',
    isTopPick: true,
    bookings: 1100,
    rating: 4.9,
    mapsUrl: 'https://maps.google.com/?q=Valencia,Spain'
  }
];

export default function DestinationsSection() {
  const { language } = useLanguage();
  const [currentDestination, setCurrentDestination] = useState(0);
  const [loadedDestinations, setLoadedDestinations] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  // Destinations slider - NO auto-advance, initialized once
  const [destinationSliderRef, destinationSliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 0 },
    initial: 0,
    drag: true,
    rubberband: true,
    defaultAnimation: {
      duration: 500
    },
    created(slider) {
      setLoadedDestinations(true);
    },
    slideChanged(slider) {
      // Only update React state if it's different from the slider's position
      const newIndex = slider.track.details.rel;
      if (currentDestination !== newIndex) {
        setCurrentDestination(newIndex);
      }
    }
  });

  // Navigation functions for destinations - simplified to only use slider
  const nextDestination = () => {
    if (destinationSliderInstance.current) {
      destinationSliderInstance.current.next();
    }
  };

  const prevDestination = () => {
    if (destinationSliderInstance.current) {
      destinationSliderInstance.current.prev();
    }
  };

  return (
    <section id="destinations" className="relative py-24 bg-gradient-to-b from-[#0D1B33] to-[#1A2B49] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 opacity-30`}
          style={{
            backgroundImage: `url(${destinations[currentDestination].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.1)',
            filter: 'blur(12px)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B33]/70 to-[#1A2B49]/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <MapPinIcon className="w-6 h-6 text-[#FFD700]" />
            <span className="text-white/60 uppercase tracking-wider text-sm font-medium">
              {language === 'pl' ? 'Popularne Destynacje' : 'Popular Destinations'}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#FFD700]">
            {language === 'pl' ? 'Dokąd chcesz jechać?' : 'Where Do You Want to Go?'}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {language === 'pl'
              ? 'Odkryj najpiękniejsze miejsca w okolicy Alicante'
              : 'Discover the most beautiful places around Alicante'}
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Destinations Slider */}
          <div ref={destinationSliderRef} className="keen-slider">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                className="keen-slider__slide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-[#1A2B49]/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    {/* Destination Image */}
                    <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg order-1">
                      {/* Navigation Buttons inside image */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          prevDestination();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all transform hover:scale-110"
                        aria-label={language === 'pl' ? 'Poprzednia destynacja' : 'Previous destination'}
                      >
                        <ChevronLeftIcon className="w-6 h-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          nextDestination();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all transform hover:scale-110"
                        aria-label={language === 'pl' ? 'Następna destynacja' : 'Next destination'}
                      >
                        <ChevronRightIcon className="w-6 h-6" />
                      </button>
                      <Image
                        src={destination.image}
                        alt={destination.name[language]}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>

                    {/* Destination Info */}
                    <div className="flex flex-col justify-between order-2">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-3xl font-bold text-white">
                            {destination.name[language]}
                          </h3>
                        </div>

                        <p className="text-xl text-white/90 mb-6">
                          {destination.description[language]}
                        </p>

                        <div className="space-y-6">
                          <div className="flex items-center gap-6 text-white/80 text-lg">
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="w-6 h-6" />
                              <span>{destination.distance} {language === 'pl' ? 'od Alicante' : 'from Alicante'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ClockIcon className="w-6 h-6" />
                              <span>{destination.travelTime}</span>
                            </div>
                            {destination.bookings && (
                              <div className="flex items-center gap-2">
                                <HeartIcon className="w-6 h-6 text-red-500" />
                                <span>{destination.bookings}+ {language === 'pl' ? 'wyjazdów' : 'trips'}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {destination.attractions.map((attraction, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/90 backdrop-blur-sm"
                              >
                                {attraction}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-8">
                        <motion.a
                          href={destination.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-white/30 transition-all"
                        >
                          <span>{language === 'pl' ? 'Zobacz na mapie' : 'View on map'}</span>
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          {loadedDestinations && destinationSliderInstance.current && (
            <div className="flex justify-center gap-3 mt-12">
              {[...Array(destinations.length)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (destinationSliderInstance.current) {
                      destinationSliderInstance.current.moveToIdx(idx);
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentDestination === idx
                      ? 'w-12 bg-[#FFD700]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to destination ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 