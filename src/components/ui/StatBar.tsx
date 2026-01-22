'use client';

import { motion } from 'framer-motion';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatBar({ 
  label, 
  value, 
  maxValue, 
  color = '#00ffff',
  size = 'md' 
}: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-arcade text-[10px] md:text-xs text-gray-300">
          {label}
        </span>
        <span 
          className="font-arcade text-[10px] md:text-xs"
          style={{ color }}
        >
          {value}/{maxValue}
        </span>
      </div>
      
      <div className={`relative ${sizeClasses[size]} bg-gray-800 rounded overflow-hidden border border-gray-600`}>
        {/* Background segments */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 8px,
              rgba(0,0,0,0.3) 8px,
              rgba(0,0,0,0.3) 10px
            )`
          }}
        />
        
        {/* Progress bar */}
        <motion.div
          className="h-full rounded-sm relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}66, inset 0 -2px 0 rgba(0,0,0,0.3)`
          }}
        >
          {/* Shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"
            style={{ height: '50%' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
