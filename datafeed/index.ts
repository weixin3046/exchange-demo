// TVDataFeed.ts
import { SUPPORTED_RESOLUTIONS } from "@/constants/tradingview";
import { SocketManager } from "@/lib/WebSocketManager";
import {
  HistoryCallback,
  IDatafeedChartApi,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SubscribeBarsCallback,
} from "@/public/charting_library";

class TVDataFeed implements IDatafeedChartApi {
  // 接收外部传入的 SocketManager 实例
  private socketManager: SocketManager;
  private subscribers: Map<string, SubscribeBarsCallback> = new Map();
  private activeSubscriptions: Map<string, { channelName: string; cbId: string }> = new Map();

  // 构造函数现在接收一个已准备好的 SocketManager
  constructor(manager: SocketManager) {
    this.socketManager = manager;
    // 注意：这里的实时数据处理逻辑需要依赖于 SocketManager 内部的监听器分发机制
    // 如果您的 SocketManager 设计是每个请求都有独立回调，这里不需要额外操作
  }

  // --- API 方法实现（与之前基本一致，只是调用 this.socketManager） ---

  public onReady(callback: OnReadyCallback): void {
    // ... （配置逻辑不变）
    setTimeout(
      () =>
        callback({
          supported_resolutions: Object.keys(SUPPORTED_RESOLUTIONS) as ResolutionString[],
          supports_marks: false,
          supports_timescale_marks: false,
          supports_time: true,
        }),
      0
    );
  }

  public resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: ResolveCallback,
    onErrorCallback: (reason: string) => void
  ): void {
    // ... （商品信息解析逻辑不变）
    const symbolInfo: LibrarySymbolInfo = {
      //  unit_id: visualMultiplier.toString(),
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
      pricescale: 100,
    };
    onSymbolResolvedCallback(symbolInfo);
  }

  public getBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onHistoryCallback: HistoryCallback,
    onErrorCallback: (reason: string) => void
  ): void {
    // ... （调用 socketManager.subscribeToHistory）
    const channelName = `market_${symbolInfo.ticker!.toLowerCase()}_kline_1min`;
    const cbId = `history_${channelName}_${periodParams.from}_${periodParams.to}`;
    this.socketManager.subscribeToHistory(channelName, cbId, (data) => {
      console.log(data);
      const bars = this.formatBars(data);
      if (bars.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        onHistoryCallback(bars, { noData: false });
      }
    });
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
    onResetCacheNeededCallback: () => void
  ): void {
    console.log(222);
    // ... （调用 socketManager.subscribeToRealtime）
    const channelName = `market_${symbolInfo.ticker!.toLowerCase()}_kline_${resolution}`;
    const cbId = `${channelName}_${listenerGuid}`;

    this.subscribers.set(listenerGuid, onTick);
    this.activeSubscriptions.set(listenerGuid, { channelName, cbId });

    this.socketManager.subscribeToRealtime(channelName, cbId, (data) => {
      const newBar = this.formatSingleBar(data);
      onTick(newBar);
    });
  }

  public unsubscribeBars(listenerGuid: string): void {
    // ... （调用 socketManager.unsubscribe）
    const subscription = this.activeSubscriptions.get(listenerGuid);
    if (subscription) {
      this.socketManager.unsubscribe(subscription.channelName, subscription.cbId);
      this.subscribers.delete(listenerGuid);
      this.activeSubscriptions.delete(listenerGuid);
    }
  }

  // --- 辅助方法（数据格式转换，不变） ---
  private formatBars(dataArray: any[]): any[] {
    /* ... */ return [];
  }
  private formatSingleBar(item: any): any {
    /* ... */ return {};
  }
  public searchSymbols(): void {}
}

export default TVDataFeed;
