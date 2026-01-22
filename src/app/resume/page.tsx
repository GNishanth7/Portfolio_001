'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ArcadeButton from '@/components/arcade/ArcadeButton';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="font-arcade text-2xl md:text-3xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            MY RESUME
          </h1>
          <p className="font-readable text-gray-400 mt-2">
            View or download my CV
          </p>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-6 relative"
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg z-10">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="text-4xl mb-2"
                >
                  ⏳
                </motion.div>
                <p className="font-arcade text-sm text-cyan-400">Loading...</p>
              </div>
            </div>
          )}
          
          <iframe
            src="/resume.pdf"
            className="w-full h-[70vh] rounded-lg bg-white"
            onLoad={() => setIsLoading(false)}
            title="Resume PDF Viewer"
          />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/profile">
            <ArcadeButton variant="secondary" size="sm">
              👤 PROFILE
            </ArcadeButton>
          </Link>
          <Link href="/select">
            <ArcadeButton variant="primary" size="sm">
              🎮 PROJECTS
            </ArcadeButton>
          </Link>
          <Link href="/contact">
            <ArcadeButton variant="secondary" size="sm">
              📬 CONTACT
            </ArcadeButton>
          </Link>
        </motion.div>

        {/* Tip */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
          className="text-center font-readable text-sm text-gray-500 mt-6"
        >
          💡 Use the viewer controls to download or print
        </motion.p>
      </div>
    </div>
  );
}
