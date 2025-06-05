import { Metadata } from 'next';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Privacy Policy - NowRent',
  description: 'Privacy Policy for NowRent car rental service'
};

export default function PrivacyPolicy({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 20, 2024',
      sections: [
        {
          title: '1. Introduction',
          content: 'This Privacy Policy describes how NowRent ("we," "us," or "our") collects, uses, and shares your personal information when you use our car rental services and website.'
        },
        {
          title: '2. Information We Collect',
          content: 'We collect information that you provide directly to us, including:\n- Name and contact information\n- Driver\'s license details\n- Payment information\n- Rental preferences and history\n- Communication records'
        },
        {
          title: '3. How We Use Your Information',
          content: 'We use your information to:\n- Process your rental reservations\n- Communicate with you about your rentals\n- Improve our services\n- Comply with legal obligations\n- Send promotional materials (with your consent)'
        },
        {
          title: '4. Information Sharing',
          content: 'We may share your information with:\n- Service providers\n- Legal authorities when required\n- Insurance companies when necessary\n- Business partners with your consent'
        },
        {
          title: '5. Your Rights',
          content: 'You have the right to:\n- Access your personal data\n- Correct inaccurate data\n- Request deletion of your data\n- Object to data processing\n- Data portability'
        },
        {
          title: '6. Contact Us',
          content: 'For any privacy-related questions, please contact us at: nowrentes@gmail.com'
        }
      ]
    },
    pl: {
      title: 'Polityka Prywatności',
      lastUpdated: 'Ostatnia aktualizacja: 20 lutego 2024',
      sections: [
        {
          title: '1. Wprowadzenie',
          content: 'Niniejsza Polityka Prywatności opisuje, w jaki sposób NowRent ("my" lub "nas") zbiera, wykorzystuje i udostępnia Twoje dane osobowe podczas korzystania z naszych usług wynajmu samochodów i strony internetowej.'
        },
        {
          title: '2. Zbierane Informacje',
          content: 'Zbieramy informacje, które przekazujesz nam bezpośrednio, w tym:\n- Imię, nazwisko i dane kontaktowe\n- Dane prawa jazdy\n- Informacje o płatnościach\n- Preferencje i historię wynajmu\n- Zapisy komunikacji'
        },
        {
          title: '3. Jak Wykorzystujemy Twoje Informacje',
          content: 'Wykorzystujemy Twoje informacje do:\n- Przetwarzania rezerwacji wynajmu\n- Komunikacji w sprawie wynajmu\n- Doskonalenia naszych usług\n- Spełnienia wymogów prawnych\n- Wysyłania materiałów promocyjnych (za Twoją zgodą)'
        },
        {
          title: '4. Udostępnianie Informacji',
          content: 'Możemy udostępniać Twoje informacje:\n- Dostawcom usług\n- Organom prawnym, gdy jest to wymagane\n- Firmom ubezpieczeniowym w razie potrzeby\n- Partnerom biznesowym za Twoją zgodą'
        },
        {
          title: '5. Twoje Prawa',
          content: 'Masz prawo do:\n- Dostępu do swoich danych osobowych\n- Poprawiania niedokładnych danych\n- Żądania usunięcia swoich danych\n- Sprzeciwu wobec przetwarzania danych\n- Przenoszenia danych'
        },
        {
          title: '6. Kontakt',
          content: 'W przypadku pytań dotyczących prywatności, prosimy o kontakt: nowrentes@gmail.com'
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