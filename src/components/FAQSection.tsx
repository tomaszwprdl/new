import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const ICONS: Record<string, JSX.Element> = {
  docs: <span className="text-blue-400 mr-3">📄</span>,
  deposit: <span className="text-yellow-400 mr-3">💳</span>,
  babyseat: <span className="text-pink-400 mr-3">🧸</span>,
  hours: <span className="text-green-400 mr-3">⏰</span>,
  included: <span className="text-blue-500 mr-3">✅</span>,
  region: <span className="text-orange-400 mr-3">🗺️</span>,
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
      a: "You need a valid driver's license and a passport or national ID."
    },
    pl: {
      q: "Jakie dokumenty są potrzebne do wynajmu samochodu?",
      a: "Potrzebujesz ważnego prawa jazdy, paszportu lub dowodu osobistego."
    }
  },
  {
    key: "deposit",
    en: {
      q: "Is there a deposit required?",
      a: "No deposit is required unless you order a baby or child seat. In that case, a small refundable deposit applies."
    },
    pl: {
      q: "Czy wymagany jest depozyt?",
      a: "Nie pobieramy depozytu, chyba że zamówisz fotelik dziecięcy – wtedy obowiązuje niewielki, zwrotny depozyt."
    }
  },
  {
    key: "babyseat",
    en: {
      q: "Can I request a baby or child seat?",
      a: "Yes, we offer baby and child seats on request. Please let us know in advance if you need one. A small refundable deposit may apply."
    },
    pl: {
      q: "Czy mogę zamówić fotelik dziecięcy?",
      a: "Tak, oferujemy foteliki dziecięce na życzenie. Prosimy o wcześniejszą informację, jeśli potrzebujesz fotelika. Może obowiązywać niewielki, zwrotny depozyt."
    }
  },
  {
    key: "hours",
    en: {
      q: "Can I pick up or return the car outside business hours?",
      a: "Yes, we offer flexible pick-up and return times, including outside regular business hours. Please contact us in advance to arrange."
    },
    pl: {
      q: "Czy mogę odebrać lub zwrócić samochód poza godzinami pracy?",
      a: "Tak, oferujemy elastyczne godziny odbioru i zwrotu, także poza standardowymi godzinami pracy. Prosimy o wcześniejszy kontakt w celu ustalenia szczegółów."
    }
  },
  {
    key: "included",
    en: {
      q: "What is included in the rental price?",
      a: "The price includes full insurance, local taxes, and 24/7 roadside assistance. There are no hidden fees."
    },
    pl: {
      q: "Co jest wliczone w cenę wynajmu?",
      a: "Cena obejmuje pełne ubezpieczenie, lokalne podatki oraz całodobową pomoc drogową. Brak ukrytych opłat."
    }
  },
  {
    key: "region",
    en: {
      q: "Can I travel outside the Alicante region with the car?",
      a: "Yes, you can travel throughout Spain, but trips outside the country are currently not possible."
    },
    pl: {
      q: "Czy mogę podróżować poza region Alicante?",
      a: "Tak, możesz podróżować po terenie całej Hiszpanii, niestety wyjazdy poza granicę kraju są obecnie niemożliwe."
    }
  },
  {
    key: "accident",
    en: {
      q: "What happens in case of an accident or breakdown?",
      a: "Contact us immediately. We provide 24/7 support and will assist you with the next steps, including roadside assistance or a replacement vehicle."
    },
    pl: {
      q: "Co zrobić w przypadku wypadku lub awarii?",
      a: "Skontaktuj się z nami niezwłocznie. Zapewniamy wsparcie 24/7 i pomożemy w dalszych krokach, w tym w organizacji pomocy drogowej lub pojazdu zastępczego."
    }
  },
  {
    key: "age",
    en: {
      q: "Is there an age limit for renting a car?",
      a: "The minimum age is 21 years and you must have held a valid driver's license for at least one year."
    },
    pl: {
      q: "Czy obowiązuje limit wiekowy przy wynajmie samochodu?",
      a: "Minimalny wiek to 21 lat i musisz posiadać ważne prawo jazdy od co najmniej roku."
    }
  },
  {
    key: "extend",
    en: {
      q: "How do I extend my rental?",
      a: "Contact us as soon as possible. We will check availability and help you extend your rental period."
    },
    pl: {
      q: "Jak mogę przedłużyć wynajem?",
      a: "Skontaktuj się z nami jak najszybciej. Sprawdzimy dostępność i pomożemy przedłużyć okres wynajmu."
    }
  },
  {
    key: "driver",
    en: {
      q: "Can I add an additional driver?",
      a: "With us, additional drivers are free of charge. Anyone who is at least 21 years old and has held a driver's license for at least 1 year can drive the car."
    },
    pl: {
      q: "Czy mogę dodać dodatkowego kierowcę?",
      a: "U nas dodatkowi kierowcy są bez dodatkowych opłat. Samochodem może prowadzić każdy kto ma ukończone 21 lat i prawo jazdy min. 1 rok."
    }
  },
  {
    key: "payment",
    en: {
      q: "How do I pay for my rental?",
      a: "We prefer payment in cash or by bank transfer."
    },
    pl: {
      q: "Jak mogę zapłacić za wynajem?",
      a: "Preferujemy płatność gotówką lub przelewem bankowym"
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