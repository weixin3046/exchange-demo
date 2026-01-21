import { cn } from "@/lib/utils";
import React from "react";

export interface ImagePlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape" | "custom";
  customRatio?: string;
  variant?: "default" | "card" | "thumbnail" | "banner" | "avatar" | "square" | "rect";
  animated?: boolean;
  showIcon?: boolean;
  iconType?: "image" | "photo" | "camera" | "picture";
  color?: "primary" | "secondary" | "muted" | "accent";
  children?: React.ReactNode;
}

const aspectRatioMap = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  custom: "",
};

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  className,
  width = "100%",
  height,
  aspectRatio = "square",
  customRatio,
  variant = "default",
  animated = true,
  showIcon = true,
  iconType = "image",
  color = "muted",
  children,
}) => {
  const getIcon = () => {
    const iconSize = variant === "thumbnail" ? 24 : variant === "avatar" ? 32 : 48;

    switch (iconType) {
      case "photo":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="10" r="2" fill="currentColor" />
            <path
              d="M8 18L8 14L10 16L14 12L16 14L16 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "camera":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M23 19C23 20.1046 22.1046 21 21 21H3C1.89543 21 1 20.1046 1 19V8C1 6.89543 1.89543 6 3 6H7L9 3H15L17 6H21C22.1046 6 23 6.89543 23 8V19Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case "picture":
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return (
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path
              d="M21 15L16 10L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  const colorClasses = {
    primary: "text-based-orange bg-based-orange/10",
    secondary: "text-blue-500 bg-blue-500/10",
    muted: "text-gray-500 bg-gray-500/10",
    accent: "text-purple-500 bg-purple-500/10",
  };

  const variantClasses = {
    default: "rounded-lg",
    card: "rounded-xl shadow-sm",
    thumbnail: "rounded-md",
    banner: "rounded-2xl",
    avatar: "rounded-full",
    square: "rounded-lg",
    rect: "rounded-md",
  };

  const aspectClass = aspectRatio === "custom" ? "" : aspectRatioMap[aspectRatio];
  const customStyle = aspectRatio === "custom" && customRatio ? { aspectRatio: customRatio } : {};

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        colorClasses[color],
        variantClasses[variant],
        aspectClass,
        animated && "animate-pulse",
        className
      )}
      style={{ width, height, ...customStyle }}
    >
      {showIcon && !children && <div className={cn("opacity-50", animated && "animate-pulse")}>{getIcon()}</div>}
      {children}
    </div>
  );
};

export default ImagePlaceholder;
