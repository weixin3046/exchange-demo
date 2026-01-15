"use client";

import { TVChartContainer } from "@/components/TVChartContainer/TVChartContainer";

// import { useMarketTrade } from "@/hooks/useMarketTrade";

export default function SwapPage() {
  // const { data } = useMarketTrade();
  return (
    <div>
      <div>我是合约页面:</div>
      <TVChartContainer />
    </div>
  );
}
