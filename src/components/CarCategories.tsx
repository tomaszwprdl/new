'use client';

import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, CurrencyEuroIcon, UserGroupIcon, SparklesIcon, XMarkIcon, MapIcon } from '@heroicons/react/24/outline';

// Add exchange rate constant
const PLN_RATE = 4.32; // Example rate EUR to PLN

const carTypes = [
  {
    bookingValue: 'van',
    type: { en: '7-seat / Van class', pl: 'Klasa 7-osobowa / van' },
    alt: { en: 'Seven-seat van rental class for Alicante Airport pickup', pl: 'Klasa 7-osobowa / van do wynajmu na Lotnisku Alicante' },
    image: '/images/cars/van.avif',
    price: 55,
    seats: { en: '7 seats', pl: '7 miejsc' },
    bestFor: { en: 'Ideal for groups', pl: 'Idealne dla grup' },
    details: { en: 'Van, 7 seats', pl: 'Van, 7 miejsc' },
    badge: { type: 'group', text: { en: 'Ideal for groups', pl: 'Idealne dla grup' } },
    features: [
      { icon: UserGroupIcon, text: { en: '7 seats', pl: '7 miejsc' } },
      { icon: ShieldCheckIcon, text: { en: 'Full insurance included', pl: 'Pełne ubezpieczenie w cenie' } },
      { icon: MapIcon, text: { en: 'Unlimited mileage in Spain', pl: 'Bez limitu km w Hiszpanii' } },
      { icon: CurrencyEuroIcon, text: { en: 'No deposit', pl: 'Bez kaucji' } }
    ]
  },
  {
    bookingValue: 'suv',
    type: { en: 'SUV class', pl: 'Klasa SUV' },
    alt: { en: 'SUV car rental class in Torrevieja and Orihuela Costa', pl: 'Klasa SUV do wynajmu w Alicante i Torrevieja' },
    image: '/images/cars/suv.avif',
    price: 45,
    seats: { en: '5 seats', pl: '5 miejsc' },
    bestFor: { en: 'Good for families', pl: 'Dobre dla rodziny' },
    details: { en: 'SUV, 5 seats', pl: 'SUV, 5 miejsc' },
    badge: { type: 'family', text: { en: 'Good for families', pl: 'Dobre dla rodziny' } },
    features: [
      { icon: UserGroupIcon, text: { en: '5 seats', pl: '5 miejsc' } },
      { icon: ShieldCheckIcon, text: { en: 'Full insurance included', pl: 'Pełne ubezpieczenie w cenie' } },
      { icon: MapIcon, text: { en: 'Unlimited mileage in Spain', pl: 'Bez limitu km w Hiszpanii' } },
      { icon: CurrencyEuroIcon, text: { en: 'No deposit', pl: 'Bez kaucji' } }
    ]
  },
  {
    bookingValue: 'luxury',
    type: { en: 'Comfort class', pl: 'Klasa komfortowa' },
    alt: { en: 'Comfort class car rental in Costa Blanca South', pl: 'Klasa komfortowa auta do wynajmu w Costa Blanca' },
    image: '/images/cars/luksusowy.avif',
    price: 75,
    seats: { en: '5 seats', pl: '5 miejsc' },
    bestFor: { en: 'Higher comfort when available', pl: 'Wyższy komfort, gdy dostępna' },
    details: { en: 'Comfort, 5 seats', pl: 'Komfort, 5 miejsc' },
    badge: { type: 'luxury', text: { en: 'Higher comfort', pl: 'Wyższy komfort' } },
    features: [
      { icon: UserGroupIcon, text: { en: '5 seats', pl: '5 miejsc' } },
      { icon: SparklesIcon, text: { en: 'Higher comfort', pl: 'Wyższy komfort' } },
      { icon: ShieldCheckIcon, text: { en: 'Full insurance included', pl: 'Pełne ubezpieczenie w cenie' } },
      { icon: MapIcon, text: { en: 'Unlimited mileage in Spain', pl: 'Bez limitu km w Hiszpanii' } },
      { icon: CurrencyEuroIcon, text: { en: 'No deposit', pl: 'Bez kaucji' } }
    ]
  },
  {
    bookingValue: 'compact',
    type: { en: 'Compact class', pl: 'Klasa kompaktowa' },
    alt: { en: 'Compact car rental class around Alicante Airport and Costa Blanca South', pl: 'Klasa kompaktowa auta do wynajmu w Costa Blanca' },
    image: '/images/cars/kompaktowy.avif',
    price: 35,
    seats: { en: '5 seats', pl: '5 miejsc' },
    bestFor: { en: 'Good balance', pl: 'Dobry kompromis' },
    details: { en: 'Compact, 5 seats', pl: 'Kompaktowy, 5 miejsc' },
    badge: { type: 'economy', text: { en: 'Good balance', pl: 'Dobry kompromis' } },
    features: [
      { icon: UserGroupIcon, text: { en: '5 seats', pl: '5 miejsc' } },
      { icon: ShieldCheckIcon, text: { en: 'Full insurance included', pl: 'Pełne ubezpieczenie w cenie' } },
      { icon: MapIcon, text: { en: 'Unlimited mileage in Spain', pl: 'Bez limitu km w Hiszpanii' } },
      { icon: CurrencyEuroIcon, text: { en: 'No deposit', pl: 'Bez kaucji' } }
    ]
  },
  {
    bookingValue: 'economic',
    type: { en: 'Economy class', pl: 'Klasa ekonomiczna' },
    alt: { en: 'Economy class car rental around Alicante Airport and Costa Blanca South', pl: 'Klasa ekonomiczna auta do wynajmu w Alicante' },
    image: '/images/cars/eco.avif',
    price: 29,
    seats: { en: '4 seats', pl: '4 miejsca' },
    bestFor: { en: 'Budget-friendly choice', pl: 'Ekonomiczny wybór' },
    details: { en: 'Economy, 4 seats', pl: 'Ekonomiczny, 4 miejsca' },
    badge: { type: 'economy', text: { en: 'Budget-friendly', pl: 'Ekonomiczny wybór' } },
    features: [
      { icon: UserGroupIcon, text: { en: '4 seats', pl: '4 miejsca' } },
      { icon: ShieldCheckIcon, text: { en: 'Full insurance included', pl: 'Pełne ubezpieczenie w cenie' } },
      { icon: MapIcon, text: { en: 'Unlimited mileage in Spain', pl: 'Bez limitu km w Hiszpanii' } },
      { icon: CurrencyEuroIcon, text: { en: 'No deposit', pl: 'Bez kaucji' } }
    ]
  }
];

export default function CarCategories() {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'PLN'>('EUR');
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 1.2,
      spacing: 16,
      origin: 'center',
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2.2, spacing: 24, origin: 'center' },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3.2, spacing: 32, origin: 'center' },
      },
      '(min-width: 1536px)': {
        slides: { perView: 4.2, spacing: 40, origin: 'center' },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  // Function to format price based on currency
  const formatPrice = (priceInEur: number) => {
    if (currency === 'PLN') {
      return `${Math.round(priceInEur * PLN_RATE)} zł`;
    }
    return `${priceInEur}€`;
  };

  // Preselect the matching car class in the request form and scroll to it
  const goToBooking = (bookingValue: string) => {
    const url = new URL(window.location.href);
    url.hash = `booking?carType=${bookingValue || ''}`;
    history.pushState({}, '', url.toString());

    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mobile list is ordered by ascending price for easier scanning
  const mobileCarTypes = [...carTypes].sort((a, b) => a.price - b.price);

  return (
    <>
      <section
        id="cars"
        className="relative py-24 pb-28 md:pb-24 bg-gradient-to-b from-[#1A2B49] to-[#0D1B33] overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("/images/pattern.svg")', backgroundSize: '40px' }} />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === 'pl' ? 'Dostępne klasy aut' : 'Available car classes'}
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
              {language === 'pl'
                ? 'Nasza flota zmienia się zależnie od dostępności. Zdjęcia pokazują przykładowe klasy aut — dokładne dostępne auto potwierdzimy przed rezerwacją.'
                : 'Our fleet changes depending on availability. Photos show example car classes — we confirm the exact available car before booking.'}
            </p>
            <p className="mt-4 text-sm md:text-base font-semibold text-[#FFD700] max-w-3xl mx-auto">
              {language === 'pl'
                ? 'Bez kaucji · Pełne ubezpieczenie w cenie · Bez limitu km w Hiszpanii'
                : 'No deposit · Full insurance included · Unlimited mileage in Spain'}
            </p>
            
            {/* Currency Switcher */}
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setCurrency('EUR')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  currency === 'EUR'
                    ? 'bg-[#FFD700] text-[#1A2B49]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                EUR
              </button>
              <button
                onClick={() => setCurrency('PLN')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  currency === 'PLN'
                    ? 'bg-[#FFD700] text-[#1A2B49]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                PLN
              </button>
            </div>

            {/* Pricing Information Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 mx-auto max-w-3xl px-8 py-6 rounded-2xl bg-gradient-to-r from-[#FFD700]/20 to-[#FFB300]/20 backdrop-blur-sm border-2 border-[#FFD700]/30 shadow-lg"
            >
              <div className="flex items-start gap-4 text-left">
                <CurrencyEuroIcon className="w-8 h-8 text-[#FFD700] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-[#FFD700] mb-2">
                    {language === 'pl' 
                      ? 'Wycena dopasowana do Twojego terminu'
                      : 'Personal quote for your dates'}
                  </h3>
                  <p className="text-white/90 text-base leading-relaxed">
                    {language === 'pl'
                      ? 'Cena zależy od terminu, miejsca odbioru, długości wynajmu i klasy auta. Wyślij szczegóły wyjazdu — podamy końcową cenę przed rezerwacją.'
                      : 'Price depends on dates, pickup location, rental length and car class. Send us your trip details — we’ll confirm the final price before booking.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile: compact vertical class list (easier to scan than the carousel) */}
          <div className="md:hidden space-y-3">
            {mobileCarTypes.map((car, index) => (
              <motion.div
                key={car.bookingValue}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4"
              >
                <div className="flex gap-3">
                  <div className="relative w-24 h-16 flex-shrink-0 self-center">
                    <Image
                      src={car.image}
                      alt={car.alt[language]}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white leading-tight">
                      {car.type[language]}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-[#FFD700]">
                      {language === 'pl' ? 'od' : 'from'} {formatPrice(car.price)} / {language === 'pl' ? 'dzień' : 'day'}
                      <span className="text-white/60 font-normal"> · {car.seats[language]}</span>
                    </p>
                    <p className="mt-1 text-xs font-medium text-white/90">
                      {car.bestFor[language]}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-white/60">
                  {language === 'pl'
                    ? 'Bez kaucji · pełne ubezpieczenie · bez limitu km w Hiszpanii'
                    : 'No deposit · full insurance · unlimited mileage in Spain'}
                </p>
                <button
                  type="button"
                  onClick={() => goToBooking(car.bookingValue)}
                  className="mt-3 w-full bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-primary font-bold py-2.5 rounded-full shadow-md active:scale-95 transition-all"
                >
                  {language === 'pl' ? 'Sprawdź dostępność' : 'Check availability'}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Car Carousel (desktop / tablet) */}
          <div className="hidden md:block relative -mx-4 px-4">
            {/* Carousel */}
            <div ref={sliderRef} className="keen-slider">
              {carTypes.map((car, index) => (
                <motion.div
                  key={index}
                  className="keen-slider__slide !overflow-visible"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-full p-6 pb-6 pt-12 mt-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 group transition-all duration-500 hover:bg-white/20 flex flex-col">
                    {/* Badge */}
                    <div 
                      className="absolute -top-3 left-6 px-4 py-1 rounded-full text-sm font-semibold"
                      style={{
                        background: car.badge.type === 'luxury' 
                          ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' 
                          : car.badge.type === 'economy' && car.badge.text.en === 'Good balance'
                          ? 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)'  // Purple gradient for compact 'Good balance'
                          : car.badge.type === 'economy'
                          ? 'linear-gradient(135deg, #4FC3F7 0%, #2196F3 100%)'
                          : car.badge.type === 'group'
                          ? 'linear-gradient(135deg, #66BB6A 0%, #43A047 100%)'
                          : 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        whiteSpace: 'nowrap',
                        zIndex: 30,
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <span className="text-white drop-shadow-sm">
                        {car.badge.text[language]}
                      </span>
                    </div>

                    {/* Car Type and Price */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {car.type[language]}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/60">{language === 'pl' ? 'od' : 'from'}</span>
                        <span className="text-3xl font-bold text-[#FFD700]">{formatPrice(car.price)}</span>
                        <span className="text-white/60">/ {language === 'pl' ? 'dzień' : 'day'}</span>
                      </div>
                    </div>

                    {/* Car Image */}
                    <motion.div
                      className="relative h-48 my-6 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Image
                        src={car.image}
                        alt={car.alt[language]}
                        width={240}
                        height={160}
                        className="object-contain w-auto h-auto max-h-full transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>

                    {/* Features */}
                    <div className="space-y-3 flex-grow">
                      {car.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/70">
                          <feature.icon className="w-5 h-5 flex-shrink-0" />
                          <span>{feature.text[language]}</span>
                        </div>
                      ))}
                    </div>

                    {/* Book Now Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-6 bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-primary font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                      onClick={() => goToBooking(car.bookingValue)}
                    >
                      {language === 'pl' ? 'Sprawdź dostępność' : 'Check availability'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            {loaded && instanceRef.current && (
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(carTypes.length)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => instanceRef.current?.moveToIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-8 bg-[#FFD700]'
                        : 'bg-white/20'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Compare Cars Button (desktop only — mobile uses the compact list above) */}
          <div className="hidden md:block relative z-30 text-center mt-12">
            <button
              type="button"
              onClick={() => {
                setIsCompareModalOpen(true);
              }}
              className="relative z-30 inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
            >
              <SparklesIcon className="w-5 h-5 group-hover:text-[#FFD700] transition-colors" />
              <span className="relative z-30 group-hover:text-[#FFD700] transition-colors">
                {language === 'pl' ? 'Porównaj samochody' : 'Compare cars'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCompareModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#1A2B49] rounded-xl p-6 max-w-6xl w-[calc(100%-2rem)] max-h-[90vh] overflow-auto mx-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#1A2B49] py-2 z-10">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'pl' ? 'Porównanie samochodów' : 'Car Comparison'}
                </h3>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-white/60 hover:text-white p-2"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-4 px-6 text-white/60">{language === 'pl' ? 'Cechy' : 'Features'}</th>
                      {carTypes.map((car, index) => (
                        <th key={index} className="py-4 px-6 text-white">
                          <div className="flex flex-col items-center gap-2">
                            <div className="relative w-32 h-20">
                              <Image
                                src={car.image}
                                alt={car.type[language]}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-bold">{car.type[language]}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-white/60">{language === 'pl' ? 'Cena/dzień' : 'Price/day'}</td>
                      {carTypes.map((car, index) => (
                        <td key={index} className="py-4 px-6 text-white text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-sm text-white/60">{language === 'pl' ? 'od' : 'from'}</span>
                            <span className="font-bold">{formatPrice(car.price)}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-white/60">{language === 'pl' ? 'Miejsca' : 'Seats'}</td>
                      {carTypes.map((car, index) => (
                        <td key={index} className="py-4 px-6 text-white text-center">
                          {car.features.find(f => f.icon === UserGroupIcon)?.text[language]}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-white/60">{language === 'pl' ? 'Najlepszy dla' : 'Best for'}</td>
                      {carTypes.map((car, index) => (
                        <td key={index} className="py-4 px-6 text-white text-center">
                          {car.badge.text[language]}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-4 px-6 text-white/60">{language === 'pl' ? 'Ubezpieczenie' : 'Insurance'}</td>
                      {carTypes.map((car, index) => (
                        <td key={index} className="py-4 px-6 text-white text-center">
                          <ShieldCheckIcon className="w-6 h-6 mx-auto text-green-500" />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-white/60">{language === 'pl' ? 'Kaucja' : 'Deposit'}</td>
                      {carTypes.map((car, index) => (
                        <td key={index} className="py-4 px-6 text-white text-center">
                          {language === 'pl' ? 'Brak kaucji' : 'None'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Book Now Button */}
              <div className="mt-8 text-center sticky bottom-0 bg-[#1A2B49] py-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    setIsCompareModalOpen(false);
                    window.location.href = '#booking';
                  }}
                >
                  {language === 'pl' ? 'Sprawdź dostępność' : 'Check availability'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
} 