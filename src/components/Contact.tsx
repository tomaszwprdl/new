'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

// Car types and locations data (categories from fleet section)
const carTypes = [
  { id: 'suv', name: { en: 'SUV', pl: 'SUV' } },
  { id: 'compact', name: { en: 'Compact', pl: 'Kompaktowe' } },
  { id: 'premium', name: { en: 'Premium', pl: 'Premium' } },
  { id: 'economy', name: { en: 'Economy', pl: 'Ekonomiczny' } },
  { id: 'van', name: { en: 'Van', pl: 'Van' } }
];

const locations = [
  { id: 'airport', name: { en: 'Alicante Airport', pl: 'Lotnisko Alicante' } },
  { id: 'torrevieja', name: { en: 'Torrevieja', pl: 'Torrevieja' } },
  { id: 'alicante', name: { en: 'Alicante City', pl: 'Miasto Alicante' } },
  { id: 'orihuela', name: { en: 'Orihuela Costa', pl: 'Orihuela Costa' } },
  { id: 'guardamar', name: { en: 'Guardamar', pl: 'Guardamar' } },
  { id: 'other', name: { en: 'Other Location', pl: 'Inna lokalizacja' } },
];

export default function Contact() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carType: '',
    pickupDate: null,
    dropoffDate: null,
    location: '',
    otherLocation: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Get today's date in yyyy-mm-dd for input min
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  return (
    <section 
      className="py-20 relative overflow-hidden min-h-[100vh]"
      id="contact"
      style={{
        background: 'linear-gradient(135deg, #FFFDE4 0%, #FFEDBC 40%, #A7E9FF 100%)',
      }}
    >
      {/* Sun illustration top right */}
      <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none z-0">
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="128" cy="128" r="60" fill="#FFD600" fillOpacity="0.7" />
          {[...Array(12)].map((_, i) => (
            <rect key={i} x="124" y="10" width="8" height="40" rx="4" fill="#FFD600" fillOpacity="0.5" transform={`rotate(${i * 30} 128 128)`} />
          ))}
        </svg>
      </div>
      {/* Palm tree/beach silhouette bottom left */}
      <div className="absolute bottom-0 left-0 w-80 h-40 pointer-events-none z-0 opacity-60">
        <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="160" cy="110" rx="160" ry="20" fill="#FCD34D" fillOpacity="0.3" />
          <path d="M60 110 Q70 80 90 100 Q110 120 130 90 Q150 60 170 100 Q190 140 210 90 Q230 40 250 100" stroke="#34D399" strokeWidth="6" fill="none" />
          <rect x="70" y="100" width="10" height="20" fill="#A3A3A3" rx="3" />
          <rect x="130" y="90" width="10" height="30" fill="#A3A3A3" rx="3" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with playful icons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-10"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-blue-800 mb-2 text-center drop-shadow-lg"
          >
            {language === 'pl' ? 'Zarezerwuj Samochód – Zacznijmy Przygodę!' : "Book Your Car – Let's Get You Rolling!"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-700 text-lg text-center max-w-xl"
          >
            {language === 'pl' 
              ? 'Aby zapewnić dostępność samochodu i uniknąć podwójnych rezerwacji, wypełnij ten formularz. Szybko potwierdzimy Twoją rezerwację!'
              : "To ensure your car is available and avoid double bookings, please fill out this form. We'll confirm your reservation quickly!"}
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 items-stretch"
        >
          {/* Booking Form */}
          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-3xl font-bold text-blue-800 text-center mb-4">
                {language === 'pl'
                  ? 'Dziękujemy za zgłoszenie! Skontaktujemy się z Tobą wkrótce.'
                  : 'Thank you for your request! We\'ll get back to you soon.'}
              </div>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="flex-1 flex flex-col gap-4 bg-yellow-50/60 rounded-2xl p-6 shadow-md"
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={language === 'pl' ? 'Imię i nazwisko' : 'Full Name'}
                className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={language === 'pl' ? 'Email' : 'Email'}
                className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={language === 'pl' ? 'Numer telefonu' : 'Phone Number'}
                className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                required
              />
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all bg-white"
                required
              >
                <option value="">{language === 'pl' ? 'Wybierz typ samochodu' : 'Select Car Type'}</option>
                {carTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name[language]}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="pickupDate" className="text-blue-800 text-sm font-semibold mb-1">
                    {language === 'pl' ? 'Data odbioru' : 'Pick-up Date'}
                  </label>
                  <DatePicker
                    selected={formData.pickupDate}
                    onChange={date => handleDateChange(date, 'pickupDate')}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={language === 'pl' ? 'Wybierz datę odbioru' : 'Select pick-up date'}
                    className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all w-full"
                    required
                    id="pickupDate"
                    name="pickupDate"
                  />
                  <span className="text-xs text-blue-500 mt-1">
                    {language === 'pl' ? 'Nie można rezerwować wstecz. Wybierz datę od dziś.' : 'Cannot book in the past. Please select a date from today forward.'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dropoffDate" className="text-blue-800 text-sm font-semibold mb-1">
                    {language === 'pl' ? 'Data zwrotu' : 'Drop-off Date'}
                  </label>
                  <DatePicker
                    selected={formData.dropoffDate}
                    onChange={date => handleDateChange(date, 'dropoffDate')}
                    minDate={new Date()}
                    dateFormat="dd/MM/yyyy"
                    placeholderText={language === 'pl' ? 'Wybierz datę zwrotu' : 'Select drop-off date'}
                    className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all w-full"
                    required
                    id="dropoffDate"
                    name="dropoffDate"
                  />
                  <span className="text-xs text-blue-500 mt-1">
                    {language === 'pl' ? 'Nie można rezerwować wstecz. Wybierz datę od dziś.' : 'Cannot book in the past. Please select a date from today forward.'}
                  </span>
                </div>
              </div>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all bg-white"
                required
              >
                <option value="">{language === 'pl' ? 'Wybierz miejsce odbioru' : 'Select Pick-up Location'}</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name[language]}
                  </option>
                ))}
              </select>
              {formData.location === 'other' && (
                <input
                  type="text"
                  name="otherLocation"
                  value={formData.otherLocation}
                  onChange={handleChange}
                  placeholder={language === 'pl' ? 'Podaj inną lokalizację' : 'Specify Other Location'}
                  className="rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  required
                />
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={language === 'pl' 
                  ? 'Daj nam znać, jeśli masz jakieś specjalne prośby lub pytania!'
                  : 'Let us know if you have any special requests or questions!'}
                className="rounded-xl border border-blue-200 px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-yellow-200 font-bold rounded-xl py-3 mt-2 transition-colors"
              >
                {language === 'pl' ? 'Wyślij prośbę o rezerwację' : 'Request Booking'}
              </motion.button>
              <p className="text-xs text-blue-400 mt-2 text-center">
                {language === 'pl'
                  ? 'Potwierdzimy Twoją rezerwację telefonicznie lub przez WhatsApp, aby upewnić się, że samochód jest zarezerwowany tylko dla Ciebie. To pomaga nam uniknąć podwójnych rezerwacji i zapewnić najlepszą obsługę!'
                  : "We'll confirm your booking by phone or WhatsApp to make sure your car is reserved just for you. This helps us avoid double bookings and give you the best service!"}
              </p>
            </form>
          )}

          {/* Contact Info & Map */}
          <div className="flex-1 flex flex-col gap-6 justify-center items-center">
            {/* Move contact info to the top */}
            <div className="flex flex-col gap-3 w-full mb-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">📞</span>
                <a href="tel:+34694229035" className="text-blue-800 font-bold hover:underline transition-colors">
                  +34 694 22 90 35
                </a>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">💬</span>
                <a 
                  href="https://wa.me/34694229035" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-800 font-bold hover:underline transition-colors"
                >
                  {language === 'pl' ? 'Czat WhatsApp' : 'WhatsApp Chat'}
                </a>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">✉️</span>
                <a href="mailto:nowrentes@gmail.com" className="text-blue-800 font-bold hover:underline transition-colors">
                  nowrentes@gmail.com
                </a>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">📍</span>
                <span className="text-blue-800 font-bold">
                  {language === 'pl' ? 'Obsługujemy cały region Alicante' : 'We serve the entire Alicante region'}
                </span>
              </motion.div>
            </div>

            {/* Map Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full flex justify-center items-center p-4"
            >
              <iframe
                src="https://maps.google.com/maps?q=Costa%20Blanca&t=&z=10&ie=UTF8&iwloc=&output=embed"
                title="Costa Blanca Map"
                className="w-full max-w-[400px] h-[280px] rounded-lg shadow-lg border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-blue-400 text-center mt-2"
            >
              {language === 'pl' 
                ? 'Nasz zespół ma siedzibę w Torrevieja, ale dostarczamy samochody w całym regionie Costa Blanca!'
                : 'Our team is based in Torrevieja, but we deliver cars all over the Costa Blanca region!'}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 