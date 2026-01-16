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
export interface KlineData {
  id: number; // 时间戳（秒）
  open: number; // 开盘价
  high: number; // 最高价
  low: number; // 最低价
  close: number; // 收盘价
  vol: number; // 成交量
  amount: number; // 成交额
  ds: string;
}
export interface TVKlineBar {
  time: number; // 时间戳（毫秒）
  open: number; // 开盘价
  high: number; // 最高价
  low: number; // 最低价
  close: number; // 收盘价
  volume: number; // 成交量
}

class TVDataFeed implements IDatafeedChartApi {
  // 接收外部传入的 SocketManager 实例
  private socketManager: SocketManager;
  private lastBarTimeMap = new Map<string, number>();
  private subscriptionMap = new Map<string, { channel: string; cbId: string }>();
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

  public resolveSymbol(symbolName: string, onSymbolResolvedCallback: ResolveCallback): void {
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
      // currency_code: "USDT",
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
    onHistoryCallback: HistoryCallback
  ): void {
    const { firstDataRequest } = periodParams;
    const klineResolution = SUPPORTED_RESOLUTIONS[resolution];
    const channel = this.getKlineChannel(symbolInfo.name, klineResolution);
    const lastTime = this.lastBarTimeMap.get(channel);
    const params = {
      channel,
      cb_id: symbolInfo.name,
      ...(!firstDataRequest && {
        endIdx: lastTime,
        pageSize: 50,
      }),
    };
    this.socketManager.subscribeToHistory(channel, params, (data) => {
      const bars = this.formatBars(data);
      if (bars.length === 0) {
        onHistoryCallback([], { noData: true });
      } else {
        this.lastBarTimeMap.set(channel, bars[0].time / 1000);
        onHistoryCallback(bars, { noData: false });
      }
    });
  }

  public subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string
  ): void {
    const klineResolution = SUPPORTED_RESOLUTIONS[resolution];
    const channel = this.getKlineChannel(symbolInfo.name, klineResolution);

    this.subscriptionMap.set(listenerGuid, {
      channel,
      cbId: symbolInfo.name,
    });

    this.socketManager.subscribeToRealtime(channel, symbolInfo.name, (data) => {
      const newBar = this.formatSingleBar(data);
      onTick(newBar);
    });
  }

  public unsubscribeBars(listenerGuid: string): void {
    const sub = this.subscriptionMap.get(listenerGuid);
    if (!sub) return;
    this.socketManager.unsubscribe(sub.channel, sub.cbId);
    this.subscriptionMap.delete(listenerGuid);
    this.lastBarTimeMap.clear();
  }

  // --- 辅助方法（数据格式转换，不变） ---
  private formatBars(dataArray: KlineData[]) {
    const bars: TVKlineBar[] = [];
    dataArray.forEach((bar) => {
      bars.push({
        time: bar.id * 1000,
        low: bar.low,
        high: bar.high,
        open: bar.open,
        close: bar.close,
        volume: bar.vol || 0,
      });
    });
    return bars;
  }
  private formatSingleBar(item: KlineData) {
    return {
      time: item.id * 1000,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.vol || 0,
    };
  }

  private getKlineChannel(symbol: string, resolution: string) {
    return `market_${symbol}_kline_${resolution}`;
  }
  public searchSymbols(): void {}
}

export default TVDataFeed;
