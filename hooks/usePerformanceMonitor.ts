import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  componentName: string;
  mountTime: number;
  renderTime: number;
  totalTime: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observers: ((metrics: PerformanceMetrics) => void)[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  recordMetric(componentName: string, metric: Partial<PerformanceMetrics>) {
    const existing = this.metrics.get(componentName) || {
      componentName,
      mountTime: 0,
      renderTime: 0,
      totalTime: 0,
    };

    this.metrics.set(componentName, { ...existing, ...metric });

    // 通知观察者
    this.observers.forEach((observer) => {
      const updatedMetric = this.metrics.get(componentName)!;
      observer(updatedMetric);
    });
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.observers.push(callback);
    return () => {
      this.observers = this.observers.filter((obs) => obs !== callback);
    };
  }

  getAllMetrics() {
    return Array.from(this.metrics.values());
  }

  getMetric(componentName: string) {
    return this.metrics.get(componentName);
  }

  clearMetrics() {
    this.metrics.clear();
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

export function usePerformanceMonitor(componentName: string, enabled: boolean = true) {
  const mountTimeRef = useRef<number>(0);
  const renderCountRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    mountTimeRef.current = startTime;
    renderCountRef.current = 0;

    // 记录挂载时间
    const mountEndTime = performance.now();
    performanceMonitor.recordMetric(componentName, {
      mountTime: mountEndTime - startTime,
      renderTime: 0,
      totalTime: mountEndTime - startTime,
    });

    return () => {
      const unmountTime = performance.now();
      const totalTime = unmountTime - mountTimeRef.current;
      performanceMonitor.recordMetric(componentName, {
        totalTime,
      });
    };
  }, [componentName, enabled]);

  useEffect(() => {
    if (!enabled) return;
    renderCountRef.current += 1;
  });

  return {
    recordRenderTime: (renderTime: number) => {
      if (!enabled) return;
      performanceMonitor.recordMetric(componentName, { renderTime });
    },
    getMetrics: () => performanceMonitor.getMetric(componentName),
    renderCount: renderCountRef.current,
  };
}

// 开发环境下的性能日志
export function usePerformanceLogger(componentName: string, enabled: boolean = process.env.NODE_ENV === "development") {
  const { recordRenderTime, getMetrics, renderCount } = usePerformanceMonitor(componentName, enabled);

  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = performanceMonitor.subscribe((metrics) => {
      if (metrics.componentName === componentName) {
        console.log(`[Performance] ${componentName}:`, {
          mountTime: `${metrics.mountTime.toFixed(2)}ms`,
          renderTime: `${metrics.renderTime.toFixed(2)}ms`,
          totalTime: `${metrics.totalTime.toFixed(2)}ms`,
          renderCount,
        });
      }
    });

    return unsubscribe;
  }, [componentName, enabled, renderCount]);

  return { recordRenderTime, getMetrics };
}
