import { cn } from "@/lib/utils";
import React from "react";

export interface SVGPlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: "circle" | "square" | "rect" | "avatar" | "image" | "logo";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "primary" | "secondary" | "muted" | "accent" | "gradient";
  animated?: boolean;
  animationType?: "pulse" | "shimmer" | "bounce" | "fade" | "spin";
  children?: React.ReactNode;
}

const sizeMap = {
  xs: { width: 16, height: 16 },
  sm: { width: 20, height: 20 },
  md: { width: 24, height: 24 },
  lg: { width: 28, height: 28 },
  xl: { width: 32, height: 32 },
  "2xl": { width: 40, height: 40 },
  "3xl": { width: 48, height: 48 },
};

const SVGPlaceholder: React.FC<SVGPlaceholderProps> = ({
  className,
  width,
  height,
  variant = "square",
  size = "md",
  color = "muted",
  animated = true,
  animationType = "pulse",
  children,
}) => {
  const dimensions = sizeMap[size];
  const finalWidth = width || dimensions.width;
  const finalHeight = height || dimensions.height;

  const getShape = () => {
    const numWidth = typeof finalWidth === "number" ? finalWidth : parseFloat(finalWidth);
    const numHeight = typeof finalHeight === "number" ? finalHeight : parseFloat(finalHeight);

    switch (variant) {
      case "circle":
        return <circle cx={numWidth / 2} cy={numHeight / 2} r={Math.min(numWidth, numHeight) / 2} />;
      case "avatar":
        return <circle cx={numWidth / 2} cy={numHeight / 2} r={Math.min(numWidth, numHeight) / 2} />;
      case "rect":
        return <rect width={finalWidth} height={finalHeight} rx="4" />;
      case "image":
        return <rect width={finalWidth} height={finalHeight} rx="8" />;
      case "logo":
        return <rect width={finalWidth} height={finalHeight} rx="2" />;
      default:
        return <rect width={finalWidth} height={finalHeight} />;
    }
  };

  const animationClass = animated ? `animate-${animationType}` : "";

  return (
    <svg
      className={cn(animationClass, className)}
      width={finalWidth}
      height={finalHeight}
      viewBox={`0 0 ${finalWidth} ${finalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {color === "gradient" && (
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      )}
      {getShape()}
      {children}
    </svg>
  );
};

export default SVGPlaceholder;
