import dynamic from 'next/dynamic';

const HeroSection = dynamic(() => import('@/components/HeroSection'), { ssr: true });
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const CarCategories = dynamic(() => import('@/components/CarCategories'));
const ClientFeatures = dynamic(() => import('@/components/ClientFeatures'));
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'));
const DestinationsSection = dynamic(() => import('@/components/DestinationsSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const BookingForm = dynamic(() => import('@/components/BookingForm'));
const FAQSection = dynamic(() => import('@/components/FAQSection'));
const Footer = dynamic(() => import('@/components/Footer'));
const StickyBookButton = dynamic(() => import('@/components/StickyBookButton'));
const SurferAnimation = dynamic(() => import('@/components/SurferAnimation'));

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <SurferAnimation />
        <CarCategories />
        <HowItWorks />
        <ClientFeatures />
        <div className="relative">
          <TestimonialsSection />
          <DestinationsSection />
        </div>
        <AboutSection />
        <BookingForm />
        <FAQSection />
      </main>
      <Footer />
      <StickyBookButton />
    </>
  );
} 