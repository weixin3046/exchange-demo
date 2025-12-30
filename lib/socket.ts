import { channelToSubscription } from "@/components/TVChartContainer/streaming";
import { inflate } from "pako";

export const wsService = new WebSocket("wss://ws.coobit.cc/kline-api/ws");

wsService.addEventListener("open", () => {
  console.log("[socket] Connected");
});

wsService.addEventListener("close", (reason) => {
  console.log("[socket] Disconnected:", reason);
});

wsService.addEventListener("error", (error) => {
  console.log("[socket] Error:", error);
});
wsService.addEventListener("message", async (event) => {
  const buffer = await event.data.arrayBuffer();
  const uint8 = new Uint8Array(buffer);
  const result = inflate(uint8, { to: "string" });
  const data = JSON.parse(result);
  console.log(data);
  const {
    // ds: tradeTime,
    open: tradePrice,
    vol: tradeVolume,
    id: tradeTime,
  } = data.data;

  const channelString = data.channel;
  const subscriptionItem = channelToSubscription.get(channelString);
  if (subscriptionItem === undefined) {
    return;
  }
  const defaultLastBar = {
    time: Date.now(), // 当前时间
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  };
  const lastBar = subscriptionItem.lastBar || defaultLastBar;

  // The resolution will be '1', '60', or '1D'
  const nextBarTime = getNextBarTime(lastBar?.time, subscriptionItem.resolution);

  let bar;
  // If the trade time is greater than or equal to the next bar's start time, create a new bar
  if (tradeTime * 1000 >= nextBarTime) {
    bar = {
      time: nextBarTime,
      open: tradePrice,
      high: tradePrice,
      low: tradePrice,
      close: tradePrice,
      volume: tradeVolume,
    };
  } else {
    // Otherwise, update the last bar
    bar = {
      ...lastBar,
      high: Math.max(lastBar.high, tradePrice),
      low: Math.min(lastBar.low, tradePrice),
      close: tradePrice,
      volume: (lastBar.volume || 0) + tradeVolume,
    };
  }
  subscriptionItem.lastBar = bar;
  console.log(bar);
  // Send data to every subscriber of that symbol
  subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
});

function getNextBarTime(barTime: string, resolution: string) {
  const date = new Date(barTime);
  const interval = parseInt(resolution);

  if (resolution === "1D") {
    date.setUTCDate(date.getUTCDate() + 1);
    date.setUTCHours(0, 0, 0, 0);
  } else if (!isNaN(interval)) {
    // Handles '1' and '60' (minutes)
    // Add the interval to the current bar's time
    date.setUTCMinutes(date.getUTCMinutes() + interval);
  }
  return date.getTime();
}
