"use client";
import { cn } from "@/lib/utils";
import { DepthData, TradeData } from "@/websocket/types/market";
import OrderItem from "./OrderItem";

interface DepthTableProps {
  depthData: DepthData;
  maxLevels?: number;
  // showTotals?: boolean;
  className?: string;
  latestTrade: TradeData;
}

export default function OrderBook({ depthData, maxLevels = 10, className, latestTrade }: DepthTableProps) {
  const { asks, bids } = depthData;

  // 限制显示数量
  const displayAsks = asks.slice(0, maxLevels);
  const displayBids = bids.slice(0, maxLevels);

  // 找到最大累计量用于计算宽度百分比
  const maxCumulativeVolume = Math.max(
    ...displayAsks.map((item) => item.cumulativeVolume || 0),
    ...displayBids.map((item) => item.cumulativeVolume || 0)
  );

  return (
    <div className={`rounded-lg shadow ${className}`}>
      {/* 表头 */}
      <div className="text-text-tertiary mb-2 flex items-center text-xs font-medium">
        <div className="w-1/3 font-semibold">价格 (USD)</div>
        <div className="w-1/3 text-right font-semibold">数量 (BTC)</div>
        <div className="w-1/3 text-right font-semibold">累计</div>
      </div>
      {/* 卖单 */}
      <div>
        {displayAsks?.map((item, index) => (
          <OrderItem key={index} isAsk maxCumulativeVolume={maxCumulativeVolume} item={item} />
        ))}
      </div>
      {/* 中间价（如果有的话） */}
      {latestTrade && (
        <div>
          <div className="flex items-center">
            <button
              className={cn("text-lg font-semibold", latestTrade.side === "BUY" ? "text-up-text" : "text-down-text")}
            >
              {latestTrade.price}
            </button>
            {/* {change >= 0 && <ArrowUp className="text-down-text text-lg" />} */}
            {/* {change < 0 && <ArrowDown className="text-up-text text-lg" />} */}
          </div>
        </div>
      )}

      {/* 买单 */}
      <div>
        {displayBids.map((item, index) => (
          <OrderItem key={index} isAsk={false} maxCumulativeVolume={maxCumulativeVolume} item={item} />
        ))}
      </div>
    </div>
  );
}
