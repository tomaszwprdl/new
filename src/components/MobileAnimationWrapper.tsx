import { motion, MotionProps } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MobileAnimationWrapperProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  reducedMotion?: boolean;
}

export default function MobileAnimationWrapper({
  children,
  className = '',
  reducedMotion = false,
  ...props
}: MobileAnimationWrapperProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce animation complexity on mobile
  const mobileProps = isMobile ? {
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    },
    ...(reducedMotion && {
      animate: { opacity: 1 },
      initial: { opacity: 0 }
    })
  } : {};

  return (
    <motion.div
      className={className}
      {...props}
      {...mobileProps}
    >
      {children}
    </motion.div>
  );
} 