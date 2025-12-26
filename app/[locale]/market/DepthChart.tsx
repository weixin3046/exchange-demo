// components/market/DepthChart.tsx
import { DepthCalculator } from "@/websocket/depth-calculator";
import { DepthData } from "@/websocket/types/market";
import React, { useMemo } from "react";

interface DepthChartProps {
  depthData: DepthData;
  height?: number;
  showTooltip?: boolean;
}

export const DepthChart: React.FC<DepthChartProps> = ({ depthData, height = 300 }) => {
  const cumulativeDepth = useMemo(() => {
    return DepthCalculator.getCumulativeDepth(depthData, 100);
  }, [depthData]);

  if (!cumulativeDepth || cumulativeDepth.prices.length === 0) {
    return <div className="flex h-full items-center justify-center bg-gray-50">暂无深度数据</div>;
  }

  const { prices, cumulativeAsks, cumulativeBids } = cumulativeDepth;

  // 计算最大累计量
  const maxCumulative = Math.max(...cumulativeAsks, ...cumulativeBids);

  // 计算SVG路径
  const getPathData = (data: number[], isAsk: boolean) => {
    console.log(isAsk);
    if (prices.length !== data.length) return "";

    const points = data.map((value, index) => {
      const x = (index / (prices.length - 1)) * 100;
      const y = ((maxCumulative - value) / maxCumulative) * 100;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  const askPath = getPathData(cumulativeAsks, true);
  const bidPath = getPathData(cumulativeBids, false);

  // 找到中间价
  const priceSummary = DepthCalculator.getPriceSummary(depthData);

  return (
    <div className="relative" style={{ height }}>
      <svg width="100%" height="100%" className="overflow-visible">
        {/* 背景网格 */}
        <defs>
          <pattern id="grid" width="10%" height="10%" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* 买单区域填充 */}
        <path d={`${bidPath} L 100,100 L 0,100 Z`} fill="url(#bidGradient)" fillOpacity="0.3" />

        {/* 卖单区域填充 */}
        <path d={`${askPath} L 100,100 L 0,100 Z`} fill="url(#askGradient)" fillOpacity="0.3" />

        {/* 买单曲线 */}
        <path d={bidPath} fill="none" stroke="#10b981" strokeWidth="2" />

        {/* 卖单曲线 */}
        <path d={askPath} fill="none" stroke="#ef4444" strokeWidth="2" />

        {/* 中间价线 */}
        {priceSummary && (
          <>
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
            <text x="50%" y="95%" textAnchor="middle" fill="#3b82f6" fontSize="12" className="font-semibold">
              Mid: ${priceSummary.midPrice.toFixed(2)}
            </text>
          </>
        )}

        {/* 渐变定义 */}
        <defs>
          <linearGradient id="bidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="askGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* 图例 */}
      <div className="absolute top-4 left-4 rounded-lg bg-white/80 px-3 py-2 shadow backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-sm">买单深度</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm">卖单深度</span>
          </div>
        </div>
      </div>
    </div>
  );
};
