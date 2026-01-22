'use client';

import { motion } from 'framer-motion';

interface LoadingBarProps {
  progress?: number;
  text?: string;
  onComplete?: () => void;
  autoProgress?: boolean;
  duration?: number;
}

export default function LoadingBar({
  progress: externalProgress,
  text = 'LOADING',
  onComplete,
  autoProgress = true,
  duration = 2
}: LoadingBarProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Loading text with blinking effect */}
      <motion.div
        className="font-arcade text-cyan-400 text-lg"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        style={{
          textShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
        }}
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ...
        </motion.span>
      </motion.div>

      {/* Progress bar container */}
      <div className="relative w-64 h-6 bg-gray-900 border-4 border-gray-600 rounded">
        {/* Pixel-style progress bar */}
        <motion.div
          className="absolute inset-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500"
          initial={{ width: '0%' }}
          animate={{ width: autoProgress ? '100%' : `${externalProgress}%` }}
          transition={autoProgress ? { duration, ease: 'linear' } : undefined}
          onAnimationComplete={autoProgress ? onComplete : undefined}
          style={{
            backgroundSize: '8px 8px',
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
          }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Pixel grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '4px 4px'
          }}
        />
      </div>

      {/* Pixel art decoration */}
      <div className="flex gap-2 mt-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-cyan-400"
            animate={{
              y: [0, -8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
            style={{
              boxShadow: '0 0 5px rgba(0, 255, 255, 0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
