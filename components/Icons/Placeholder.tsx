import { getAnimationClass } from "@/lib/animations";
import { cn } from "@/lib/utils";
import React from "react";

export interface PlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: "skeleton" | "shimmer" | "pulse" | "wave";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  color?: "primary" | "secondary" | "muted" | "accent";
  animated?: boolean;
  children?: React.ReactNode;
}

const colorVariants = {
  primary: "bg-gradient-to-r from-based-orange/20 to-based-orange/10",
  secondary: "bg-gradient-to-r from-blue-500/20 to-blue-500/10",
  muted: "bg-gradient-to-r from-gray-600/20 to-gray-600/10",
  accent: "bg-gradient-to-r from-purple-500/20 to-purple-500/10",
};

const roundedVariants = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Placeholder: React.FC<PlaceholderProps> = ({
  className,
  width = "100%",
  height = "100%",
  variant = "skeleton",
  rounded = "md",
  color = "muted",
  animated = true,
  children,
}) => {
  const animationClass = animated && getAnimationClass(variant as "shimmer" | "pulse" | "wave" | "none");

  const baseClasses = cn(
    "relative overflow-hidden",
    colorVariants[color],
    roundedVariants[rounded],
    animationClass,
    className
  );

  if (children) {
    return (
      <div className={baseClasses} style={{ width, height }}>
        {children}
      </div>
    );
  }

  return <div className={baseClasses} style={{ width, height }} />;
};

export default Placeholder;
