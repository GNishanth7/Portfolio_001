'use client';

import { useEffect, useState, useCallback } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA'
];

export function useKonamiCode(callback?: () => void) {
  const [index, setIndex] = useState(0);
  const [isActivated, setIsActivated] = useState(false);

  const reset = useCallback(() => {
    setIndex(0);
    setIsActivated(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedKey = KONAMI_CODE[index];
      
      if (event.code === expectedKey) {
        const newIndex = index + 1;
        
        if (newIndex === KONAMI_CODE.length) {
          setIsActivated(true);
          setIndex(0);
          callback?.();
        } else {
          setIndex(newIndex);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, callback]);

  return { isActivated, reset };
}
