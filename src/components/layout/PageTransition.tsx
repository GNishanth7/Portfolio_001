'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'brightness(2) saturate(0)'
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'brightness(1) saturate(1)'
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'brightness(0) saturate(0)'
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
} as const;

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
    >
      {/* CRT turn-on effect */}
      <motion.div
        initial={{ scaleY: 0.005, scaleX: 0.3 }}
        animate={{ scaleY: 1, scaleX: 1 }}
        exit={{ scaleY: 0.005, scaleX: 0.3 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="origin-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Scanline transition overlay
export function ScreenWipe({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black origin-left"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            style={{ width: '50%' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
