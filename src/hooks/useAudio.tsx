'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Howl } from 'howler';

interface AudioContextType {
  playSound: (sound: SoundType) => void;
  toggleMute: () => void;
  isMuted: boolean;
  setVolume: (volume: number) => void;
  volume: number;
}

type SoundType = 'coin' | 'select' | 'confirm' | 'back' | 'hover' | 'start' | 'achievement';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Sound effects as base64 encoded beep sounds (placeholder - replace with actual audio files)
const soundUrls: Record<SoundType, string> = {
  coin: '/sounds/coin.mp3',
  select: '/sounds/select.mp3',
  confirm: '/sounds/confirm.mp3',
  back: '/sounds/back.mp3',
  hover: '/sounds/hover.mp3',
  start: '/sounds/start.mp3',
  achievement: '/sounds/achievement.mp3',
};

// Create a silent/minimal sound as fallback when audio files are missing
const createFallbackSound = (): Howl | null => {
  // Return null - we'll handle missing sounds gracefully
  return null;
};

const sounds: Partial<Record<SoundType, Howl | null>> = {};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  const initSound = useCallback((soundType: SoundType) => {
    if (!sounds[soundType]) {
      try {
        sounds[soundType] = new Howl({
          src: [soundUrls[soundType]],
          volume: volume,
          onloaderror: () => {
            // Silently fail if sound file not found
            console.warn(`Sound file not found: ${soundUrls[soundType]}`);
            sounds[soundType] = null;
          }
        });
      } catch {
        sounds[soundType] = null;
      }
    }
    return sounds[soundType];
  }, [volume]);

  const playSound = useCallback((soundType: SoundType) => {
    if (isMuted) return;
    
    const sound = initSound(soundType);
    if (sound) {
      sound.volume(volume);
      sound.play();
    }
  }, [isMuted, volume, initSound]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume);
    Object.values(sounds).forEach(sound => {
      if (sound) sound.volume(newVolume);
    });
  }, []);

  return (
    <AudioContext.Provider value={{ playSound, toggleMute, isMuted, setVolume, volume }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    // Return a no-op version for SSR
    return {
      playSound: () => {},
      toggleMute: () => {},
      isMuted: false,
      setVolume: () => {},
      volume: 0.5
    };
  }
  return context;
}
