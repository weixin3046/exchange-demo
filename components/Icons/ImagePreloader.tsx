"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ImagePreloaderProps {
  images: string[];
  onComplete?: () => void;
  onProgress?: (loaded: number, total: number) => void;
  className?: string;
  showProgress?: boolean;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  images,
  onComplete,
  onProgress,
  className,
  showProgress = true,
}) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!images || images.length === 0) {
      onComplete?.();
      setIsLoading(false);
      return;
    }

    setTotalCount(images.length);
    let loaded = 0;

    const loadPromises = images.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          onProgress?.(loaded, images.length);
          resolve();
        };

        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
          onProgress?.(loaded, images.length);
          resolve(); // Continue even if image fails to load
        };

        img.src = src;
      });
    });

    Promise.all(loadPromises).then(() => {
      setIsLoading(false);
      onComplete?.();
    });
  }, [images, onComplete, onProgress]);

  if (!showProgress || !isLoading) {
    return null;
  }

  const progress = totalCount > 0 ? (loadedCount / totalCount) * 100 : 0;

  return (
    <div className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/80", className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="border-based-orange h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
        <div className="text-white">
          Loading images... {loadedCount}/{totalCount}
        </div>
        <div className="h-2 w-48 overflow-hidden rounded-full bg-gray-700">
          <div
            className="bg-based-orange h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePreloader;
