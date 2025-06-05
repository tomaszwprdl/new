import { Metadata } from 'next';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Cookie Policy - NowRent',
  description: 'Cookie Policy for NowRent car rental service'
};

export default function CookiePolicy({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  const content = {
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: February 20, 2024',
      sections: [
        {
          title: '1. What Are Cookies',
          content: 'Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.'
        },
        {
          title: '2. Types of Cookies We Use',
          content: 'We use the following types of cookies:\n- Essential cookies: Required for basic site functionality\n- Analytics cookies: Help us understand how visitors use our site\n- Preference cookies: Remember your settings and choices\n- Marketing cookies: Used to deliver relevant advertisements'
        },
        {
          title: '3. How We Use Cookies',
          content: 'We use cookies to:\n- Keep you signed in\n- Remember your language preferences\n- Understand how you use our website\n- Improve our services\n- Provide personalized content'
        },
        {
          title: '4. Managing Cookies',
          content: 'You can control cookies through your browser settings. You can:\n- Block all cookies\n- Delete existing cookies\n- Allow only certain types of cookies\n- Set preferences for different websites'
        },
        {
          title: '5. Third-Party Cookies',
          content: 'Some cookies are placed by third-party services that appear on our pages. We use these for:\n- Social media integration\n- Analytics services\n- Payment processing\n- Marketing purposes'
        },
        {
          title: '6. Updates to This Policy',
          content: 'We may update this Cookie Policy periodically. Please check back regularly to stay informed about our use of cookies.'
        }
      ]
    },
    pl: {
      title: 'Polityka Cookies',
      lastUpdated: 'Ostatnia aktualizacja: 20 lutego 2024',
      sections: [
        {
          title: '1. Czym są Pliki Cookie',
          content: 'Pliki cookie to małe pliki tekstowe przechowywane na Twoim komputerze lub urządzeniu mobilnym podczas odwiedzania naszej strony. Pomagają nam zapewnić lepsze doświadczenia, zapamiętując Twoje preferencje i analizując sposób korzystania z naszej strony.'
        },
        {
          title: '2. Rodzaje Używanych Plików Cookie',
          content: 'Używamy następujących rodzajów plików cookie:\n- Niezbędne: Wymagane do podstawowego funkcjonowania strony\n- Analityczne: Pomagają zrozumieć, jak odwiedzający korzystają z naszej strony\n- Preferencyjne: Zapamiętują Twoje ustawienia i wybory\n- Marketingowe: Służą do wyświetlania odpowiednich reklam'
        },
        {
          title: '3. Jak Wykorzystujemy Pliki Cookie',
          content: 'Używamy plików cookie do:\n- Utrzymywania Twojego zalogowania\n- Zapamiętywania preferencji językowych\n- Zrozumienia, jak korzystasz z naszej strony\n- Ulepszania naszych usług\n- Dostarczania spersonalizowanych treści'
        },
        {
          title: '4. Zarządzanie Plikami Cookie',
          content: 'Możesz kontrolować pliki cookie poprzez ustawienia przeglądarki. Możesz:\n- Blokować wszystkie pliki cookie\n- Usuwać istniejące pliki cookie\n- Zezwalać tylko na określone typy plików cookie\n- Ustawiać preferencje dla różnych stron'
        },
        {
          title: '5. Pliki Cookie Stron Trzecich',
          content: 'Niektóre pliki cookie są umieszczane przez usługi stron trzecich. Używamy ich do:\n- Integracji z mediami społecznościowymi\n- Usług analitycznych\n- Przetwarzania płatności\n- Celów marketingowych'
        },
        {
          title: '6. Aktualizacje Polityki',
          content: 'Możemy okresowo aktualizować tę Politykę Cookie. Prosimy o regularne sprawdzanie, aby być na bieżąco z naszym wykorzystaniem plików cookie.'
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