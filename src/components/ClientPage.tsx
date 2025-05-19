'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import HeroSection from '@/components/HeroSection';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/context/LanguageContext';
import { ImageCarousel } from '@/components/ImageCarousel';
import SurferTransition from '@/components/SurferTransition';
import SunsetCard from './SunsetCard';
import FAQSection from './FAQSection';
import CarCategories from '@/components/CarCategories';
import EntryAnimation from './EntryAnimation';

const ClientPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);
  const [showEntry, setShowEntry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhiteScreen(false);
      setShowEntry(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showWhiteScreen && showEntry) {
      const entryTimer = setTimeout(() => {
        setShowEntry(false);
      }, 6000); // match EntryAnimation duration
      return () => clearTimeout(entryTimer);
    }
  }, [showWhiteScreen, showEntry]);

  if (showWhiteScreen) {
    return (
      <div className="fixed inset-0 z-[1000] bg-white w-screen h-screen" aria-hidden="true" />
    );
  }
  if (showEntry) {
    return <EntryAnimation onComplete={() => setShowEntry(false)} />;
  }

  return (
    <React.Fragment>
      <Header />
      <div className="relative isolate pb-14 lg:pb-0">
        {/* Hero section */}
        <HeroSection />

        {/* Trust badges */}
        <section className="relative isolate pt-20 md:pt-40 pb-16 md:pb-32 overflow-hidden bg-cover bg-center" id="about">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFD700" d="M45.7,-78.1C59.9,-70.3,73.1,-59.9,81.9,-45.9C90.7,-31.9,95.1,-14.3,93.5,2.1C91.9,18.5,84.3,34.7,74.1,48.1C63.9,61.5,51.1,72.1,36.5,78.5C21.9,84.9,5.5,87.1,-10.4,85.1C-26.3,83.1,-41.7,76.9,-54.8,67.1C-67.9,57.3,-78.7,43.9,-84.5,28.1C-90.3,12.3,-91.1,-5.9,-86.3,-22.3C-81.5,-38.7,-71.1,-53.3,-57.3,-61.1C-43.5,-68.9,-26.3,-69.9,-10.1,-58.3C6.1,-46.7,31.5,-85.9,45.7,-78.1Z" transform="translate(100 100)" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 opacity-20">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#87CEEB" d="M45.7,-78.1C59.9,-70.3,73.1,-59.9,81.9,-45.9C90.7,-31.9,95.1,-14.3,93.5,2.1C91.9,18.5,84.3,34.7,74.1,48.1C63.9,61.5,51.1,72.1,36.5,78.5C21.9,84.9,5.5,87.1,-10.4,85.1C-26.3,83.1,-41.7,76.9,-54.8,67.1C-67.9,57.3,-78.7,43.9,-84.5,28.1C-90.3,12.3,-91.1,-5.9,-86.3,-22.3C-81.5,-38.7,-71.1,-53.3,-57.3,-61.1C-43.5,-68.9,-26.3,-69.9,-10.1,-58.3C6.1,-46.7,31.5,-85.9,45.7,-78.1Z" transform="translate(100 100)" />
            </svg>
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center mb-8 md:mb-16">
                {language === 'pl' ? (
                  <React.Fragment>
                    <div className="relative">
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary sm:text-5xl mb-8 md:mb-12">
                      Dołącz do grona zadowolonych podróżnych i przekonaj się sam!
                      <span className="absolute bottom-[-4px] left-0 w-full h-1 bg-yellow-400 transform -rotate-1"></span>
                      </h2>
                      <div className="absolute -bottom-12 md:-bottom-16 right-0 w-40 md:w-56 h-40 md:h-56 transform translate-x-1/2">
                        <Image 
                          src="/images/graphics/Allura - Sitting.svg" 
                          alt="Decorative sitting figure" 
                          width={224}
                          height={224}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
                      <div className="hidden md:block flex-shrink-0 h-56 w-auto -ml-32">
                        <Image 
                          src="/images/graphics/Città - Standing.svg" 
                          alt="Decorative standing figure" 
                          width={224}
                          height={224}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <SunsetCard />
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="relative">
                      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary sm:text-5xl mb-8 md:mb-12">
                      Join Our Happy Travelers and See for Yourself!
                      <span className="absolute bottom-[-4px] left-0 w-full h-1 bg-yellow-400 transform -rotate-1"></span>
                      </h2>
                      <div className="absolute -bottom-12 md:-bottom-16 right-0 w-40 md:w-56 h-40 md:h-56 transform translate-x-1/2">
                        <Image 
                          src="/images/graphics/Allura - Sitting.svg" 
                          alt="Decorative sitting figure" 
                          width={224}
                          height={224}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12">
                      <div className="hidden md:block flex-shrink-0 h-56 w-auto -ml-32">
                        <Image 
                          src="/images/graphics/Città - Standing.svg" 
                          alt="Decorative standing figure" 
                          width={224}
                          height={224}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <SunsetCard />
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-20">
                {/* Local Service */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-[280px] p-5 bg-white rounded-2xl relative overflow-visible shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-xl transition-all"
                >
                  <div className="bg-yellow-100 h-[42%] w-full rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[rgba(226,196,63,0.25)_0px_13px_47px_-5px,rgba(180,71,71,0.3)_0px_8px_16px_-8px] flex items-center justify-center">
                    <Image src="/images/graphics/pin.svg" alt="Local Service" width={56} height={56} className="w-14 h-14" />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold text-yellow-700 mb-3">
                      {language === 'pl' as Language ? 'Lokalna Obsługa' : 'Local Service'}
                    </h3>
                    <p className="text-base text-gray-600">
                      {language === 'pl' as Language
                        ? 'Znamy region jak własną kieszeń i zawsze służymy pomocą.'
                        : 'Our team knows the region inside out and is always ready to help.'}
                    </p>
                  </div>
                </motion.div>

                {/* No Hidden Fees */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-[280px] p-5 bg-white rounded-2xl relative overflow-visible shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-xl transition-all"
                >
                  <div className="bg-green-100 h-[42%] w-full rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[rgba(226,196,63,0.25)_0px_13px_47px_-5px,rgba(180,71,71,0.3)_0px_8px_16px_-8px] flex items-center justify-center">
                    <Image src="/images/graphics/card.svg" alt="No Hidden Fees" width={56} height={56} className="w-14 h-14" />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold text-green-700 mb-3">
                      {language === 'pl' as Language ? 'Brak Ukrytych Opłat' : 'No Hidden Fees'}
                    </h3>
                    <p className="text-base text-gray-600">
                      {language === 'pl' as Language
                        ? 'Przejrzyste ceny—płacisz za to co widzisz'
                        : 'Transparent pricing—what you see is what you pay.'}
                    </p>
                  </div>
                </motion.div>

                {/* Free Delivery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-[280px] p-5 bg-white rounded-2xl relative overflow-visible shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-xl transition-all"
                >
                  <div className="bg-blue-100 h-[42%] w-full rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[rgba(226,196,63,0.25)_0px_13px_47px_-5px,rgba(180,71,71,0.3)_0px_8px_16px_-8px] flex items-center justify-center">
                    <Image src="/images/graphics/carrr.svg" alt="Free Delivery" width={56} height={56} className="w-14 h-14" />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold text-blue-700 mb-3">
                      {language === 'pl' as Language ? 'Darmowa Dostawa' : 'Free Delivery'}
                    </h3>
                    <p className="text-base text-gray-600">
                      {language === 'pl' as Language
                        ? 'Dostarczymy auto tam, gdzie tego potrzebujesz'
                        : 'We\'ll bring your car to you, wherever you are.'}
                    </p>
                  </div>
                </motion.div>

                {/* 24/7 Support */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-[280px] p-5 bg-white rounded-2xl relative overflow-visible shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-xl transition-all"
                >
                  <div className="bg-pink-100 h-[42%] w-full rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-6 hover:shadow-[rgba(226,196,63,0.25)_0px_13px_47px_-5px,rgba(180,71,71,0.3)_0px_8px_16px_-8px] flex items-center justify-center">
                    <Image src="/images/graphics/customer service.svg" alt="24/7 Support" width={56} height={56} className="w-14 h-14" />
                  </div>
                  <div className="pt-6">
                    <h3 className="text-2xl font-bold text-pink-700 mb-3">
                      {language === 'pl' as Language ? 'Wsparcie 24/7' : '24/7 Support'}
                    </h3>
                    <p className="text-base text-gray-600">
                      {language === 'pl' as Language
                        ? 'Jesteśmy do Twojej dyspozycji o każdej porze.'
                        : 'Day or night, we&apos;re here for you.'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <SurferTransition />

        {/* How it Works section */}
        <div id="how-it-works" className="relative">
          <div className="relative z-20">
            <HowItWorks />
          </div>
        </div>

        {/* Car Categories section */}
        <div id="cars">
          <CarCategories />
        </div>

        {/* Popular Destinations */}
        <div id="destinations" className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 my-16" style={{ background: 'linear-gradient(180deg, #7DD3FC 0%, #38BDF8 60%, #FDE68A 100%)' }}>
          <div className="hidden md:block flex-shrink-0 w-64 lg:w-80 xl:w-96">
            <img 
              src="/images/graphics/red shirt .svg" 
              alt="Decorative standing figure" 
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="flex-1 w-full">
            <ImageCarousel images={[
              {
                src: "/images/places/isla de Tabarca.jpeg",
                title: language === 'pl' ? "Wyspa Tabarca" : "Tabarca Island",
                desc: language === 'pl' ? "Malownicza wyspa z krystalicznie czystą wodą i bogatym życiem morskim." : "Picturesque island with crystal clear waters and rich marine life."
              },
              {
                src: "/images/places/Sierra Espuńa Mrcia.jpeg",
                title: language === 'pl' ? "Sierra Espuña" : "Sierra Espuña",
                desc: language === 'pl' ? "Zapierające dech w piersiach górskie krajobrazy, idealne dla miłośników natury." : "Breathtaking mountain landscapes perfect for nature lovers."
              },
              {
                src: "/images/places/Castillo-de-Santa-Barbara.jpeg",
                title: language === 'pl' ? "Zamek Santa Barbara" : "Castillo de Santa Barbara",
                desc: language === 'pl' ? "Historyczny zamek z zapierającymi dech widokami na Alicante." : "Historic castle with breathtaking views of Alicante."
              },
              {
                src: "/images/places/Sierra Espuńa .jpeg",
                title: language === 'pl' ? "Sierra Espuña" : "Sierra Espuña",
                desc: language === 'pl' ? "Wspaniałe widoki gór i naturalne krajobrazy." : "Stunning mountain views and natural landscapes."
              },
              {
                src: "/images/places/Santa_Pola_Parqu.jpeg",
                title: language === 'pl' ? "Park w Santa Pola" : "Santa Pola Park",
                desc: language === 'pl' ? "Piękny park z bujną zielenią i ścieżkami spacerowymi." : "Beautiful park with lush greenery and walking paths."
              },
              {
                src: "/images/places/Santa_Pola.jpeg",
                title: language === 'pl' ? "Santa Pola" : "Santa Pola",
                desc: language === 'pl' ? "Urocze nadmorskie miasteczko z zabytkami." : "Charming coastal town with historic landmarks."
              },
              {
                src: "/images/places/Sierra Espuńa debera ampillar.jpeg",
                title: language === 'pl' ? "Sierra Espuña" : "Sierra Espuña",
                desc: language === 'pl' ? "Majestatyczne pasmo górskie idealne na wędrówki i przygody." : "Majestic mountain range perfect for hiking and adventure."
              },
              {
                src: "/images/places/Castillo de la Atalaya.jpeg",
                title: language === 'pl' ? "Zamek Atalaya" : "Castillo de la Atalaya",
                desc: language === 'pl' ? "Historyczny zamek z piękną architekturą." : "Historic castle with stunning architecture."
              },
              {
                src: "/images/places/playas-torrevieja-la-mata.jpeg",
                title: language === 'pl' ? "Plaża La Mata" : "La Mata Beach",
                desc: language === 'pl' ? "Piękne plaże ze złotym piaskiem i czystą wodą." : "Beautiful beaches with golden sand and clear waters."
              },
              {
                src: "/images/places/Calle del Mar Santa pola.jpeg",
                title: language === 'pl' ? "Promenada w Santa Pola" : "Santa Pola Promenade",
                desc: language === 'pl' ? "Tętniący życiem deptak idealny na wieczorne spacery." : "Vibrant promenade perfect for evening walks."
              },
              {
                src: "/images/places/lake pink.jpeg",
                title: language === 'pl' ? "Różowe Jezioro" : "Pink Lake",
                desc: language === 'pl' ? "Słynne różowe jezioro solne, cud natury Torrevieja." : "Famous pink salt lake, a natural wonder of Torrevieja."
              },
              {
                src: "/images/places/torrevieja flamingos.jpeg",
                title: language === 'pl' ? "Flamingi w Torrevieja" : "Torrevieja Flamingos",
                desc: language === 'pl' ? "Naturalne siedlisko pięknych flamingów." : "Natural habitat of beautiful flamingos in their element."
              },
              {
                src: "/images/places/Lagunas de La Mata y Torrevieja.jpeg",
                title: language === 'pl' ? "Laguny La Mata i Torrevieja" : "La Mata and Torrevieja Lagoons",
                desc: language === 'pl' ? "Eleganckie flamingi w swoim naturalnym środowisku." : "Elegant flamingos in their natural habitat."
              },
              {
                src: "/images/places/Castillo de Monteagudo.jpeg",
                title: language === 'pl' ? "Zamek Monteagudo" : "Castillo de Monteagudo",
                desc: language === 'pl' ? "Ikoniczny zamek z widokiem na Morze Śródziemne." : "Iconic castle overlooking the Mediterranean Sea."
              },
              {
                src: "/images/places/torrevieja.jpeg",
                title: language === 'pl' ? "Torrevieja" : "Torrevieja",
                desc: language === 'pl' ? "Piękne nadmorskie miasto z bogatą kulturą i plażami." : "Beautiful coastal city with vibrant culture and beaches."
              },
              {
                src: "/images/places/Playa Albir.jpeg",
                title: language === 'pl' ? "Plaża Albir" : "Albir Beach",
                desc: language === 'pl' ? "Piękna plaża z krystalicznie czystą wodą." : "Beautiful beach with crystal clear waters."
              },
              {
                src: "/images/places/Sierra Espuńa Mrcia.jpeg",
                title: language === 'pl' ? "Sierra Espuña" : "Sierra Espuña",
                desc: language === 'pl' ? "Historyczne miasto z piękną barokową architekturą." : "Historic city with beautiful baroque architecture."
              },
              {
                src: "/images/places/Laguna de La Mata.jpeg",
                title: language === 'pl' ? "Laguna La Mata" : "La Mata Lagoon",
                desc: language === 'pl' ? "Inny widok na oszałamiające różowe jezioro solne." : "Another view of the stunning pink salt lake."
              },
              {
                src: "/images/places/Alicante.jpeg",
                title: language === 'pl' ? "Alicante" : "Alicante",
                desc: language === 'pl' ? "Tętniące życiem miasto portowe z pięknymi plażami i zabytkami." : "Vibrant port city with beautiful beaches and historic sites."
              }
            ]} />
          </div>
        </div>

        {/* Testimonials section */}
        <div id="testimonials">
          <Testimonials />
        </div>

        {/* Contact section */}
        <div id="contact">
          <Contact />
        </div>

        {/* FAQ section */}
        <div id="faq">
          <FAQSection />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ClientPage; 