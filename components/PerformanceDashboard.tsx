"use client";

import { performanceMonitor, usePerformanceLogger } from "@/hooks/usePerformanceMonitor";

export default function PerformanceDashboard() {
  const metrics = performanceMonitor.getAllMetrics();

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border border-white/20 bg-black/90 p-4 text-sm text-white">
      <h3 className="text-based-orange mb-2 font-semibold">Performance Metrics</h3>
      <div className="max-h-48 space-y-1 overflow-y-auto">
        {metrics.map((metric) => (
          <div key={metric.componentName} className="flex justify-between">
            <span className="mr-2 truncate">{metric.componentName}</span>
            <span className="text-gray-400">{metric.totalTime.toFixed(1)}ms</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => performanceMonitor.clearMetrics()}
        className="bg-based-orange/20 hover:bg-based-orange/30 mt-2 rounded px-2 py-1 text-xs transition-colors"
      >
        Clear
      </button>
    </div>
  );
}

// 开发环境专用性能组件
export function DevPerformanceWrapper({
  children,
  componentName,
}: {
  children: React.ReactNode;
  componentName: string;
}) {
  usePerformanceLogger(componentName);

  if (process.env.NODE_ENV !== "development") {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <PerformanceDashboard />
    </>
  );
}
