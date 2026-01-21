import React from "react";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type IconVariant = "default" | "primary" | "success" | "warning" | "danger" | "muted";
export type AnimationVariant = "none" | "subtle" | "pulse" | "bounce" | "spin" | "fade" | "slide" | "scale" | "shake";

export interface IconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
  style?: React.CSSProperties;
  animated?: boolean;
  animationDuration?: string;
  animationDelay?: string;
  onAnimationEnd?: () => void;
}

export interface BasedIconProps extends IconProps {
  animated?: boolean;
  animationDuration?: string;
  animationDelay?: string;
  onAnimationEnd?: () => void;
}

export interface IconVariants {
  default: "text-gray-400";
  primary: "text-based-orange";
  success: "text-green-400";
  warning: "text-yellow-400";
  danger: "text-red-400";
  muted: "text-gray-500";
}

export interface AnimationVariants {
  none: "";
  subtle: "opacity-0";
  pulse: "animate-pulse";
  bounce: "animate-bounce";
  spin: "animate-spin";
  fade: "animate-fade";
  slide: "animate-slide-in";
  scale: "animate-scale-in";
  shake: "animate-shake";
}

export interface SizeVariants {
  xs: 16;
  sm: 20;
  md: 24;
  lg: 28;
  xl: 32;
  "2xl": 40;
  "3xl": 48;
}

export const IconVariants: IconVariants = {
  default: "text-gray-400",
  primary: "text-based-orange",
  success: "text-green-400",
  warning: "text-yellow-400",
  danger: "text-red-400",
  muted: "text-gray-500",
};

export const AnimationVariants: AnimationVariants = {
  none: "",
  subtle: "opacity-0",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
  fade: "animate-fade",
  slide: "animate-slide-in",
  scale: "animate-scale-in",
  shake: "animate-shake",
};

export const SizeVariants: SizeVariants = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
};
