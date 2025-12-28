import { cn } from "@/lib/utils";
import { DepthData, DepthItem } from "@/websocket/types/market";
import React from "react";

interface DepthTableProps {
  depthData: DepthData;
  maxLevels?: number;
  showTotals?: boolean;
  className?: string;
}

export const DepthTable: React.FC<DepthTableProps> = ({
  depthData,
  maxLevels = 10,
  showTotals = true,
  className = "",
}) => {
  const { asks, bids } = depthData;

  // 限制显示数量
  const displayAsks = asks.slice(0, maxLevels);
  const displayBids = bids.slice(0, maxLevels);

  // 找到最大累计量用于计算宽度百分比
  const maxCumulativeVolume = Math.max(
    ...displayAsks.map((item) => item.cumulativeVolume || 0),
    ...displayBids.map((item) => item.cumulativeVolume || 0)
  );

  const renderDepthRow = (item: DepthItem, isAsk: boolean, index: number) => {
    const widthPercentage = maxCumulativeVolume > 0 ? ((item.cumulativeVolume || 0) / maxCumulativeVolume) * 100 : 0;

    return (
      <div
        key={`${isAsk ? "ask" : "bid"}-${index}`}
        className="relative flex h-6.5 items-center overflow-hidden text-xs font-medium hover:bg-gray-50"
      >
        {/* 背景色条 */}
        <div
          className={cn(
            isAsk ? "bg-down-bg-rgb/15" : "bg-up-bg-rgb/15",
            `absolute left-full h-[calc(100%-2px)] w-full transition duration-300 ease-in-out`
          )}
          style={{
            transform: "translate3d(-" + widthPercentage + "%, 0px, 0px)",
          }}
        />

        <div className="relative z-10 flex w-full px-4">
          {/* 价格 */}
          <div className={`w-1/3 ${isAsk ? "text-up-text" : "text-down-text"}`}>
            {item.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>

          {/* 数量 */}
          <div className="w-1/3 text-right">
            {item.volume.toLocaleString(undefined, {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}
          </div>

          {/* 累计 */}
          <div className="w-1/3 text-right">
            {(item.cumulativeVolume || 0).toLocaleString(undefined, {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`rounded-lg shadow ${className}`}>
      {/* 表头 */}
      <div className="flex border-b px-4 py-2">
        <div className="w-1/3 font-semibold">价格 (USD)</div>
        <div className="w-1/3 text-right font-semibold">数量 (BTC)</div>
        <div className="w-1/3 text-right font-semibold">累计</div>
      </div>

      {/* 卖单 */}
      <div className="space-y-1.5 border-b">{displayAsks.map((item, index) => renderDepthRow(item, true, index))}</div>

      {/* 中间价（如果有的话） */}
      {depthData.total && (
        <div className="border-b px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-blue-700">汇总</span>
            <div className="flex space-x-6">
              <div>
                <span className="text-gray-600">卖单总量: </span>
                <span className="font-mono">{depthData.total.totalAskVolume.toFixed(4)} BTC</span>
              </div>
              <div>
                <span className="text-gray-600">买单总量: </span>
                <span className="font-mono">{depthData.total.totalBidVolume.toFixed(4)} BTC</span>
              </div>
              <div>
                <span className="text-gray-600">买卖比: </span>
                <span className="font-mono">{depthData.total.bidAskRatio.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 买单 */}
      <div className="space-y-1.5 border-b">{displayBids.map((item, index) => renderDepthRow(item, false, index))}</div>

      {/* 总计信息 */}
      {showTotals && depthData.total && (
        <div className="border-t bg-gray-50 px-4 py-3">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">卖单总量</div>
              <div className="font-mono text-lg text-red-600">{depthData.total.totalAskVolume.toFixed(4)} BTC</div>
              <div className="text-sm text-gray-500">
                ≈ $
                {depthData.total.totalAskAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500">买单总量</div>
              <div className="font-mono text-lg text-green-600">{depthData.total.totalBidVolume.toFixed(4)} BTC</div>
              <div className="text-sm text-gray-500">
                ≈ $
                {depthData.total.totalBidAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500">买卖比例</div>
              <div className="font-mono text-lg">{depthData.total.bidAskRatio.toFixed(3)}</div>
              <div className="text-sm">
                {depthData.total.bidAskRatio > 1 ? (
                  <span className="text-green-600">买盘较强</span>
                ) : (
                  <span className="text-red-600">卖盘较强</span>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500">最大单档</div>
              <div className="font-mono text-lg">{depthData.total.maxVolumeLevel.toFixed(4)} BTC</div>
              <div className="text-sm text-gray-500">
                {depthData.total.maxVolumeLevel > 10 ? "大单堆积" : "正常分布"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
