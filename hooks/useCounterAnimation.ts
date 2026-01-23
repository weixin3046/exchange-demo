'use client';

import { useEffect, useState } from 'react';

interface CounterAnimationOptions {
  duration?: number;
  delay?: number;
}

export function useCounterAnimation(
  targetValue: number,
  options: CounterAnimationOptions = {}
): number {
  const { duration = 2000, delay = 0 } = options;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now() + delay;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      if (elapsed >= duration) {
        setDisplayValue(targetValue);
        return;
      }

      // Easing function: easeOutQuad
      const progress = elapsed / duration;
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      const currentValue = Math.floor(targetValue * easeProgress);

      setDisplayValue(currentValue);
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [targetValue, duration, delay]);

  return displayValue;
}
