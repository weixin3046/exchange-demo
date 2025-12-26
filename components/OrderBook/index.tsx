"use client";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import OrderItem from "./OrderItem";

export default function OrderBook() {
  const [currentType] = useState(0);
  const [change] = useState(5); // 判断涨跌
  return (
    <div>
      <div className="text-text-tertiary mb-2 flex items-center justify-between text-xs font-medium">
        <div className="flex-1">Price(USDT)</div>
        <div className="flex-1 text-right">Amount(BTC)</div>
        <div className="flex-1 text-right">Total(BTC)</div>
      </div>
      <div>
        {currentType === 0 &&
          new Array(20).fill(1).map((item, index) => <OrderItem key={index} type={"sell"} item={[84231, 0.2, 3]} />)}
      </div>
      <div>
        <div className="flex items-center">
          <button className={cn("text-lg font-semibold", change >= 0 ? "text-down-text" : "text-up-text")}>
            85,954.0
          </button>
          {change >= 0 && <ArrowUp className="text-down-text text-lg" />}
          {change < 0 && <ArrowDown className="text-up-text text-lg" />}
        </div>
      </div>
      <div>
        {currentType === 0 &&
          new Array(20).fill(1).map((item, index) => <OrderItem key={index} type={"buy"} item={[84001, 2, 3]} />)}
        {/* {currentType === 1 && <OrderItem type={"buy"} item={[]} />} */}
      </div>
    </div>
  );
}
