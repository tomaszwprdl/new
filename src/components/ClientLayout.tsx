'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import MobileOptimizations from '@/components/MobileOptimizations';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Start loading immediately
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, isMobile ? 2000 : 3500);

    return () => clearTimeout(timer);
  }, [isMobile]);

  if (isMobile) {
    // On mobile, skip loading screen and show main layout immediately
    return (
      <>
        <MobileOptimizations />
        <Header />
        <MobileNavigation />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </>
    );
  }

  if (!isLoading) {
    return (
      <>
        <MobileOptimizations />
        <Header />
        <MobileNavigation />
        <main className="min-h-screen bg-white">
          {children}
        </main>
      </>
    );
  }

  return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
} 