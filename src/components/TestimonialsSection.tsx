'use client';

import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  StarIcon, 
  CheckBadgeIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

const testimonials = [
  {
    id: 1,
    name: { en: 'Anna W.', pl: 'Anna W.' },
    photo: `https://ui-avatars.com/api/?name=Anna+W&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Clear contract, no hidden costs',
      pl: 'Czytelna umowa, bez ukrytych kosztów'
    },
    review: {
      en: 'Professional service, clear contract, clean car and no hidden costs. No deposit, no credit card and full insurance.',
      pl: 'Profesjonalna obsługa, jasna i czytelna umowa, czyste auto i brak ukrytych kosztów. Bez kaucji, bez karty kredytowej i z pełnym ubezpieczeniem.'
    },
    source: 'Facebook'
  },
  {
    id: 2,
    name: { en: 'Mirka J.', pl: 'Mirka J.' },
    photo: `https://ui-avatars.com/api/?name=Mirka+J&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Car ready at Alicante airport',
      pl: 'Auto gotowe na lotnisku w Alicante'
    },
    review: {
      en: 'Everything was arranged in Polish before the trip. The car was waiting at Alicante airport on time — no queues, no stress and no hidden fees.',
      pl: 'Wszystko ustalone po polsku przed wyjazdem. Auto czekało na lotnisku w Alicante dokładnie na czas, bez kolejek, bez stresu i bez ukrytych opłat.'
    },
    source: 'Facebook'
  },
  {
    id: 3,
    name: { en: 'Aleksandra D.', pl: 'Aleksandra D.' },
    photo: `https://ui-avatars.com/api/?name=Aleksandra+D&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'In good hands from the start',
      pl: 'W dobrych rękach od początku'
    },
    review: {
      en: 'From the beginning I felt in good hands. Everything was explained clearly, the car was clean and comfortable, and there were no surprise costs.',
      pl: 'Od początku czułam, że jestem w dobrych rękach. Wszystko wyjaśnione jasno, samochód czysty i wygodny, żadnych niespodziewanych kosztów.'
    },
    source: 'Facebook'
  },
  {
    id: 4,
    name: { en: 'Maciej L.', pl: 'Maciej L.' },
    photo: `https://ui-avatars.com/api/?name=Maciej+L&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Safe and well looked after',
      pl: 'Bezpiecznie i z realną opieką'
    },
    review: {
      en: 'I felt safe and genuinely looked after as a customer. Other reviews describe the service well. Thank you — see you again.',
      pl: 'Czułem bezpieczeństwo i realną opiekę nad klientem. Opinie trafnie opisują usługę. Dziękuję i do zobaczenia.'
    },
    source: 'Facebook'
  }
];

const FACEBOOK_REVIEWS_URL = 'https://www.facebook.com/people/NowRent/61574868050559/?sk=reviews';

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loadedTestimonials, setLoadedTestimonials] = useState(false);

  // Testimonials slider with auto-advance
  const [testimonialSliderRef, testimonialSliderInstance] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1, spacing: 0 },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 0 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 3, spacing: 0 },
        mode: "snap"
      },
    },
    slideChanged(slider) {
      setCurrentTestimonial(slider.track.details.rel);
    },
    created() {
      setLoadedTestimonials(true);
    },
  });

  // Auto-advance for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialSliderInstance.current) {
        const currentSlide = testimonialSliderInstance.current.track.details.rel;
        const nextSlide = (currentSlide + 1) % testimonials.length;
        testimonialSliderInstance.current.moveToIdx(nextSlide);
      }
    }, 4000); // Changed to 4 seconds for smoother transitions
    return () => clearInterval(interval);
  }, [testimonialSliderInstance]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          index < rating ? (
            <StarIcon key={index} className="w-5 h-5 text-[#FFD700]" />
          ) : (
            <StarOutlineIcon key={index} className="w-5 h-5 text-[#FFD700]" />
          )
        ))}
      </div>
    );
  };

  return (
    <section className="relative pt-16 md:pt-24 pb-28 md:pb-24 bg-gradient-to-b from-[#0D1B33] to-[#1A2B49] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'url("/images/pattern.svg")', 
            backgroundSize: '40px',
            transform: 'rotate(15deg)',
            opacity: 0.5
          }} 
        />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-[#FFD700]" />
              <span className="text-white/60 uppercase tracking-wider text-sm font-medium">
                {language === 'pl' ? 'Opinie klientów' : 'Customer Reviews'}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#FFD700]">
              {language === 'pl' ? 'Co mówią nasi klienci?' : 'What Our Customers Say?'}
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {language === 'pl'
                ? 'Prawdziwe opinie klientów z Facebooka'
                : 'Read reviews from people who trusted us'}
            </p>
          </div>

          <div className="relative">
            <div ref={testimonialSliderRef} className="keen-slider overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="keen-slider__slide"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-5 md:p-5 h-full border border-white/20 hover:bg-white/20 transition-all duration-500 group mx-2">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="relative">
                        <div className="relative w-16 h-16 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-[#FFD700] ring-offset-2 ring-offset-[#1A2B49]">
                          <Image
                            src={testimonial.photo}
                            alt={`${testimonial.name[language]} - ${language === 'pl' ? 'Zweryfikowany klient' : 'Verified customer'}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-[#FFD700] rounded-full p-1">
                          <CheckBadgeIcon 
                            className="w-4 h-4 text-[#1A2B49]"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#FFD700] transition-colors">
                          {testimonial.name[language]}
                        </h3>
                        <div className="flex items-center gap-2">
                          {renderStars(testimonial.rating)}
                          <span className="text-white/60">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-white/60">{testimonial.source}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {testimonial.headline[language]}
                      </h4>
                      <p className="text-base md:text-[0.95rem] leading-relaxed text-white/90 italic">
                        &ldquo;{testimonial.review[language]}&rdquo;
                      </p>
                      <div className="absolute -left-1 -top-1 text-[#FFD700]/10 transform -rotate-12">
                        <svg className="w-7 h-7 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            {loadedTestimonials && testimonialSliderInstance.current && (
              <div className="flex flex-col items-center gap-3 mt-8">
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => testimonialSliderInstance.current?.moveToIdx(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentTestimonial === idx
                          ? 'w-8 bg-[#FFD700]'
                          : 'w-2 bg-white/20'
                      }`}
                      aria-label={`${language === 'pl' ? 'Przejdź do opinii' : 'Go to review'} ${idx + 1}`}
                    />
                  ))}
                </div>
                <p className="md:hidden text-sm text-white/50" aria-hidden="true">
                  {currentTestimonial + 1} / {testimonials.length}
                </p>
              </div>
            )}
          </div>

          {/* Facebook reviews link */}
          <div className="flex flex-col items-center gap-3 mt-12">
            <span className="text-white/80 text-sm md:text-base">
              {language === 'pl' ? 'Polecane przez klientów' : 'Recommended by customers'}
            </span>
            <a
              href={FACEBOOK_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1877F2] text-white font-semibold shadow-lg hover:bg-[#0f5ed7] transition-all hover:scale-105"
            >
              <i className="fab fa-facebook text-xl" />
              {language === 'pl' ? 'Zobacz więcej opinii na Facebooku' : 'Read more on Facebook'}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 