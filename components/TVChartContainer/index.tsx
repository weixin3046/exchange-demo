import { ChartingLibraryWidgetOptions, ResolutionString, widget } from "@/public/charting_library";
import { useEffect, useRef, useState } from "react";
import { DataFeed } from "./datafeed";

export const TVChartContainer = (props: Partial<ChartingLibraryWidgetOptions>) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [datafeed, setDatafeed] = useState<DataFeed | null>(null);
  // const { connectionState, sendMessage, subscribe, unsubscribe } = useWebSocketContext();
  useEffect(() => {
    const newDatafeed = new DataFeed();
    setDatafeed((prev) => {
      if (prev) {
        prev.destroy();
      }
      return newDatafeed;
    });
  }, []);
  useEffect(() => {
    if (!datafeed) return;
    // if (!connectionState) return;
    const widgetOptions: ChartingLibraryWidgetOptions = {
      debug: true,
      symbol: props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed,
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current!,
      library_path: "/charting_library/",
      locale: "zh",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
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

  return <div ref={chartContainerRef} className="h-full" />;
};
