'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

export default function BookingForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    carType: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Effect to handle car type from URL
  useEffect(() => {
    const handleCarTypeFromUrl = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash.includes('?carType=')) {
          const carType = hash.split('?carType=')[1];
          setFormData(prev => ({
            ...prev,
            carType: carType
          }));

          // Remove the parameter from URL but keep the hash
          const url = new URL(window.location.href);
          url.hash = 'booking';
          history.replaceState({}, '', url.toString());
        }
      }
    };

    // Initial check
    handleCarTypeFromUrl();

    // Listen for hash changes
    window.addEventListener('hashchange', handleCarTypeFromUrl);

    return () => {
      window.removeEventListener('hashchange', handleCarTypeFromUrl);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: language === 'pl'
            ? 'Dziękujemy! Twoja rezerwacja została wysłana. Skontaktujemy się z Tobą wkrótce.'
            : 'Thank you! Your booking request has been sent. We will contact you soon.'
        });
        // Reset form
        setFormData({
          pickupLocation: '',
          dropoffLocation: '',
          pickupDate: '',
          pickupTime: '',
          dropoffDate: '',
          dropoffTime: '',
          carType: '',
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send request');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: language === 'pl'
          ? 'Przepraszamy, wystąpił błąd. Spróbuj ponownie później lub skontaktuj się z nami bezpośrednio.'
          : 'Sorry, something went wrong. Please try again later or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-32 md:py-24 bg-gradient-to-b from-[#1A2B49] to-[#0D1B33]" id="booking">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === 'pl' ? 'Zarezerwuj Samochód' : 'Book a Car'}
            </h2>
            <p className="text-lg text-white/80">
              {language === 'pl'
                ? 'Wypełnij poniższy formularz, aby zarezerwować swój wymarzony samochód'
                : 'Fill out the form below to book your dream car'}
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6">
              {/* Pickup Location */}
              <div className="space-y-2">
                <label htmlFor="pickupLocation" className="text-white/80 block">
                  {language === 'pl' ? 'Miejsce odbioru' : 'Pickup Location'}
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="pickupLocation"
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    placeholder={language === 'pl' ? 'Np. Lotnisko Alicante' : 'e.g. Alicante Airport'}
                    aria-label={language === 'pl' ? 'Miejsce odbioru' : 'Pickup Location'}
                  />
                </div>
              </div>

              {/* Dropoff Location */}
              <div className="space-y-2">
                <label htmlFor="dropoffLocation" className="text-white/80 block">
                  {language === 'pl' ? 'Miejsce zwrotu' : 'Dropoff Location'}
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="dropoffLocation"
                    type="text"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    placeholder={language === 'pl' ? 'Np. Centrum Alicante' : 'e.g. Alicante Center'}
                    aria-label={language === 'pl' ? 'Miejsce zwrotu' : 'Dropoff Location'}
                  />
                </div>
              </div>

              {/* Pickup Date */}
              <div className="space-y-2">
                <label htmlFor="pickupDate" className="text-white/80 block">
                  {language === 'pl' ? 'Data odbioru' : 'Pickup Date'}
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="pickupDate"
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    aria-label={language === 'pl' ? 'Data odbioru' : 'Pickup Date'}
                  />
                </div>
              </div>

              {/* Pickup Time */}
              <div className="space-y-2">
                <label htmlFor="pickupTime" className="text-white/80 block">
                  {language === 'pl' ? 'Godzina odbioru' : 'Pickup Time'}
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="pickupTime"
                    type="time"
                    name="pickupTime"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    aria-label={language === 'pl' ? 'Godzina odbioru' : 'Pickup Time'}
                  />
                </div>
              </div>

              {/* Dropoff Date */}
              <div className="space-y-2">
                <label htmlFor="dropoffDate" className="text-white/80 block">
                  {language === 'pl' ? 'Data zwrotu' : 'Dropoff Date'}
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="dropoffDate"
                    type="date"
                    name="dropoffDate"
                    value={formData.dropoffDate}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    aria-label={language === 'pl' ? 'Data zwrotu' : 'Dropoff Date'}
                  />
                </div>
              </div>

              {/* Dropoff Time */}
              <div className="space-y-2">
                <label htmlFor="dropoffTime" className="text-white/80 block">
                  {language === 'pl' ? 'Godzina zwrotu' : 'Dropoff Time'}
                </label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="dropoffTime"
                    type="time"
                    name="dropoffTime"
                    value={formData.dropoffTime}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    aria-label={language === 'pl' ? 'Godzina zwrotu' : 'Dropoff Time'}
                  />
                </div>
              </div>

              {/* Car Type */}
              <div className="space-y-2">
                <label htmlFor="carType" className="text-white/80 block">
                  {language === 'pl' ? 'Typ samochodu' : 'Car Type'}
                </label>
                <select
                  id="carType"
                  name="carType"
                  value={formData.carType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                  aria-label={language === 'pl' ? 'Wybierz typ samochodu' : 'Select car type'}
                >
                  <option value="">{language === 'pl' ? 'Wybierz typ samochodu' : 'Select car type'}</option>
                  <option value="economic">{language === 'pl' ? 'Ekonomiczny' : 'Economic'}</option>
                  <option value="compact">{language === 'pl' ? 'Kompaktowy' : 'Compact'}</option>
                  <option value="suv">{language === 'pl' ? 'SUV' : 'SUV'}</option>
                  <option value="luxury">{language === 'pl' ? 'Luksusowy' : 'Luxury'}</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-white/80 block">
                  {language === 'pl' ? 'Imię i nazwisko' : 'Full Name'}
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    placeholder={language === 'pl' ? 'Twoje imię i nazwisko' : 'Your full name'}
                    aria-label={language === 'pl' ? 'Imię i nazwisko' : 'Full Name'}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-white/80 block">
                  {language === 'pl' ? 'Email' : 'Email'}
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    placeholder={language === 'pl' ? 'Twój adres email' : 'Your email address'}
                    aria-label={language === 'pl' ? 'Adres email' : 'Email address'}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white/80 block">
                  {language === 'pl' ? 'Telefon' : 'Phone'}
                </label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" aria-hidden="true" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40"
                    placeholder={language === 'pl' ? 'Twój numer telefonu' : 'Your phone number'}
                    aria-label={language === 'pl' ? 'Numer telefonu' : 'Phone number'}
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="text-white/80 block">
                  {language === 'pl' ? 'Wiadomość' : 'Message'}
                </label>
                <div className="relative">
                  <ChatBubbleBottomCenterTextIcon className="absolute left-3 top-3 w-5 h-5 text-white/60" aria-hidden="true" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-10 text-white placeholder-white/40 min-h-[100px]"
                    placeholder={language === 'pl' ? 'Dodatkowe informacje lub pytania' : 'Additional information or questions'}
                    aria-label={language === 'pl' ? 'Wiadomość' : 'Message'}
                  />
                </div>
              </div>
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div className={`mt-4 p-4 rounded-xl ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/20 text-green-200' 
                  : 'bg-red-500/20 text-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#FFD700] text-[#1A2B49] py-4 px-8 rounded-xl text-lg font-semibold transition-all ${
                  isSubmitting 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-[#FFE44D]'
                }`}
              >
                {isSubmitting 
                  ? (language === 'pl' ? 'Wysyłanie...' : 'Sending...') 
                  : (language === 'pl' ? 'Zarezerwuj Teraz' : 'Book Now')}
              </motion.button>
            </div>
          </motion.form>

          {/* Prominent phone call section */}
          <div className="mt-10 flex flex-col items-center justify-center">
            <span className="text-white text-lg font-semibold mb-2">
              {language === 'pl' ? 'Lub zadzwoń:' : 'Or call:'}
            </span>
            <a
              href="tel:+34694229035"
              className="text-3xl md:text-4xl font-bold text-[#FFD700] bg-white/10 px-8 py-4 rounded-2xl shadow-lg hover:bg-[#FFD700] hover:text-[#1A2B49] transition-all duration-200 border-2 border-[#FFD700] mb-6"
              style={{ letterSpacing: '1px' }}
            >
              +34 694 22 90 35
            </a>
            <a
              href="#contact"
              className="inline-block bg-gradient-to-r from-[#FFD700] to-[#FFB300] text-[#1A2B49] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-lg md:text-xl border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-[#1A2B49]"
              style={{ letterSpacing: '1px' }}
            >
              {language === 'pl' ? 'Kontakt' : 'Contact'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 