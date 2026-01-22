import { cn } from "@/lib/utils";
import React from "react";

export interface SVGPlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?:
    | "circle"
    | "square"
    | "rect"
    | "avatar"
    | "image"
    | "logo"
    | "triangle"
    | "star"
    | "hexagon"
    | "heart"
    | "diamond"
    | "oval"
    | "wave"
    | "cylinder"
    | "cube"
    | "arrow";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  color?: "primary" | "secondary" | "muted" | "accent" | "gradient" | "rainbow" | "neon";
  style?: "filled" | "outline" | "pattern" | "texture" | "dashed" | "dotted";
  animated?: boolean;
  animationType?: "pulse" | "shimmer" | "bounce" | "fade" | "spin" | "scale" | "rotate" | "morph";
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
  style = "filled",
  animated = true,
  animationType = "pulse",
  children,
}) => {
  const dimensions = sizeMap[size];
  const finalWidth = width || dimensions.width;
  const finalHeight = height || dimensions.height;

  const getColorClass = () => {
    switch (color) {
      case "primary":
        return style === "outline" ? "stroke-based-orange fill-none" : "fill-based-orange";
      case "secondary":
        return style === "outline" ? "stroke-blue-400 fill-none" : "fill-blue-400";
      case "muted":
        return style === "outline" ? "stroke-gray-400 fill-none" : "fill-gray-400";
      case "accent":
        return style === "outline" ? "stroke-purple-400 fill-none" : "fill-purple-400";
      case "gradient":
        return "fill-url(#gradient)";
      case "rainbow":
        return "fill-url(#rainbow)";
      case "neon":
        return style === "outline" ? "stroke-cyan-400 fill-none" : "fill-cyan-400";
      default:
        return style === "outline" ? "stroke-gray-400 fill-none" : "fill-gray-400";
    }
  };

  const getStyleAttributes = () => {
    switch (style) {
      case "outline":
        return { fill: "none", strokeWidth: "2" };
      case "dashed":
        return { fill: "none", strokeWidth: "2", strokeDasharray: "4,2" };
      case "dotted":
        return { fill: "none", strokeWidth: "2", strokeDasharray: "1,1" };
      case "pattern":
        return { fill: "url(#pattern)" };
      case "texture":
        return { fill: "url(#texture)" };
      default:
        return {};
    }
  };

  const getAnimationClass = () => {
    if (!animated) return "";
    switch (animationType) {
      case "scale":
        return "animate-pulse";
      case "rotate":
        return "animate-spin";
      case "morph":
        return "animate-pulse";
      default:
        return `animate-${animationType}`;
    }
  };

  const getShape = () => {
    const numWidth = typeof finalWidth === "number" ? finalWidth : parseFloat(finalWidth);
    const numHeight = typeof finalHeight === "number" ? finalHeight : parseFloat(finalHeight);
    const centerX = numWidth / 2;
    const centerY = numHeight / 2;

    switch (variant) {
      case "circle":
        return <circle cx={centerX} cy={centerY} r={Math.min(numWidth, numHeight) / 2} />;
      case "avatar":
        return <circle cx={centerX} cy={centerY} r={Math.min(numWidth, numHeight) / 2} />;
      case "rect":
        return <rect width={finalWidth} height={finalHeight} rx="4" />;
      case "image":
        return <rect width={finalWidth} height={finalHeight} rx="8" />;
      case "logo":
        return <rect width={finalWidth} height={finalHeight} rx="2" />;
      case "triangle":
        return (
          <polygon
            points={`${centerX},${centerY - numHeight / 3} ${centerX - numWidth / 3},${centerY + numHeight / 3} ${centerX + numWidth / 3},${centerY + numHeight / 3}`}
          />
        );
      case "star":
        const outerRadius = Math.min(numWidth, numHeight) / 2;
        const innerRadius = outerRadius * 0.4;
        const points = [];
        for (let i = 0; i < 10; i++) {
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          points.push(`${centerX + Math.cos(angle) * radius},${centerY + Math.sin(angle) * radius}`);
        }
        return <polygon points={points.join(" ")} />;
      case "hexagon":
        const hexRadius = Math.min(numWidth, numHeight) / 2;
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          hexPoints.push(`${centerX + Math.cos(angle) * hexRadius},${centerY + Math.sin(angle) * hexRadius}`);
        }
        return <polygon points={hexPoints.join(" ")} />;
      case "heart":
        return (
          <path
            d={`M ${centerX} ${centerY + numHeight / 4}
                C ${centerX - numWidth / 3} ${centerY - numHeight / 4} ${centerX - numWidth / 2} ${centerY - numHeight / 6}
                ${centerX - numWidth / 2} ${centerY - numHeight / 6}
                C ${centerX - numWidth / 2} ${centerY - numHeight / 6} ${centerX} ${centerY - numHeight / 3}
                ${centerX} ${centerY - numHeight / 3}
                C ${centerX} ${centerY - numHeight / 3} ${centerX + numWidth / 2} ${centerY - numHeight / 6}
                ${centerX + numWidth / 2} ${centerY - numHeight / 6}
                C ${centerX + numWidth / 2} ${centerY - numHeight / 6} ${centerX + numWidth / 3} ${centerY - numHeight / 4}
                ${centerX} ${centerY + numHeight / 4} Z`}
          />
        );
      case "diamond":
        return (
          <polygon
            points={`${centerX},${centerY - numHeight / 2} ${centerX + numWidth / 2},${centerY} ${centerX},${centerY + numHeight / 2} ${centerX - numWidth / 2},${centerY}`}
          />
        );
      case "oval":
        return <ellipse cx={centerX} cy={centerY} rx={numWidth / 2} ry={numHeight / 2} />;
      case "wave":
        const waveHeight = numHeight / 4;
        return (
          <path
            d={`M 0 ${centerY} Q ${numWidth / 4} ${centerY - waveHeight} ${numWidth / 2} ${centerY} T ${numWidth} ${centerY} V ${numHeight} H 0 Z`}
          />
        );
      case "cylinder":
        return (
          <g>
            <ellipse cx={centerX} cy={centerY - numHeight / 4} rx={numWidth / 2} ry={numHeight / 6} />
            <rect x={0} y={centerY - numHeight / 4} width={numWidth} height={numHeight / 2} />
            <ellipse cx={centerX} cy={centerY + numHeight / 4} rx={numWidth / 2} ry={numHeight / 6} />
          </g>
        );
      case "cube":
        return (
          <g>
            <polygon
              points={`${centerX - numWidth / 4},${centerY - numHeight / 4} ${centerX + numWidth / 4},${centerY - numHeight / 4} ${centerX + numWidth / 2},${centerY} ${centerX},${centerY}`}
            />
            <polygon
              points={`${centerX + numWidth / 4},${centerY - numHeight / 4} ${centerX + numWidth / 4},${centerY + numHeight / 4} ${centerX + numWidth / 2},${centerY + numHeight / 2} ${centerX + numWidth / 2},${centerY}`}
            />
            <polygon
              points={`${centerX - numWidth / 4},${centerY - numHeight / 4} ${centerX - numWidth / 4},${centerY + numHeight / 4} ${centerX + numWidth / 4},${centerY + numHeight / 4} ${centerX + numWidth / 4},${centerY - numHeight / 4}`}
            />
          </g>
        );
      case "arrow":
        return (
          <polygon
            points={`${centerX - numWidth / 3},${centerY - numHeight / 4} ${centerX - numWidth / 3},${centerY + numHeight / 4} ${centerX},${centerY + numHeight / 4} ${centerX},${centerY + numHeight / 2} ${centerX + numWidth / 3},${centerY} ${centerX},${centerY - numHeight / 2} ${centerX},${centerY - numHeight / 4}`}
          />
        );
      default:
        return <rect width={finalWidth} height={finalHeight} />;
    }
  };

  const animationClass = getAnimationClass();
  const styleAttributes = getStyleAttributes();

  return (
    <svg
      className={cn(animationClass, getColorClass(), className)}
      width={finalWidth}
      height={finalHeight}
      viewBox={`0 0 ${finalWidth} ${finalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...styleAttributes}
    >
      <defs>
        {color === "gradient" && (
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
        )}
        {color === "rainbow" && (
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="16.67%" stopColor="#F7931E" />
            <stop offset="33.33%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#32CD32" />
            <stop offset="66.67%" stopColor="#1E90FF" />
            <stop offset="83.33%" stopColor="#9370DB" />
            <stop offset="100%" stopColor="#FF69B4" />
          </linearGradient>
        )}
        {style === "pattern" && (
          <pattern id="pattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="2" height="2" fill="currentColor" opacity="0.1" />
            <rect x="2" y="2" width="2" height="2" fill="currentColor" opacity="0.1" />
          </pattern>
        )}
        {style === "texture" && (
          <pattern id="texture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor" opacity="0.1" />
            <circle cx="4" cy="4" r="0.5" fill="currentColor" opacity="0.1" />
            <circle cx="1" cy="4" r="0.5" fill="currentColor" opacity="0.1" />
            <circle cx="4" cy="1" r="0.5" fill="currentColor" opacity="0.1" />
          </pattern>
        )}
      </defs>
      {React.cloneElement(getShape(), {
        className: getColorClass(),
        ...styleAttributes,
      })}
      {children}
    </svg>
  );
};

export default SVGPlaceholder;
