import { DepthData, DepthItem, RawDepthData } from "@/websocket/types/market";

export class DepthCalculator {
  // 计算深度数据的累计量和总信息
  static calculateDepthData(rawData: RawDepthData, maxLevels: number = 20): DepthData {
    // 处理卖单数据（asks）
    const processedAsks = this.processDepthSide(
      rawData.asks,
      "asc", // 卖单价格从低到高
      maxLevels
    );

    // 处理买单数据（注意API返回的是buys，对应bids）
    const processedBids = this.processDepthSide(
      rawData.buys,
      "desc", // 买单价格从高到低
      maxLevels
    );

    // 计算总计信息
    const total = this.calculateTotals(processedAsks, processedBids);

    return {
      asks: processedAsks,
      bids: processedBids,
      total,
    };
  }

  // 处理单边深度数据
  private static processDepthSide(
    rawItems: [string, string][],
    sortOrder: "asc" | "desc",
    maxLevels: number
  ): DepthItem[] {
    if (!rawItems || rawItems.length === 0) {
      return [];
    }

    // 转换数据类型
    let items: DepthItem[] = rawItems.map(([price, volume]) => ({
      price: parseFloat(price),
      volume: parseFloat(volume),
    }));

    // 按价格排序
    items.sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

    // 限制显示数量
    if (maxLevels > 0 && items.length > maxLevels) {
      items = items.slice(0, maxLevels);
    }

    // 计算累计量和金额
    let cumulativeVolume = 0;
    let cumulativeAmount = 0;
    const totalVolume = items.reduce((sum, item) => sum + item.volume, 0);

    items.forEach((item) => {
      const amount = item.price * item.volume;
      cumulativeVolume += item.volume;
      cumulativeAmount += amount;

      item.cumulativeVolume = cumulativeVolume;
      item.cumulativeAmount = cumulativeAmount;

      // 计算该档位占总量的百分比
      if (totalVolume > 0) {
        item.volumePercentage = (item.volume / totalVolume) * 100;
      }
    });

    return items;
  }

  // 计算总计信息
  private static calculateTotals(asks: DepthItem[], bids: DepthItem[]): DepthData["total"] {
    const totalAskVolume = asks.length > 0 ? asks[asks.length - 1].cumulativeVolume || 0 : 0;
    const totalBidVolume = bids.length > 0 ? bids[bids.length - 1].cumulativeVolume || 0 : 0;

    const totalAskAmount = asks.length > 0 ? asks[asks.length - 1].cumulativeAmount || 0 : 0;
    const totalBidAmount = bids.length > 0 ? bids[bids.length - 1].cumulativeAmount || 0 : 0;

    // 计算买卖比例（买/卖）
    const bidAskRatio = totalAskVolume > 0 ? totalBidVolume / totalAskVolume : 0;

    // 找到最大单档量
    const allItems = [...asks, ...bids];
    const maxVolumeLevel = allItems.length > 0 ? Math.max(...allItems.map((item) => item.volume)) : 0;

    return {
      totalAskVolume,
      totalBidVolume,
      totalAskAmount,
      totalBidAmount,
      bidAskRatio,
      maxVolumeLevel,
    };
  }

  // 获取价格汇总（用于显示）
  static getPriceSummary(depthData: DepthData) {
    if (!depthData.asks.length || !depthData.bids.length) {
      return null;
    }

    const bestAsk = depthData.asks[0]; // 最低卖价
    const bestBid = depthData.bids[0]; // 最高买价

    // 计算买卖价差
    const spread = bestAsk.price - bestBid.price;
    const spreadPercentage = (spread / bestBid.price) * 100;

    // 计算中间价
    const midPrice = (bestAsk.price + bestBid.price) / 2;

    return {
      bestAsk: bestAsk.price,
      bestBid: bestBid.price,
      spread,
      spreadPercentage,
      midPrice,
      bestAskVolume: bestAsk.volume,
      bestBidVolume: bestBid.volume,
    };
  }

  // 根据价格查找深度（用于计算特定价格的挂单量）
  static findDepthAtPrice(
    depthData: DepthData,
    price: number
  ): {
    askVolume: number;
    bidVolume: number;
    totalVolume: number;
  } {
    const ask = depthData.asks.find((item) => item.price === price);
    const bid = depthData.bids.find((item) => item.price === price);

    return {
      askVolume: ask ? ask.volume : 0,
      bidVolume: bid ? bid.volume : 0,
      totalVolume: (ask ? ask.volume : 0) + (bid ? bid.volume : 0),
    };
  }

  // 获取累计深度（用于深度图）
  static getCumulativeDepth(
    depthData: DepthData,
    steps: number = 50
  ): {
    prices: number[];
    cumulativeAsks: number[];
    cumulativeBids: number[];
  } {
    if (!depthData.asks.length || !depthData.bids.length) {
      return { prices: [], cumulativeAsks: [], cumulativeBids: [] };
    }

    const minPrice = depthData.bids[depthData.bids.length - 1].price;
    const maxPrice = depthData.asks[depthData.asks.length - 1].price;
    const priceRange = maxPrice - minPrice;
    const stepSize = priceRange / steps;

    const prices: number[] = [];
    const cumulativeAsks: number[] = [];
    const cumulativeBids: number[] = [];

    for (let i = 0; i <= steps; i++) {
      const price = minPrice + stepSize * i;
      prices.push(price);

      // 查找小于等于该价格的卖单累计量
      const askItem = depthData.asks.findLast((item) => item.price <= price);
      cumulativeAsks.push(askItem?.cumulativeVolume || 0);

      // 查找大于等于该价格的买单累计量
      const bidItem = depthData.bids.find((item) => item.price >= price);
      cumulativeBids.push(bidItem?.cumulativeVolume || 0);
    }

    return { prices, cumulativeAsks, cumulativeBids };
  }
}
