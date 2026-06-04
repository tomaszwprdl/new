import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';
import LegalContent, { LegalSection } from '@/components/LegalContent';

export const metadata: Metadata = {
  title: 'Cookies Policy - NowRent',
  description: 'Cookies Policy for NowRent car rental service'
};

export function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }];
}

type LegalCopy = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function CookiePolicy({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  if (lang !== 'pl' && lang !== 'en') {
    notFound();
  }

  const content: Record<'en' | 'pl', LegalCopy> = {
    en: {
      title: 'Cookies Policy',
      lastUpdated: 'Last updated: June 2026',
      sections: [
        {
          title: '1. What cookies are',
          content:
            'Cookies are small files stored on your device by a website. They may help the website work correctly or remember simple settings, such as language preference.'
        },
        {
          title: '2. What cookies we use',
          content:
            'The website may use cookies or similar technologies needed for the website to work and to remember basic user settings, such as your selected language. We do not use analytics, marketing or payment cookies on this website.'
        },
        {
          title: '3. External services',
          content:
            'The website may include links to external services such as Facebook or WhatsApp. When you click those links, the privacy and cookie rules of that service apply.'
        },
        {
          title: '4. Managing cookies',
          content:
            'You can control or delete cookies in your browser settings. Limiting cookies may affect some website features, such as remembering the selected language.'
        },
        {
          title: '5. Changes to this policy',
          content:
            'This cookies policy may be updated. The current version is available on nowrent.eu.'
        }
      ]
    },
    pl: {
      title: 'Polityka cookies',
      lastUpdated: 'Ostatnia aktualizacja: czerwiec 2026',
      sections: [
        {
          title: '1. Czym są pliki cookies',
          content:
            'Cookies to małe pliki zapisywane na Twoim urządzeniu przez stronę internetową. Mogą pomagać w prawidłowym działaniu strony lub zapamiętywaniu prostych ustawień, takich jak preferencje języka.'
        },
        {
          title: '2. Jakich cookies używamy',
          content:
            'Strona może używać cookies lub podobnych technologii potrzebnych do działania strony oraz zapamiętania podstawowych ustawień użytkownika, takich jak wybrany język. Nie używamy na tej stronie cookies analitycznych, marketingowych ani płatniczych.'
        },
        {
          title: '3. Cookies zewnętrzne',
          content:
            'Na stronie mogą znajdować się linki do zewnętrznych serwisów, takich jak Facebook lub WhatsApp. Po kliknięciu takiego linku obowiązują zasady prywatności i cookies danego serwisu.'
        },
        {
          title: '4. Zarządzanie cookies',
          content:
            'Możesz kontrolować lub usuwać cookies w ustawieniach swojej przeglądarki. Ograniczenie cookies może wpłynąć na niektóre funkcje strony, na przykład zapamiętanie wybranego języka.'
        },
        {
          title: '5. Zmiany polityki',
          content:
            'Polityka cookies może być aktualizowana. Aktualna wersja jest dostępna na stronie nowrent.eu.'
        }
      ]
    }
  };

  const copy = content[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D1B33] to-[#1A2B49] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <BackButton lang={lang} tone="light" />
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FBFAF7] rounded-2xl shadow-xl p-6 sm:p-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2B49] mb-2">
            {copy.title}
          </h1>
          <p className="text-slate-500 text-sm mb-8">{copy.lastUpdated}</p>
          <LegalContent sections={copy.sections} />
        </MotionDiv>
      </div>
    </div>
  );
}
