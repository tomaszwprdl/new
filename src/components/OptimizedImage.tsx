import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
  objectFit = 'cover',
  objectPosition = 'center',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {error ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image not available</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          quality={quality}
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
          onError={() => setError(true)}
        />
      )}
    </div>
  );
} 