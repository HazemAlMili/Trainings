import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * FadeIn Component
 * Reveals content smoothly when scrolled into view.
 */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  distance = 24,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
      case 'none':
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer
 * Coordinates staggered reveals of multiple children
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.08, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
}> = ({ children, className = '', distance = 20 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: 'easeOut' },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FloatingBadge
 * Gentle continuous floating motion for decorative language and trust chips
 */
interface FloatingBadgeProps {
  children: React.ReactNode;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  delay?: number;
  className?: string;
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  children,
  duration = 4,
  yOffset = 8,
  xOffset = 4,
  delay = 0,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset, -yOffset],
        x: [-xOffset, xOffset, -xOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * InteractiveHoverCard
 * Lifts and glows smoothly on hover, gives tactile feedback on tap
 */
export const InteractiveHoverCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  liftY?: number;
}> = ({ children, className = '', onClick, liftY = -5 }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: liftY, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * PulseBeacon
 * Subtle glowing radar ring for live status items ("متاح الآن", "حصة حية")
 */
export const PulseBeacon: React.FC<{ color?: string; size?: number }> = ({
  color = '#118F86',
  size = 8,
}) => {
  return (
    <span className="relative flex items-center justify-center shrink-0" style={{ width: size * 2, height: size * 2 }}>
      <motion.span
        animate={{ scale: [1, 2], opacity: [0.8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        className="absolute rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
      <span
        className="relative rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </span>
  );
};
