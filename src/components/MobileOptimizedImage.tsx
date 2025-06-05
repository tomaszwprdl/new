import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MobileOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export default function MobileOptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  quality = 75,
  objectFit = 'cover',
  objectPosition = 'center',
}: MobileOptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-specific sizes
  const mobileSizes = fill ? '100vw' : `
    (max-width: 640px) 100vw,
    (max-width: 768px) 75vw,
    50vw
  `;

  // Adjust quality for mobile
  const adjustedQuality = isMobile ? Math.min(quality, 60) : quality;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={mobileSizes}
        quality={adjustedQuality}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
          ${objectFit === 'cover' ? 'object-cover' : 
            objectFit === 'contain' ? 'object-contain' :
            objectFit === 'fill' ? 'object-fill' :
            objectFit === 'none' ? 'object-none' :
            'object-scale-down'}
        `}
        style={{ objectPosition }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
} 