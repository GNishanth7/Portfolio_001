'use client';

import { ReactNode } from 'react';
import { AudioProvider } from '@/hooks/useAudio';
import PixelNav from '@/components/layout/PixelNav';
import KonamiEasterEgg from '@/components/effects/KonamiEasterEgg';
import ParticleBackground from '@/components/effects/ParticleBackground';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <ParticleBackground />
      <KonamiEasterEgg />
      <PixelNav />
      <main className="pt-16 relative z-10">
        {children}
      </main>
    </AudioProvider>
  );
}
