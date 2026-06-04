import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';
import LegalContent, { LegalSection } from '@/components/LegalContent';

export const metadata: Metadata = {
  title: 'Privacy Policy - NowRent',
  description: 'Privacy Policy for NowRent car rental service'
};

export function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }];
}

type LegalCopy = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function PrivacyPolicy({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  if (lang !== 'pl' && lang !== 'en') {
    notFound();
  }

  const content: Record<'en' | 'pl', LegalCopy> = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: June 2026',
      sections: [
        {
          title: '1. Who processes your data',
          content:
            'This policy explains how NowRent processes personal data of people using nowrent.eu or contacting us about car rental.'
        },
        {
          title: '2. What data we may collect',
          content:
            'We may collect information you voluntarily provide through the form, WhatsApp, phone, email or Facebook, including:\n- full name\n- phone number\n- email address, if provided\n- pickup and return dates and locations\n- preferred car class\n- additional information included in your message\n- information needed to prepare the rental, such as ID and driving licence details, if required at the booking stage'
        },
        {
          title: '3. Why we use your data',
          content:
            'We use your data to:\n- reply to your request\n- check car availability\n- prepare a quote and rental terms\n- contact you before, during and after the rental\n- manage your booking and provide the service\n- comply with legal obligations, where applicable'
        },
        {
          title: '4. Legal basis',
          content:
            'We process data when it is necessary to reply to your request, prepare or provide the rental service, comply with legal obligations, or based on our legitimate interest in customer service and service security.'
        },
        {
          title: '5. Who we may share data with',
          content:
            'Data may be shared only when needed to provide the rental service, for example with technical service providers, insurance providers, roadside assistance, accounting providers or public authorities when required by law.'
        },
        {
          title: '6. How long we keep data',
          content:
            'We keep data only for as long as needed to handle your request, booking, rental, accounting, legal obligations or protection against claims.'
        },
        {
          title: '7. Your rights',
          content:
            'You have the right to access, correct, delete, restrict processing, transfer your data and object where applicable law gives you that right.'
        },
        {
          title: '8. Contact',
          content: 'For personal data matters, contact us at:\nnowrentes@gmail.com'
        }
      ]
    },
    pl: {
      title: 'Polityka prywatności',
      lastUpdated: 'Ostatnia aktualizacja: czerwiec 2026',
      sections: [
        {
          title: '1. Kto przetwarza dane',
          content:
            'Ta polityka opisuje, jak NowRent przetwarza dane osobowe osób korzystających ze strony nowrent.eu oraz kontaktujących się w sprawie wynajmu auta.'
        },
        {
          title: '2. Jakie dane możemy zbierać',
          content:
            'Możemy zbierać dane, które przekazujesz dobrowolnie przez formularz, WhatsApp, telefon, email lub Facebook, w szczególności:\n- imię i nazwisko\n- numer telefonu\n- adres email, jeśli go podasz\n- daty i miejsce odbioru oraz zwrotu auta\n- preferowaną klasę auta\n- dodatkowe informacje podane w wiadomości\n- dane potrzebne do przygotowania wynajmu, takie jak dokument tożsamości i prawo jazdy, jeśli są wymagane na etapie rezerwacji'
        },
        {
          title: '3. W jakim celu używamy danych',
          content:
            'Dane wykorzystujemy do:\n- odpowiedzi na zapytanie\n- sprawdzenia dostępności auta\n- przygotowania wyceny i warunków wynajmu\n- kontaktu przed, w trakcie i po wynajmie\n- obsługi rezerwacji i realizacji usługi\n- spełnienia obowiązków prawnych, jeśli mają zastosowanie'
        },
        {
          title: '4. Podstawa przetwarzania',
          content:
            'Dane przetwarzamy, gdy jest to potrzebne do odpowiedzi na Twoje zapytanie, przygotowania lub wykonania usługi wynajmu, spełnienia obowiązków prawnych albo na podstawie naszego uzasadnionego interesu związanego z obsługą klienta i bezpieczeństwem usługi.'
        },
        {
          title: '5. Komu możemy przekazywać dane',
          content:
            'Dane mogą być przekazywane tylko wtedy, gdy jest to potrzebne do obsługi wynajmu, na przykład dostawcom usług technicznych, firmom ubezpieczeniowym, pomocy drogowej, podmiotom księgowym lub organom publicznym, jeśli wymagają tego przepisy.'
        },
        {
          title: '6. Jak długo przechowujemy dane',
          content:
            'Dane przechowujemy tylko tak długo, jak jest to potrzebne do obsługi zapytania, rezerwacji, wynajmu, rozliczeń, obowiązków prawnych lub ochrony przed roszczeniami.'
        },
        {
          title: '7. Twoje prawa',
          content:
            'Masz prawo do dostępu do swoich danych, ich poprawienia, usunięcia, ograniczenia przetwarzania, przeniesienia danych oraz wniesienia sprzeciwu, jeśli przepisy dają Ci takie prawo.'
        },
        {
          title: '8. Kontakt',
          content:
            'W sprawach dotyczących danych osobowych możesz skontaktować się z nami:\nnowrentes@gmail.com'
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
