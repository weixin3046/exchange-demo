"use client";
import { ChartingLibraryWidgetOptions, ResolutionString } from "@/public/charting_library/charting_library";
import dynamic from "next/dynamic";
import { memo } from "react";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "BTC",
  interval: "1D" as ResolutionString,
  library_path: "/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const TVChartContainer = dynamic(() => import("@/components/TVChartContainer").then((mod) => mod.TVChartContainer), {
  ssr: false,
});

const CandlestickChart = memo(function CandlestickChart() {
  return <>{<TVChartContainer {...defaultWidgetProps} />}</>;
});
export default CandlestickChart;
