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
    name: { en: 'Michael Brown', pl: 'Michael Brown' },
    photo: `https://ui-avatars.com/api/?name=Michael+Brown&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Exceptional service and beautiful cars',
      pl: 'Wyjątkowa obsługa i piękne samochody'
    },
    review: {
      en: 'The entire experience with NowRent was fantastic. The SUV we rented was in perfect condition, and the staff went above and beyond to make our trip special.',
      pl: 'Całe doświadczenie z NowRent było fantastyczne. SUV, który wynajęliśmy był w idealnym stanie, a personel zrobił wszystko, aby nasza podróż była wyjątkowa.'
    },
    source: 'Google'
  },
  {
    id: 2,
    name: { en: 'Anna Kowalska', pl: 'Anna Kowalska' },
    photo: `https://ui-avatars.com/api/?name=Anna+Kowalska&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Best car rental in Spain',
      pl: 'Najlepszy wynajem samochodów w Hiszpanii'
    },
    review: {
      en: 'Professional service from start to finish. The luxury car was immaculate and made our vacation truly memorable.',
      pl: 'Profesjonalna obsługa od początku do końca. Luksusowy samochód był nieskazitelny i sprawił, że nasze wakacje były naprawdę niezapomniane.'
    },
    source: 'Facebook'
  },
  {
    id: 3,
    name: { en: 'Thomas Wagner', pl: 'Thomas Wagner' },
    photo: `https://ui-avatars.com/api/?name=Thomas+Wagner&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Smooth and hassle-free rental',
      pl: 'Bezproblemowy i łatwy wynajem'
    },
    review: {
      en: 'Quick pickup, no hidden fees, and a great van that fit our whole family. Will definitely use NowRent again!',
      pl: 'Szybki odbiór, brak ukrytych opłat i świetny van, który pomieścił całą naszą rodzinę. Na pewno skorzystamy z NowRent ponownie!'
    },
    source: 'Google'
  },
  {
    id: 4,
    name: { en: 'Maria Rodriguez', pl: 'Maria Rodriguez' },
    photo: `https://ui-avatars.com/api/?name=Maria+Rodriguez&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Perfect family vacation car',
      pl: 'Idealny samochód na rodzinne wakacje'
    },
    review: {
      en: 'We rented a spacious SUV for our family trip. The car was clean, comfortable, and the service was outstanding. Highly recommend!',
      pl: 'Wynajęliśmy przestronnego SUV-a na naszą rodzinną podróż. Samochód był czysty, wygodny, a obsługa była doskonała. Gorąco polecam!'
    },
    source: 'Google'
  },
  {
    id: 5,
    name: { en: 'Jan Nowicki', pl: 'Jan Nowicki' },
    photo: `https://ui-avatars.com/api/?name=Jan+Nowicki&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Great experience with luxury car',
      pl: 'Świetne doświadczenie z luksusowym autem'
    },
    review: {
      en: 'Rented a Mercedes for our anniversary. The car was pristine and the service was top-notch. Will definitely be back!',
      pl: 'Wynajęliśmy Mercedesa na naszą rocznicę. Auto było w idealnym stanie, a obsługa na najwyższym poziomie. Na pewno wrócimy!'
    },
    source: 'Facebook'
  },
  {
    id: 6,
    name: { en: 'Sophie Martin', pl: 'Sophie Martin' },
    photo: `https://ui-avatars.com/api/?name=Sophie+Martin&background=1A2B49&color=FFD700&size=128&bold=true`,
    rating: 5,
    headline: {
      en: 'Excellent customer service',
      pl: 'Doskonała obsługa klienta'
    },
    review: {
      en: 'The team was incredibly helpful and responsive. They delivered the car right to our hotel and made the whole process so easy.',
      pl: 'Zespół był niesamowicie pomocny i reagował na wszystkie prośby. Dostarczyli samochód prosto do naszego hotelu i sprawili, że cały proces był bardzo łatwy.'
    },
    source: 'Google'
  }
];

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
    <section className="relative py-24 bg-gradient-to-b from-[#0D1B33] to-[#1A2B49] overflow-hidden">
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
                ? 'Poznaj opinie osób, które już nam zaufały'
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full border border-white/20 hover:bg-white/20 transition-all duration-500 group mx-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#FFD700] ring-offset-2 ring-offset-[#1A2B49]">
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
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#FFD700] transition-colors">
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
                      <h4 className="text-lg font-semibold text-[#FFD700] mb-2">
                        {testimonial.headline[language]}
                      </h4>
                      <p className="text-white/80 italic">
                        "{testimonial.review[language]}"
                      </p>
                      <div className="absolute -left-2 -top-2 text-[#FFD700]/20 transform -rotate-12">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
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
              <div className="flex flex-col items-center gap-4 mt-8">
                <div className="flex justify-center gap-2">
                  {[...Array(Math.ceil(testimonials.length / 3))].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => testimonialSliderInstance.current?.moveToIdx(idx * 3)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        Math.floor(currentTestimonial / 3) === idx
                          ? 'w-8 bg-[#FFD700]'
                          : 'bg-white/20'
                      }`}
                      aria-label={`Go to testimonial group ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 