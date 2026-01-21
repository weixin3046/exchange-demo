import { useCallback, useEffect, useRef, useState } from "react";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  cacheHit: boolean;
  imageSize: number;
  errorCount: number;
}

interface UseImagePerformanceProps {
  src: string;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
}

export const useImagePerformance = ({ src, onPerformanceUpdate }: UseImagePerformanceProps) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    cacheHit: false,
    imageSize: 0,
    errorCount: 0,
  });

  const startTime = useRef<number>(Date.now());
  const renderStartTime = useRef<number>(Date.now());

  const updateMetrics = useCallback(
    (newMetrics: Partial<PerformanceMetrics>) => {
      const updated = { ...metrics, ...newMetrics };
      setMetrics(updated);
      onPerformanceUpdate?.(updated);
    },
    [metrics, onPerformanceUpdate]
  );

  const measureLoadStart = useCallback(() => {
    startTime.current = Date.now();
  }, []);

  const measureLoadEnd = useCallback(() => {
    const loadTime = Date.now() - startTime.current;
    updateMetrics({ loadTime });
  }, [updateMetrics]);

  const measureRenderStart = useCallback(() => {
    renderStartTime.current = Date.now();
  }, []);

  const measureRenderEnd = useCallback(() => {
    const renderTime = Date.now() - renderStartTime.current;
    updateMetrics({ renderTime });
  }, [updateMetrics]);

  const checkCacheHit = useCallback(() => {
    const img = new Image();
    const loadStart = performance.now();

    img.onload = () => {
      const loadEnd = performance.now();
      const loadDuration = loadEnd - loadStart;
      updateMetrics({ cacheHit: loadDuration < 10 });
    };

    img.src = src;
  }, [src, updateMetrics]);

  const measureImageSize = useCallback(() => {
    try {
      const img = new Image();
      img.onload = () => {
        updateMetrics({ imageSize: img.naturalWidth * img.naturalHeight });
      };
      img.src = src;
    } catch (error) {
      console.error("Failed to measure image size:", error);
    }
  }, [src, updateMetrics]);

  const incrementErrorCount = useCallback(() => {
    setMetrics((prev) => ({ ...prev, errorCount: prev.errorCount + 1 }));
  }, []);

  useEffect(() => {
    if (src) {
      checkCacheHit();
      measureImageSize();
    }
  }, [src, checkCacheHit, measureImageSize]);

  return {
    metrics,
    measureLoadStart,
    measureLoadEnd,
    measureRenderStart,
    measureRenderEnd,
    incrementErrorCount,
  };
};
