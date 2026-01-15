"use client";
import { SUPPORTED_RESOLUTIONS } from "@/constants/tradingview";
import TVDataFeed from "@/datafeed";
import socketManagerInstance from "@/lib/WebSocketManager";
import { ChartingLibraryWidgetOptions, LanguageCode, ResolutionString, widget } from "@/public/charting_library";
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [datafeed, setDatafeed] = useState<TVDataFeed | null>(null);
  useEffect(() => {
    const newDatafeed = new TVDataFeed(socketManagerInstance);
    setDatafeed(newDatafeed);
  }, []);

  useEffect(() => {
    if (!datafeed) return;
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: "btcusdt",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed,
      interval: "1" as ResolutionString,
      container: chartContainerRef.current!,
      library_path: "/charting_library/",
      locale: props.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      favorites: { intervals: Object.keys(SUPPORTED_RESOLUTIONS) as ResolutionString[] },
      // charts_storage_url: props.charts_storage_url,
      // charts_storage_api_version: props.charts_storage_api_version,
      // client_id: props.client_id,
      // user_id: props.user_id,
      fullscreen: false,
      autosize: true,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          })
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [datafeed, props]);

  return (
    <>
      <header className={styles.VersionHeader}>
        <h1>TradingView Charting Library and Next.js Integration Example</h1>
      </header>
      <div ref={chartContainerRef} className={styles.TVChartContainer} />
    </>
  );
};
