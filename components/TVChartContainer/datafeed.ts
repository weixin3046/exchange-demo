import { SUPPORTED_RESOLUTIONS } from "@/constants";
import {
  HistoryCallback,
  IBasicDataFeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback,
} from "@/public/charting_library";
import { subscribeOnStream, unsubscribeFromStream } from "./streaming";

const resolutionValues = SUPPORTED_RESOLUTIONS.map((item) => item.value.toString());
// const webSocketManager = getWebSocketManager();
export class DataFeed extends EventTarget implements IBasicDataFeed {
  private lastBarsCache = new Map();
  onReady(callback: OnReadyCallback) {
    console.log("[onReady]: Method call");
    setTimeout(() => {
      callback({
        supported_resolutions: resolutionValues as ResolutionString[],
        supports_marks: false,
        supports_timescale_marks: false,
        supports_time: true,
      });
    });
  }
  searchSymbols() {
    console.log("[searchSymbols]: Method call");
  }
  resolveSymbol(symbolName: string, onResolve: ResolveCallback) {
    const symbolInfo: LibrarySymbolInfo = {
      unit_id: "jerry",
      name: symbolName,
      type: "crypto",
      description: `${symbolName}/USD`,
      ticker: symbolName,
      session: "24x7",
      minmov: 1,
      timezone: "Etc/UTC",
      has_intraday: true,
      has_daily: true,
      currency_code: "USD",
      data_status: "streaming",
      visible_plots_set: "ohlc",
      exchange: "GMX",
      listed_exchange: "GMX",
      format: "price",
      pricescale: 1000,
    };

    setTimeout(() => {
      onResolve(symbolInfo);
    }, 0);
  }
  getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback
  ) {
    //  const { from, to, firstDataRequest } = periodParams;
    //  if (firstDataRequest) {
    //             this.lastBarsCache.set(symbolInfo.ticker, { });
    //         }
    onResult([], { noData: true });
  }
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ) {
    console.log(symbolInfo);
    subscribeOnStream(
      symbolInfo,
      resolution,
      onTick,
      listenerGuid,
      onResetCacheNeededCallback,
      // Pass the last bar from cache if available
      this.lastBarsCache.get(symbolInfo.ticker)
    );
  }
  unsubscribeBars(subscriberUID: string) {
    unsubscribeFromStream(subscriberUID);
  }
  destroy() {
    // Object.values(this.subscriptions).forEach((subscription) => subscription.destroy());
    // document.removeEventListener("visibilitychange", this.visibilityHandler);
  }
}
