import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MotionDiv } from '@/components/MotionDiv';
import BackButton from '@/components/BackButton';
import LegalContent, { LegalSection } from '@/components/LegalContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions - NowRent',
  description: 'Terms and Conditions for NowRent car rental service'
};

export function generateStaticParams() {
  return [{ lang: 'pl' }, { lang: 'en' }];
}

type LegalCopy = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function Terms({ params: { lang } }: { params: { lang: 'en' | 'pl' } }) {
  if (lang !== 'pl' && lang !== 'en') {
    notFound();
  }

  const content: Record<'en' | 'pl', LegalCopy> = {
    en: {
      title: 'Terms and Conditions',
      lastUpdated: 'Last updated: June 2026',
      sections: [
        {
          title: '1. Service scope',
          content:
            'NowRent offers local car rental around Alicante Airport, Torrevieja, Costa Blanca and other agreed locations within Spain.'
        },
        {
          title: '2. Request and booking',
          content:
            'Submitting a form, WhatsApp message, email or phone request does not create an automatic booking. A booking is confirmed only after car availability, price, dates, pickup location and rental terms are agreed.'
        },
        {
          title: '3. Car availability',
          content:
            'The fleet changes depending on availability. Photos on the website show example car classes, not guaranteed exact models. We confirm the exact available car before booking.'
        },
        {
          title: '4. Deposit and credit card',
          content:
            'As standard, we do not take a deposit and do not require a credit card. The customer pays for the agreed rental according to the confirmed terms.'
        },
        {
          title: '5. Insurance',
          content:
            'Full insurance is included in the rental price. The scope of cover, rules for using the car and possible exclusions are explained before booking confirmation.'
        },
        {
          title: '6. Pickup and return',
          content:
            'Pickup and return place and time are agreed individually. Pickup may be arranged at Alicante Airport, at an apartment or another agreed location.'
        },
        {
          title: '7. Use of the car',
          content:
            'The customer must use the car legally, safely and according to the agreed rental terms. The car must not be used for illegal activity, racing, carrying dangerous materials or any use contrary to the agreement.'
        },
        {
          title: '8. Mileage and travel',
          content:
            'Mileage is unlimited inside Spain unless agreed otherwise. Taking the car outside Spain is not allowed as standard and requires prior approval.'
        },
        {
          title: '9. Breakdown, damage or accident',
          content:
            'In case of breakdown, damage or accident, the customer should contact NowRent immediately and follow the instructions provided. We help step by step with the next actions.'
        },
        {
          title: '10. Cancellation or changes',
          content:
            'Booking changes or cancellations are handled individually. Conditions depend on the dates, car availability and prior arrangements.'
        },
        {
          title: '11. Changes to these terms',
          content:
            'These terms may be updated. The current version is available on nowrent.eu.'
        }
      ]
    },
    pl: {
      title: 'Regulamin',
      lastUpdated: 'Ostatnia aktualizacja: czerwiec 2026',
      sections: [
        {
          title: '1. Zakres usługi',
          content:
            'NowRent oferuje lokalny wynajem aut w okolicach Lotniska Alicante, Torrevieja, Costa Blanca i innych uzgodnionych lokalizacji na terenie Hiszpanii.'
        },
        {
          title: '2. Zapytanie i rezerwacja',
          content:
            'Wysłanie formularza, wiadomości WhatsApp, emaila lub kontakt telefoniczny nie oznacza automatycznej rezerwacji. Rezerwacja jest potwierdzona dopiero po ustaleniu dostępności auta, ceny, terminu, miejsca odbioru i warunków wynajmu.'
        },
        {
          title: '3. Dostępność aut',
          content:
            'Flota zmienia się w zależności od dostępności. Zdjęcia na stronie pokazują przykładowe klasy aut, a nie gwarantowane konkretne modele. Dokładne dostępne auto potwierdzamy przed rezerwacją.'
        },
        {
          title: '4. Kaucja i karta kredytowa',
          content:
            'Standardowo nie pobieramy kaucji i nie wymagamy karty kredytowej. Klient płaci za uzgodniony wynajem zgodnie z potwierdzonymi warunkami.'
        },
        {
          title: '5. Ubezpieczenie',
          content:
            'Pełne ubezpieczenie jest w cenie wynajmu. Zakres ochrony, zasady użytkowania auta i ewentualne wyłączenia wyjaśniamy przed potwierdzeniem rezerwacji.'
        },
        {
          title: '6. Odbiór i zwrot auta',
          content:
            'Miejsce oraz godzina odbioru i zwrotu auta są ustalane indywidualnie. Możliwy jest odbiór na Lotnisku Alicante, pod apartamentem lub w innym uzgodnionym miejscu.'
        },
        {
          title: '7. Korzystanie z auta',
          content:
            'Klient zobowiązuje się używać auta zgodnie z prawem, warunkami wynajmu i zasadami bezpieczeństwa. Auto nie może być wykorzystywane do działań nielegalnych, wyścigów, przewozu niebezpiecznych materiałów ani innych działań sprzecznych z ustaleniami.'
        },
        {
          title: '8. Kilometry i podróże',
          content:
            'Na terenie Hiszpanii obowiązuje brak limitu kilometrów, o ile nie ustalono inaczej. Wyjazd poza Hiszpanię nie jest standardowo dozwolony i wymaga wcześniejszej zgody.'
        },
        {
          title: '9. Awaria, szkoda lub wypadek',
          content:
            'W przypadku awarii, szkody lub wypadku klient powinien skontaktować się z NowRent od razu i postępować zgodnie z instrukcjami. Pomagamy krok po kroku w organizacji dalszych działań.'
        },
        {
          title: '10. Anulowanie lub zmiana rezerwacji',
          content:
            'Zmiany lub anulowanie rezerwacji ustalamy indywidualnie. Warunki zależą od terminu, dostępności auta i wcześniejszych ustaleń.'
        },
        {
          title: '11. Zmiany regulaminu',
          content:
            'Regulamin może być aktualizowany. Aktualna wersja jest dostępna na stronie nowrent.eu.'
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
