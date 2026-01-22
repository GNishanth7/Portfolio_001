'use client';

import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

interface ArcadeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  glowing?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: {
    bg: 'bg-cyan-500',
    border: 'border-cyan-300',
    shadow: 'shadow-cyan-500/50',
    glow: 'cyan',
    hoverBg: 'hover:bg-cyan-400'
  },
  secondary: {
    bg: 'bg-purple-500',
    border: 'border-purple-300',
    shadow: 'shadow-purple-500/50',
    glow: 'purple',
    hoverBg: 'hover:bg-purple-400'
  },
  danger: {
    bg: 'bg-red-500',
    border: 'border-red-300',
    shadow: 'shadow-red-500/50',
    glow: 'red',
    hoverBg: 'hover:bg-red-400'
  },
  success: {
    bg: 'bg-green-500',
    border: 'border-green-300',
    shadow: 'shadow-green-500/50',
    glow: 'green',
    hoverBg: 'hover:bg-green-400'
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base'
};

export default function ArcadeButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  glowing = false,
  type = 'button'
}: ArcadeButtonProps) {
  const { playSound } = useAudio();
  const styles = variantStyles[variant];
  
  const handleClick = () => {
    if (!disabled) {
      playSound('confirm');
      onClick?.();
    }
  };

  const handleHover = () => {
    if (!disabled) {
      playSound('hover');
    }
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      className={`
        relative font-arcade uppercase tracking-wider
        ${styles.bg} ${styles.border} ${styles.hoverBg}
        ${sizeStyles[size]}
        border-4 rounded-lg
        text-white font-bold
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95, y: 2 } : {}}
      animate={glowing ? {
        boxShadow: [
          `0 0 10px var(--${styles.glow}-glow), 0 0 20px var(--${styles.glow}-glow), 0 0 30px var(--${styles.glow}-glow)`,
          `0 0 20px var(--${styles.glow}-glow), 0 0 40px var(--${styles.glow}-glow), 0 0 60px var(--${styles.glow}-glow)`,
          `0 0 10px var(--${styles.glow}-glow), 0 0 20px var(--${styles.glow}-glow), 0 0 30px var(--${styles.glow}-glow)`
        ]
      } : {}}
      transition={glowing ? {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      } : {}}
      style={{
        textShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        boxShadow: `
          0 4px 0 0 rgba(0,0,0,0.3),
          0 6px 10px 0 rgba(0,0,0,0.3),
          inset 0 -4px 0 0 rgba(0,0,0,0.2),
          inset 0 4px 0 0 rgba(255,255,255,0.2)
        `
      }}
    >
      {/* Button highlight effect */}
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-md" />
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
