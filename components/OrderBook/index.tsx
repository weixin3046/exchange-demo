"use client";
import { DepthData } from "@/websocket/types/market";
import { useState } from "react";
import OrderItem from "./OrderItem";

interface DepthTableProps {
  depthData: DepthData;
  maxLevels?: number;
  showTotals?: boolean;
  className?: string;
}

export default function OrderBook({ depthData, maxLevels = 10 }: DepthTableProps) {
  const [currentType] = useState(0);
  // const [change] = useState(5); // 判断涨跌

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
    <div>
      <div className="text-text-tertiary mb-2 flex items-center justify-between text-xs font-medium">
        <div className="flex-1">Price(USDT)</div>
        <div className="flex-1 text-right">Amount(BTC)</div>
        <div className="flex-1 text-right">Total(BTC)</div>
      </div>
      <div>
        {currentType === 0 &&
          displayAsks?.map((item, index) => (
            <OrderItem key={index} isAsk maxCumulativeVolume={maxCumulativeVolume} item={item} />
          ))}
      </div>
      <div>
        <div className="flex items-center">
          {/* <button className={cn("text-lg font-semibold", change >= 0 ? "text-down-text" : "text-up-text")}>
            85,954.0
          </button> */}
          {/* {change >= 0 && <ArrowUp className="text-down-text text-lg" />} */}
          {/* {change < 0 && <ArrowDown className="text-up-text text-lg" />} */}
        </div>
      </div>
      <div>
        {currentType === 0 &&
          displayBids.map((item, index) => (
            <OrderItem key={index} isAsk={false} maxCumulativeVolume={maxCumulativeVolume} item={item} />
          ))}
        {/* {currentType === 1 && <OrderItem type={"buy"} item={[]} />} */}
      </div>
    </div>
  );
}
