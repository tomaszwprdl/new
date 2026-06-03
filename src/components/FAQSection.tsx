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
      a: "A valid driver's license and a passport or national ID."
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
      a: "Yes. We take no deposit and don't require a credit card — you pay only for the rental."
    },
    pl: {
      q: "Czy mogę wynająć auto bez kaucji i karty kredytowej?",
      a: "Tak. Nie pobieramy kaucji i nie wymagamy karty kredytowej — płacisz tylko za wynajem."
    }
  },
  {
    key: "insurance",
    en: {
      q: "Is full insurance included?",
      a: "Yes, full insurance is included — no add-ons to the basic cover. We explain the simple rules before booking."
    },
    pl: {
      q: "Czy pełne ubezpieczenie jest w cenie?",
      a: "Tak, pełne ubezpieczenie jest w cenie — bez dopłat do podstawowej ochrony. Proste zasady wyjaśniamy przed rezerwacją."
    }
  },
  {
    key: "mileage",
    en: {
      q: "Is mileage unlimited?",
      a: "Yes, mileage is unlimited inside Spain."
    },
    pl: {
      q: "Czy kilometry są bez limitu?",
      a: "Tak, na terenie Hiszpanii jeździsz bez limitu kilometrów."
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
      a: "Auta ze zdjęć są przykładami klas, nie gwarantowanymi konkretnymi modelami. Dokładne dostępne auto potwierdzamy z Tobą przed rezerwacją."
    }
  },
  {
    key: "airport",
    en: {
      q: "Can I pick up the car at Alicante Airport?",
      a: "Yes, pickup and delivery at Alicante Airport is common. We arrange the details with you in advance."
    },
    pl: {
      q: "Czy mogę odebrać auto na lotnisku w Alicante?",
      a: "Tak, odbiór i podstawienie auta na Lotnisku Alicante to u nas standard. Szczegóły ustalamy wcześniej."
    }
  },
  {
    key: "apartment",
    en: {
      q: "Can the car be delivered to my apartment?",
      a: "Yes, we can deliver the car to your apartment or another arranged location on the Costa Blanca."
    },
    pl: {
      q: "Czy możliwe jest podstawienie auta pod apartament?",
      a: "Tak, możemy podstawić auto pod apartament lub w inne ustalone miejsce na Costa Blanca."
    }
  },
  {
    key: "oneday",
    en: {
      q: "Can I rent for one day?",
      a: "One-day rentals are limited and depend on availability. We prefer rentals of about 3 days to 2 weeks — message us to check."
    },
    pl: {
      q: "Czy mogę wynająć auto na jeden dzień?",
      a: "Wynajem jednodniowy jest ograniczony i zależy od dostępności. Preferujemy wynajem od około 3 dni do 2 tygodni — napisz, sprawdzimy."
    }
  },
  {
    key: "region",
    en: {
      q: "Can I travel outside the Alicante region?",
      a: "Yes, you can travel throughout Spain with unlimited mileage."
    },
    pl: {
      q: "Czy mogę podróżować poza region Alicante?",
      a: "Tak, możesz podróżować po całej Hiszpanii bez limitu kilometrów."
    }
  },
  {
    key: "outside",
    en: {
      q: "Can I travel outside Spain?",
      a: "Travel outside Spain is not currently available unless explicitly agreed in advance."
    },
    pl: {
      q: "Czy mogę wyjechać poza Hiszpanię?",
      a: "Wyjazd poza Hiszpanię nie jest obecnie dostępny, chyba że zostanie wcześniej wyraźnie uzgodniony."
    }
  },
  {
    key: "accident",
    en: {
      q: "What happens in case of a breakdown or accident?",
      a: "Contact us right away. We're available 24/7 and will help with the next steps, including roadside assistance or a replacement car."
    },
    pl: {
      q: "Co zrobić w przypadku awarii lub wypadku?",
      a: "Skontaktuj się z nami od razu. Działamy 24/7 i pomożemy w kolejnych krokach, w tym w pomocy drogowej lub aucie zastępczym."
    }
  },
  {
    key: "driver",
    en: {
      q: "Can I add a second driver?",
      a: "Yes, an additional driver is free. Anyone aged 21+ with a license held for at least a year can drive."
    },
    pl: {
      q: "Czy mogę dodać drugiego kierowcę?",
      a: "Tak, dodatkowy kierowca jest bez opłat. Może prowadzić każdy, kto ma ukończone 21 lat i prawo jazdy od co najmniej roku."
    }
  },
  {
    key: "babyseat",
    en: {
      q: "Can I request a baby or child seat?",
      a: "Yes, we offer baby and child seats on request. Let us know in advance if you need one."
    },
    pl: {
      q: "Czy mogę zamówić fotelik dziecięcy?",
      a: "Tak, oferujemy foteliki dziecięce na życzenie. Daj znać wcześniej, jeśli go potrzebujesz."
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
    <section className="max-w-3xl mx-auto my-20 px-4 py-12 rounded-3xl bg-blue-50/60 shadow-inner relative">
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
        alt="Decorative standing figure" 
        className="hidden md:block absolute bottom-4 w-40 h-auto pointer-events-none select-none opacity-90 z-10"
        style={{ right: '-5.4cm' }}
      />
    </section>
  );
};

export default FAQSection; 