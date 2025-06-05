import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { DynamicOptionsLoadingProps } from 'next/dynamic';

interface MobileComponentLoaderProps {
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
  priority?: boolean;
  props?: Record<string, any>;
}

export default function MobileComponentLoader({
  component,
  fallback = null,
  priority = false,
  props = {}
}: MobileComponentLoaderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamically import component with loading strategy
  const DynamicComponent = dynamic(() => Promise.resolve(component), {
    loading: () => <>{fallback}</>,
    ssr: !isMobile || priority
  });

  useEffect(() => {
    if (isMobile && !priority) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
    }
  }, [isMobile, priority]);

  if (!isLoaded && isMobile && !priority) {
    return <>{fallback}</>;
  }

  return <DynamicComponent {...props} />;
} 