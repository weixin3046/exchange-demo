export const ANIMATION_CONFIG = {
  // Duration in milliseconds
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
    extraSlow: 1000,
  },

  // Easing functions
  easings: {
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    linear: "linear",
  },

  // Animation types with their CSS classes
  types: {
    none: "",
    pulse: "animate-pulse",
    shimmer: "animate-shimmer",
    wave: "animate-wave",
    fade: "animate-fade",
    slide: "animate-slide-in",
    scale: "animate-scale-in",
    shake: "animate-shake",
    spin: "animate-spin",
    bounce: "animate-bounce",
    ping: "animate-ping",
  },

  // Default animation for different placeholder types
  defaults: {
    skeleton: "animate-pulse",
    shimmer: "animate-shimmer",
    pulse: "animate-pulse",
    wave: "animate-wave",
    image: "animate-fade",
    text: "animate-pulse",
    card: "animate-fade",
  },

  // Performance settings
  performance: {
    reducedMotion: "prefers-reduced-motion",
    disableAnimations: false,
  },
} as const;

export type AnimationType = keyof typeof ANIMATION_CONFIG.types;
export type AnimationDuration = keyof typeof ANIMATION_CONFIG.durations;
export type AnimationEasing = keyof typeof ANIMATION_CONFIG.easings;

export const getAnimationClass = (type: AnimationType, customClass?: string): string => {
  if (ANIMATION_CONFIG.performance.disableAnimations) {
    return "";
  }

  const baseClass = ANIMATION_CONFIG.types[type];
  return customClass ? `${baseClass} ${customClass}` : baseClass;
};

export const getAnimationDuration = (duration: AnimationDuration): string => {
  return `${ANIMATION_CONFIG.durations[duration]}ms`;
};

export const shouldAnimate = (): boolean => {
  if (ANIMATION_CONFIG.performance.disableAnimations) {
    return false;
  }

  if (typeof window !== "undefined") {
    return !window.matchMedia(ANIMATION_CONFIG.performance.reducedMotion).matches;
  }

  return true;
};
