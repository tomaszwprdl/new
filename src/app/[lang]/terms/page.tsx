import { Metadata } from 'next';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Terms of Service - NowRent',
  description: 'Terms of Service for NowRent car rental service'
};

export default function Terms({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: February 20, 2024',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using NowRent services, you agree to be bound by these Terms of Service and all applicable laws and regulations.'
        },
        {
          title: '2. Rental Requirements',
          content: 'To rent a vehicle, you must:\n- Be at least 21 years old\n- Have a valid driver\'s license\n- Provide valid identification\n- Have a valid credit card\n- Meet our insurance requirements'
        },
        {
          title: '3. Reservations and Payments',
          content: 'Reservations are subject to:\n- Vehicle availability\n- Payment of deposit\n- Verification of documents\n- Cancellation policy terms\n- Seasonal pricing variations'
        },
        {
          title: '4. Vehicle Use',
          content: 'You agree to:\n- Use the vehicle only for lawful purposes\n- Not modify the vehicle\n- Return the vehicle in the same condition\n- Report any damage immediately\n- Follow all traffic laws'
        },
        {
          title: '5. Insurance and Liability',
          content: 'Our insurance policy covers:\n- Basic liability insurance\n- Collision damage waiver options\n- Personal accident insurance\n- Additional coverage available'
        },
        {
          title: '6. Modifications',
          content: 'We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of new terms.'
        }
      ]
    },
    pl: {
      title: 'Regulamin',
      lastUpdated: 'Ostatnia aktualizacja: 20 lutego 2024',
      sections: [
        {
          title: '1. Akceptacja Warunków',
          content: 'Korzystając z usług NowRent, zgadzasz się przestrzegać niniejszego Regulaminu oraz wszystkich obowiązujących przepisów prawa.'
        },
        {
          title: '2. Wymagania Wynajmu',
          content: 'Aby wynająć pojazd, musisz:\n- Mieć ukończone 21 lat\n- Posiadać ważne prawo jazdy\n- Przedstawić ważny dokument tożsamości\n- Posiadać ważną kartę kredytową\n- Spełniać nasze wymagania ubezpieczeniowe'
        },
        {
          title: '3. Rezerwacje i Płatności',
          content: 'Rezerwacje podlegają:\n- Dostępności pojazdów\n- Wpłacie kaucji\n- Weryfikacji dokumentów\n- Warunkom polityki anulowania\n- Sezonowym zmianom cen'
        },
        {
          title: '4. Użytkowanie Pojazdu',
          content: 'Zobowiązujesz się do:\n- Używania pojazdu tylko w celach zgodnych z prawem\n- Nieprzerabiania pojazdu\n- Zwrotu pojazdu w tym samym stanie\n- Natychmiastowego zgłaszania uszkodzeń\n- Przestrzegania przepisów ruchu drogowego'
        },
        {
          title: '5. Ubezpieczenie i Odpowiedzialność',
          content: 'Nasza polisa ubezpieczeniowa obejmuje:\n- Podstawowe ubezpieczenie OC\n- Opcje ubezpieczenia od uszkodzeń\n- Ubezpieczenie następstw nieszczęśliwych wypadków\n- Dodatkowe opcje ubezpieczenia'
        },
        {
          title: '6. Modyfikacje',
          content: 'Zastrzegamy sobie prawo do modyfikacji niniejszego regulaminu w dowolnym momencie. Dalsze korzystanie z naszych usług po wprowadzeniu zmian oznacza akceptację nowych warunków.'
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <BackButton lang={lang} />
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            {content[lang].title}
          </h1>
          <p className="text-gray-600 mb-8">
            {content[lang].lastUpdated}
          </p>

          {content[lang].sections.map((section, index) => (
            <MotionDiv
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">
                {section.title}
              </h2>
              <div className="prose prose-blue max-w-none">
                {section.content.split('\\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700 mb-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </MotionDiv>
          ))}
        </MotionDiv>
      </div>
    </div>
  );
} 