'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAudio } from '@/hooks/useAudio';

interface PixelNavProps {
  className?: string;
}

export default function PixelNav({ className = '' }: PixelNavProps) {
  const { playSound, toggleMute, isMuted } = useAudio();

  const navItems = [
    { label: 'LOBBY', href: '/', icon: '🏠' },
    { label: 'PLAY', href: '/play', icon: '🕹️' },
    { label: 'SELECT', href: '/select', icon: '🎮' },
    { label: 'PROFILE', href: '/profile', icon: '👤' },
    { label: 'CONTACT', href: '/contact', icon: '📬' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div 
        className="bg-gray-900/95 border-b-4 border-cyan-500 backdrop-blur-sm"
        style={{
          boxShadow: '0 4px 20px rgba(0, 255, 255, 0.2)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" onClick={() => playSound('select')}>
              <motion.div
                className="font-arcade text-sm md:text-base text-cyan-400"
                whileHover={{ scale: 1.05 }}
                style={{
                  textShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
                }}
              >
                ARCADE<span className="text-yellow-400">FOLIO</span>
              </motion.div>
            </Link>

            {/* Navigation items */}
            <div className="flex items-center gap-2 md:gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.button
                    onClick={() => playSound('select')}
                    onMouseEnter={() => playSound('hover')}
                    className="font-arcade text-[10px] md:text-xs px-2 md:px-4 py-2 
                      text-gray-300 hover:text-cyan-400 transition-colors
                      border-2 border-transparent hover:border-cyan-500/50 rounded"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                  >
                    <span className="hidden md:inline mr-1">{item.icon}</span>
                    {item.label}
                  </motion.button>
                </Link>
              ))}

              {/* Sound toggle */}
              <motion.button
                onClick={() => {
                  toggleMute();
                  playSound('select');
                }}
                className={`font-arcade text-xs px-3 py-2 rounded border-2
                  ${isMuted 
                    ? 'border-red-500 text-red-400' 
                    : 'border-green-500 text-green-400'
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? '🔇' : '🔊'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative pixel line */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
    </nav>
  );
}
