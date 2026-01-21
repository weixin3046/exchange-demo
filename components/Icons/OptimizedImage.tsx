"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderColor?: "primary" | "secondary" | "muted" | "accent";
  lazy?: boolean;
  fadeIn?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  placeholderColor = "muted",
  lazy = true,
  fadeIn = true,
  onLoad,
  onError,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy && !priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!lazy || priority) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  const colorClasses = {
    primary: "bg-based-orange/20",
    secondary: "bg-blue-500/20",
    muted: "bg-gray-600/20",
    accent: "bg-purple-500/20",
  };

  if (isError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border-2 border-dashed border-gray-600",
          colorClasses[placeholderColor],
          className
        )}
        style={{ width, height }}
      >
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500"
        >
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
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ width, height }}>
      {/* Loading placeholder */}
      {!isLoaded && <div className={cn("absolute inset-0 animate-pulse", colorClasses[placeholderColor])} />}

      <img
        ref={imgRef}
        src={isInView || priority ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          fadeIn && !isLoaded && "opacity-0",
          fadeIn && isLoaded && "opacity-100"
        )}
        style={{
          filter: isLoaded ? "none" : "blur(5px)",
        }}
      />
    </div>
  );
};

export default OptimizedImage;
