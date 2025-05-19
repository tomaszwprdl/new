'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Function to get a consistent color based on name
function getAvatarColor(name: string) {
  const colors = [
    'bg-[#4285f4]', // Google Blue
    'bg-[#ea4335]', // Google Red
    'bg-[#fbbc05]', // Google Yellow
    'bg-[#34a853]', // Google Green
    'bg-[#7e57c2]', // Purple
    'bg-[#f06292]', // Pink
    'bg-[#ff7043]', // Deep Orange
    'bg-[#0097a7]', // Cyan
  ];
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

const testimonials = [
  {
    name: "Wojciech Kowalski",
    text: {
      en: "Always get a quick response. We were satisfied every time with the cars. Always again.",
      pl: "Zawsze szybka odpowiedź. Za każdym razem byliśmy zadowoleni z samochodów. Zawsze chętnie wrócimy.",
      de: "Anfrage immer eine schnelle wort erhalten. Auch mit den wagen waren wir jedes Mal zufrieden. Immer wieder gerne."
    },
    rating: 5,
    timeAgo: "17 days ago",
    avatar: null
  },
  {
    name: "Anna Nowak",
    text: {
      en: "Super nice! Super uncomplicated! Great communication! We've been renting our cars here for years. And if a problem does arise, it is quickly resolved. In one word: recommended!",
      pl: "Super miło! Super nieskomplikowanie! Świetna komunikacja! Od lat wypożyczamy tu samochody. A jeśli pojawi się problem, jest szybko rozwiązywany. Jednym słowem: polecamy!",
      de: "Super nett! Super unkompliziert! Super Kommunikation! Seit etlichen Jahren mieten wir uns da unsere Wagen. Und tritt doch mal ein Problem auf, wird das schnell gelöst. In einem Wort: empfehlenswert!"
    },
    rating: 5,
    timeAgo: "a month ago",
    avatar: "/images/avatars/default.png"
  },
  {
    name: "Tomasz Wiśniewski",
    text: {
      en: "Fast and fair dealings, good price, reliable car in nice condition",
      pl: "Szybka i uczciwa obsługa, dobra cena, niezawodny samochód w dobrym stanie",
      de: "Fast and fair dealings, good price, reliable car in nice condition"
    },
    rating: 5,
    timeAgo: "a month ago",
    avatar: null
  },
  {
    name: "Sophie Laurent",
    text: {
      en: "Best service, no waiting, good prices, 24/7 services, multi language.",
      pl: "Najlepsza obsługa, bez czekania, dobre ceny, usługi 24/7, wiele języków.",
      de: "Best service, no waiting, good prices, 24/7 services, multi language."
    },
    rating: 5,
    timeAgo: "2 months ago",
    avatar: "/images/avatars/berna.jpg"
  },
  {
    name: "Magdalena Zielińska",
    text: {
      en: "Everything is just right here. From my inquiry and the very nice emails to the handover and return directly at the hotel. We got a bigger car than actually rented. We were naturally pleased about that.",
      pl: "Tutaj wszystko po prostu działa. Od mojego zapytania i bardzo miłych maili po przekazanie i zwrot bezpośrednio w hotelu. Dostaliśmy większy samochód niż faktycznie wynajęty. Byliśmy z tego naturalnie zadowoleni.",
      de: "Hier stimmt einfach alles. Schon meine Anfrage sowie die weiteren sehr netten Mails, bis zur Über- und Rückgabe direkt im Hotel. Wir hatten ein größeres Auto erhalten als eigentlich gemietet. Das hat uns natürlich gefreut"
    },
    rating: 5,
    timeAgo: "14 hours ago",
    avatar: null
  },
  {
    name: "Piotr Lewandowski",
    text: {
      en: "The booking was super easy to make, you don't have to pay anything upfront! No hidden costs. The staff was very friendly and we got a super A class.",
      pl: "Rezerwacja była super łatwa, nie trzeba nic płacić z góry! Brak ukrytych kosztów. Obsługa była bardzo miła i dostaliśmy super klasę A.",
      de: "Die Buchung war super einfach zu machen, man zahlt nichts voraus! Keine versteckte Kosten. Die Dame war sehr freundlich und wir haben ein super A Klasse erhalten."
    },
    rating: 5,
    timeAgo: "5 days ago",
    avatar: null
  },
  {
    name: "Agnieszka Dąbrowska",
    text: {
      en: "Perfect service! The car was clean and in great condition. Will definitely use again.",
      pl: "Perfekcyjna obsługa! Samochód był czysty i w świetnym stanie. Na pewno skorzystamy ponownie.",
      de: "Perfekter Service! Das Auto war sauber und in einem großartigen Zustand. Werden auf jeden Fall wieder buchen."
    },
    rating: 5,
    timeAgo: "3 days ago",
    avatar: null
  },
  {
    name: "Hans Weber",
    text: {
      en: "Great experience! Clean car, friendly service, and easy return process.",
      pl: "Świetne doświadczenie! Czysty samochód, przyjazna obsługa i łatwy proces zwrotu.",
      de: "Tolle Erfahrung! Sauberes Auto, freundlicher Service und einfacher Rückgabeprozess."
    },
    rating: 5,
    timeAgo: "2 weeks ago",
    avatar: null
  },
  {
    name: "Katarzyna Szymańska",
    text: {
      en: "Excellent customer service and very competitive prices. The car was perfect for our family trip.",
      pl: "Doskonała obsługa klienta i bardzo konkurencyjne ceny. Samochód był idealny na naszą rodzinną podróż.",
      de: "Ausgezeichneter Kundenservice und sehr wettbewerbsfähige Preise. Das Auto war perfekt für unseren Familienausflug."
    },
    rating: 5,
    timeAgo: "1 week ago",
    avatar: null
  }
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" fill={filled ? "#FFD700" : "#E5E7EB"} viewBox="0 0 20 20">
      <polygon points="10,1 12.6,7.5 19.5,7.5 14,12 16,19 10,15 4,19 6,12 0.5,7.5 7.4,7.5" />
    </svg>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const displayLanguage = language === 'pl' ? 'pl' : 'en';
  const [scrollPx, setScrollPx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  // Create a duplicated array for infinite scroll effect
  const extendedTestimonials = [...testimonials, ...testimonials]; // Double for seamless loop

  useEffect(() => {
    // Measure the width of one set of testimonials
    if (containerRef.current) {
      const children = Array.from(containerRef.current.children);
      let width = 0;
      const setLength = testimonials.length;
      for (let i = 0; i < setLength; i++) {
        width += (children[i] as HTMLElement).offsetWidth + 24; // 24px gap-6
      }
      setSetWidth(width);
    }
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      setScrollPx((prev) => {
        if (setWidth === 0) return prev;
        const next = prev + 1; // 1px per tick
        if (next >= setWidth) {
          return 0;
        }
        return next;
      });
    }, 16); // ~60fps
    return () => clearInterval(scrollInterval);
  }, [setWidth]);

  return (
    <section className="py-16 bg-[#003087] text-white relative overflow-hidden">
      <div className="max-w-full mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4 text-center">
          {language === 'pl' ? 'Co mówią nasi klienci' : 'What Our Customers Say'}
        </h2>
        <p className="text-xl text-center mb-12 text-gray-200">
          {language === 'pl' 
            ? 'Nie wierz nam na słowo – posłuchaj naszych zadowolonych klientów'
            : "Don't just take our word for it – hear from our satisfied customers"
          }
        </p>

        <div className="relative overflow-hidden">
          <div 
            ref={containerRef}
            className="flex gap-6 transition-none"
            style={{
              transform: `translateX(-${scrollPx}px)`
            }}
          >
            {extendedTestimonials.map((testimonial, i) => (
              <div
                key={`${testimonial.name}-${i}`}
                className="flex-none w-[300px] bg-white text-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white mr-4 ${getAvatarColor(testimonial.name)}`}>
                    {testimonial.name.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <div className="text-gray-500 text-sm">{testimonial.timeAgo}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} filled={i < testimonial.rating} />
                  ))}
                </div>
                <p className="text-gray-700 min-h-[120px]">{testimonial.text[displayLanguage]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 