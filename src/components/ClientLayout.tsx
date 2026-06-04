'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import MobileNavigation from '@/components/MobileNavigation';
import MobileOptimizations from '@/components/MobileOptimizations';

const LOADING_SESSION_KEY = 'nowrent-loading-seen';
const LOADING_DURATION_MS = 1000;

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const updateMobile = () => setIsMobile(mobileQuery.matches);

    updateMobile();
    setHasMounted(true);
    mobileQuery.addEventListener('change', updateMobile);

    return () => mobileQuery.removeEventListener('change', updateMobile);
  }, []);

  useEffect(() => {
    if (!hasMounted || isMobile) return;

    try {
      if (sessionStorage.getItem(LOADING_SESSION_KEY)) return;
    } catch {
      // sessionStorage unavailable — show overlay once this visit
    }

    setShowLoadingOverlay(true);
    const timer = setTimeout(() => {
      setShowLoadingOverlay(false);
      try {
        sessionStorage.setItem(LOADING_SESSION_KEY, '1');
      } catch {
        // ignore
      }
    }, LOADING_DURATION_MS);

    return () => clearTimeout(timer);
  }, [hasMounted, isMobile]);

  return (
    <>
      <MobileOptimizations />
      <Header />
      <MobileNavigation />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      {showLoadingOverlay && <LoadingScreen />}
    </>
  );
}
