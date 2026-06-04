'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS: Record<string, JSX.Element> = {
  cars: <span className="text-blue-400 mr-3">🚗</span>,
  docs: <span className="text-blue-400 mr-3">📄</span>,
  deposit: <span className="text-yellow-400 mr-3">💳</span>,
  card: <span className="text-yellow-500 mr-3">💳</span>,
  insurance: <span className="text-blue-500 mr-3">🛡️</span>,
  mileage: <span className="text-green-500 mr-3">🛣️</span>,
  oneday: <span className="text-orange-400 mr-3">📅</span>,
  airport: <span className="text-sky-400 mr-3">✈️</span>,
  apartment: <span className="text-amber-500 mr-3">🏠</span>,
  locations: <span className="text-orange-400 mr-3">📍</span>,
  babyseat: <span className="text-pink-400 mr-3">🧸</span>,
  hours: <span className="text-green-400 mr-3">⏰</span>,
  included: <span className="text-blue-500 mr-3">✅</span>,
  region: <span className="text-orange-400 mr-3">🗺️</span>,
  outside: <span className="text-teal-500 mr-3">🌍</span>,
  accident: <span className="text-red-400 mr-3">🚨</span>,
  age: <span className="text-purple-400 mr-3">🎂</span>,
  extend: <span className="text-blue-400 mr-3">🔄</span>,
  driver: <span className="text-indigo-400 mr-3">👥</span>,
  payment: <span className="text-green-500 mr-3">💶</span>,
};

const FAQS = [
  {
    key: "docs",
    en: {
      q: "What documents do I need to rent a car?",
      a: "A valid driving licence and a passport or national ID."
    },
    pl: {
      q: "Jakie dokumenty są potrzebne do wynajmu auta?",
      a: "Ważne prawo jazdy oraz paszport lub dowód osobisty."
    }
  },
  {
    key: "deposit",
    en: {
      q: "Can I rent without a deposit or a credit card?",
      a: "Yes. We take no deposit and do not require a credit card. You only pay for the rental."
    },
    pl: {
      q: "Czy mogę wynająć auto bez kaucji i karty kredytowej?",
      a: "Tak. Nie pobieramy kaucji i nie wymagamy karty kredytowej. Płacisz tylko za wynajem."
    }
  },
  {
    key: "insurance",
    en: {
      q: "Is full insurance included?",
      a: "Yes. Full insurance is included. Before booking, we explain the exact cover and the rules for using the car."
    },
    pl: {
      q: "Czy pełne ubezpieczenie jest w cenie?",
      a: "Tak. Pełne ubezpieczenie jest w cenie. Przed rezerwacją wyjaśniamy dokładnie zakres ochrony i zasady korzystania z auta."
    }
  },
  {
    key: "mileage",
    en: {
      q: "Is mileage unlimited?",
      a: "Yes. Mileage is unlimited inside Spain."
    },
    pl: {
      q: "Czy kilometry są bez limitu?",
      a: "Tak. Na terenie Hiszpanii możesz jeździć bez limitu kilometrów."
    }
  },
  {
    key: "cars",
    en: {
      q: "Are the cars shown the exact vehicles I will get?",
      a: "Photos show example car classes, not guaranteed exact models. We confirm the exact available car with you before booking."
    },
    pl: {
      q: "Czy auta ze zdjęć to dokładnie te, które otrzymam?",
      a: "Zdjęcia pokazują przykładowe klasy aut, nie gwarantowane konkretne modele. Dokładne dostępne auto potwierdzamy z Tobą przed rezerwacją."
    }
  },
  {
    key: "airport",
    en: {
      q: "Can I pick up the car at Alicante Airport?",
      a: "Yes. Delivery and pickup at Alicante Airport are common for us. We arrange the details in advance."
    },
    pl: {
      q: "Czy mogę odebrać auto na lotnisku w Alicante?",
      a: "Tak. Podstawienie i odbiór auta na Lotnisku Alicante to u nas standard. Szczegóły ustalamy wcześniej."
    }
  },
  {
    key: "apartment",
    en: {
      q: "Can the car be delivered to my apartment?",
      a: "Yes. We can deliver the car to your apartment or another agreed location on Costa Blanca."
    },
    pl: {
      q: "Czy możliwe jest podstawienie auta pod apartament?",
      a: "Tak. Możemy podstawić auto pod apartament lub inne ustalone miejsce na Costa Blanca."
    }
  },
  {
    key: "oneday",
    en: {
      q: "Can I rent for one day?",
      a: "One-day rentals are very limited and often unavailable. It is best to ask at least 3–4 days in advance. We usually prefer rentals from around 3 days."
    },
    pl: {
      q: "Czy mogę wynająć auto na jeden dzień?",
      a: "Wynajem na 1 dzień jest mocno ograniczony i często niedostępny. Najlepiej zapytać minimum 3–4 dni wcześniej. Preferujemy wynajem od około 3 dni."
    }
  },
  {
    key: "region",
    en: {
      q: "Can I travel outside the Alicante region?",
      a: "Yes. You can travel throughout Spain with unlimited mileage. Travel outside Spain is not allowed without prior approval."
    },
    pl: {
      q: "Czy mogę podróżować poza region Alicante?",
      a: "Tak. Możesz jeździć po całej Hiszpanii bez limitu kilometrów. Wyjazd poza Hiszpanię nie jest dozwolony bez wcześniejszej zgody."
    }
  },
  {
    key: "outside",
    en: {
      q: "Can I travel outside Spain?",
      a: "No. As standard, we do not allow the car to be taken outside Spain."
    },
    pl: {
      q: "Czy mogę wyjechać poza Hiszpanię?",
      a: "Nie. Standardowo nie zezwalamy na wyjazd autem poza Hiszpanię."
    }
  },
  {
    key: "accident",
    en: {
      q: "What happens in case of a breakdown or accident?",
      a: "Contact us right away. We are available 24/7 and will tell you what to do step by step. If needed, we will help with roadside assistance or a replacement solution."
    },
    pl: {
      q: "Co zrobić w przypadku awarii lub wypadku?",
      a: "Skontaktuj się z nami od razu. Jesteśmy dostępni 24/7 i powiemy, co zrobić krok po kroku. W razie potrzeby pomożemy z pomocą drogową lub rozwiązaniem zastępczym."
    }
  },
  {
    key: "driver",
    en: {
      q: "Can I add a second driver?",
      a: "Yes. An additional driver is free. The driver must be at least 21 years old and have held a driving licence for at least one year."
    },
    pl: {
      q: "Czy mogę dodać drugiego kierowcę?",
      a: "Tak. Dodatkowy kierowca jest bez opłat. Może prowadzić osoba, która ma ukończone 21 lat i prawo jazdy od co najmniej roku."
    }
  },
  {
    key: "babyseat",
    en: {
      q: "Can I request a baby or child seat?",
      a: "Yes. Baby and child seats are available on request. Let us know in advance if you need one."
    },
    pl: {
      q: "Czy mogę zamówić fotelik dziecięcy?",
      a: "Tak. Foteliki dziecięce są dostępne na życzenie. Daj znać wcześniej, jeśli go potrzebujesz."
    }
  },
  {
    key: "payment",
    en: {
      q: "How do I pay for my rental?",
      a: "By cash, card or bank transfer. A credit card is not required."
    },
    pl: {
      q: "Jak mogę zapłacić za wynajem?",
      a: "Gotówką, kartą lub przelewem. Karta kredytowa nie jest wymagana."
    }
  }
];

const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="faq" className="max-w-3xl mx-auto my-20 px-4 py-12 rounded-3xl bg-blue-50/60 shadow-inner relative">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-10 text-center tracking-tight">
        {language === 'pl' ? 'Najczęściej zadawane pytania' : 'Frequently Asked Questions'}
      </h2>
      <div className="space-y-6">
        {FAQS.map(faq => {
          const isOpen = open === faq.key;
          return (
            <div
              key={faq.key}
              className={`transition-all duration-300 border rounded-2xl shadow-lg bg-white/90 overflow-hidden ${
                isOpen
                  ? 'border-blue-400 bg-blue-100/80 shadow-2xl'
                  : 'border-blue-200'
              }`}
            >
              <button
                className={`w-full flex items-center justify-between px-6 py-5 text-lg md:text-xl font-semibold text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-2xl transition-all ${isOpen ? 'font-bold' : ''}`}
                onClick={() => setOpen(isOpen ? null : faq.key)}
                aria-expanded={isOpen}
                aria-controls={`faq-${faq.key}`}
              >
                <span className="flex items-center">
                  {ICONS[faq.key] || <span className="text-blue-300 mr-3">❓</span>}
                  {faq[language].q}
                </span>
                <span className={`ml-4 text-2xl transition-transform ${isOpen ? 'rotate-180 text-blue-500' : 'text-blue-300'}`}>▼</span>
              </button>
              <div
                id={`faq-${faq.key}`}
                className={`px-6 pb-4 text-blue-700 text-base md:text-lg transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                style={{
                  marginTop: isOpen ? '0' : '-1rem',
                  transitionProperty: 'max-height, opacity, margin-top',
                }}
                aria-hidden={!isOpen}
              >
                {faq[language].a}
              </div>
            </div>
          );
        })}
      </div>
      <img
        src="/images/graphics/yellow shirt.svg"
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        className="hidden md:block absolute bottom-4 w-40 h-auto pointer-events-none select-none opacity-90 z-10"
        style={{ right: '-5.4cm' }}
      />
    </section>
  );
};

export default FAQSection; 