'use client';

import { motion } from 'framer-motion';

interface PixelAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

// Simple pixel art avatar design
const pixelPattern = [
  [0,0,0,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,0],
  [1,1,2,2,1,1,2,2,1,1],
  [1,1,2,3,1,1,2,3,1,1],
  [1,1,1,1,1,1,1,1,1,1],
  [1,1,1,4,4,4,4,1,1,1],
  [0,1,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,1,0,0],
  [0,0,0,5,5,5,5,0,0,0],
];

const colors: Record<number, string> = {
  0: 'transparent',
  1: '#ffdbac', // skin
  2: '#ffffff', // eye white
  3: '#1a1a2e', // eye pupil
  4: '#ff6b6b', // mouth
  5: '#4361ee', // shirt
};

export default function PixelAvatar({ 
  size = 'md', 
  className = '',
  animated = true 
}: PixelAvatarProps) {
  const pixelSize = size === 'xl' ? 5 : size === 'lg' ? 4 : size === 'md' ? 3 : 2;

  return (
    <motion.div
      className={`relative ${sizeMap[size]} ${className}`}
      animate={animated ? {
        y: [0, -4, 0]
      } : {}}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)'
        }}
      />

      {/* Pixel grid */}
      <div 
        className="relative bg-gray-900 rounded-lg p-2 border-4 border-cyan-500 overflow-hidden"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {pixelPattern.map((row, y) => (
            <div key={y} className="flex">
              {row.map((pixel, x) => (
                <motion.div
                  key={`${x}-${y}`}
                  style={{
                    width: pixelSize,
                    height: pixelSize,
                    backgroundColor: colors[pixel],
                  }}
                  animate={animated && pixel !== 0 ? {
                    opacity: [0.9, 1, 0.9]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: (x + y) * 0.05
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Scanline overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.1) 2px,
              rgba(0, 0, 0, 0.1) 4px
            )`
          }}
        />
      </div>
    </motion.div>
  );
}
