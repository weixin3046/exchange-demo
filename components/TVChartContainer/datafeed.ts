import {
  DatafeedErrorCallback,
  HistoryCallback,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback,
} from "@/public/charting_library/charting_library";

const configurationData = {
  // Represents the resolutions for bars supported by your datafeed
  supported_resolutions: ["1", "5", "15", "60", "180", "1D", "1W", "1M"] as ResolutionString[],
  // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
  exchanges: [
    { value: "Bitfinex", name: "Bitfinex", desc: "Bitfinex" },
    { value: "Kraken", name: "Kraken", desc: "Kraken bitcoin exchange" },
  ],
  // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
  symbols_types: [{ name: "crypto", value: "crypto" }],
};

async function getAllSymbols() {
  const allSymbols = [
    {
      symbol: "BTC",
      ticker: "",
      description: "btc",
      exchange: "btc",
      type: "crypto",
    },
  ];

  return allSymbols;
}

const dataFeed = {
  onReady: (callback: OnReadyCallback) => {
    setTimeout(() =>
      callback({
        supported_resolutions: configurationData.supported_resolutions,
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
      })
    );
  },
  searchSymbols: () => {
    console.log("[searchSymbols]: Method call");
  },
  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    onResolveErrorCallback: DatafeedErrorCallback
  ) => {
    const symbols = await getAllSymbols();
    const symbolItem = symbols.find(({ ticker }) => ticker === symbolName);
    if (!symbolItem) {
      console.log("[resolveSymbol]: Cannot resolve symbol", symbolName);
      onResolveErrorCallback("unknown_symbol"); // Displays the ghost icon
      return;
    }
    const symbolInfo: LibrarySymbolInfo = {
      ticker: symbolItem.ticker,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      exchange: symbolItem.exchange,
      listed_exchange: symbolItem.exchange,
      session: "24x7",
      timezone: "Etc/UTC",
      minmov: 1,
      pricescale: 10000,
      has_intraday: true,
      intraday_multipliers: ["1", "60"],
      has_daily: true,
      daily_multipliers: ["1"],
      visible_plots_set: "ohlcv",
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: "streaming",
      format: "price",
    };
    console.log("symbolInfo=====", symbolInfo, "");
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: DatafeedErrorCallback
  ) => {
    try {
      const { from, to } = periodParams;
      console.log("[getBars mock]", symbolInfo.ticker, resolution, from, to);

      // ===== 1️⃣ resolution -> 秒数 =====
      let stepSec: number;

      if (resolution === "1") {
        stepSec = 60;
      } else if (resolution === "60") {
        stepSec = 60 * 60;
      } else if (resolution === "1D") {
        stepSec = 24 * 60 * 60;
      } else {
        onError(`Invalid resolution: ${resolution}`);
        return;
      }

      // ===== 2️⃣ 控制返回数量 =====
      const MAX_BARS = 300;
      let current = from;
      let price = 50000; // 初始价格（写死）

      const bars: any[] = [];

      while (current < to && bars.length < MAX_BARS) {
        // 模拟价格波动
        const open = price;
        const change = (Math.random() - 0.5) * 200; // ±100
        const close = open + change;

        const high = Math.max(open, close) + Math.random() * 50;
        const low = Math.min(open, close) - Math.random() * 50;

        bars.push({
          time: current * 1000, // TradingView 必须是毫秒
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          volume: Math.floor(Math.random() * 10 + 1),
        });

        price = close;
        current += stepSec;
      }

      console.log(`[getBars mock]: returned ${bars.length} bars`);

      if (bars.length === 0) {
        onResult([], { noData: true });
      } else {
        onResult(bars, { noData: false });
      }
    } catch (err) {
      console.error("[getBars mock error]", err);
      onError("getBars mock error");
    }
  },
  subscribeBars: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string
  ) => {
    console.log("[subscribeBars]: Method call with subscriberUID:", listenerGuid);
  },
  unsubscribeBars: (listenerGuid: string) => {
    console.log("[unsubscribeBars]: Method call with subscriberUID:", listenerGuid);
  },
};

export default dataFeed;
