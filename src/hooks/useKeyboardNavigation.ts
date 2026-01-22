'use client';

import { useEffect, useCallback, useState } from 'react';

type KeyHandler = () => void;

interface KeyBindings {
  ArrowLeft?: KeyHandler;
  ArrowRight?: KeyHandler;
  ArrowUp?: KeyHandler;
  ArrowDown?: KeyHandler;
  Enter?: KeyHandler;
  Escape?: KeyHandler;
  Space?: KeyHandler;
  KeyA?: KeyHandler;
  KeyB?: KeyHandler;
}

export function useKeyboardNavigation(bindings: KeyBindings) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = bindings[event.code as keyof KeyBindings];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bindings]);
}

export function useGamepadNavigation(bindings: KeyBindings) {
  const [gamepadConnected, setGamepadConnected] = useState(false);

  useEffect(() => {
    const handleGamepadConnected = () => setGamepadConnected(true);
    const handleGamepadDisconnected = () => setGamepadConnected(false);

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    let animationId: number;
    let lastButtonState: boolean[] = [];

    const pollGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad) {
        const buttons = gamepad.buttons.map(b => b.pressed);
        
        // D-pad or left stick
        const axes = gamepad.axes;
        
        // Check for button presses (only trigger on initial press)
        if (buttons[0] && !lastButtonState[0]) bindings.Enter?.(); // A button
        if (buttons[1] && !lastButtonState[1]) bindings.Escape?.(); // B button
        if (buttons[12] && !lastButtonState[12]) bindings.ArrowUp?.(); // D-pad up
        if (buttons[13] && !lastButtonState[13]) bindings.ArrowDown?.(); // D-pad down
        if (buttons[14] && !lastButtonState[14]) bindings.ArrowLeft?.(); // D-pad left
        if (buttons[15] && !lastButtonState[15]) bindings.ArrowRight?.(); // D-pad right

        // Analog stick
        if (axes[0] < -0.5 && lastButtonState.length > 0) bindings.ArrowLeft?.();
        if (axes[0] > 0.5 && lastButtonState.length > 0) bindings.ArrowRight?.();
        if (axes[1] < -0.5 && lastButtonState.length > 0) bindings.ArrowUp?.();
        if (axes[1] > 0.5 && lastButtonState.length > 0) bindings.ArrowDown?.();

        lastButtonState = buttons;
      }

      animationId = requestAnimationFrame(pollGamepad);
    };

    if (gamepadConnected) {
      pollGamepad();
    }

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [bindings, gamepadConnected]);

  return gamepadConnected;
}
