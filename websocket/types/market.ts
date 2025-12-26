// 盘口单条数据
export interface DepthItem {
  price: number;
  volume: number;
  // 累计量
  cumulativeVolume?: number;
  cumulativeAmount?: number;
  // 占总量的百分比
  volumePercentage?: number;
}

// 盘口数据
export interface DepthData {
  asks: DepthItem[]; // 卖单，价格从低到高
  bids: DepthItem[]; // 买单，价格从高到低
  // 总计信息
  total?: {
    totalAskVolume: number;
    totalBidVolume: number;
    totalAskAmount: number;
    totalBidAmount: number;
    bidAskRatio: number; // 买卖比例
    maxVolumeLevel: number; // 最大单档量
  };
}

// 原始盘口数据格式
export interface RawDepthData {
  asks: [string, string][]; // [价格, 数量]
  buys: [string, string][]; // 注意：API返回的是buys，不是bids
}

export interface TradeData {
  amount: string;
  ds: string;
  price: string;
  side: string;
  ts: number;
  vol: string;
}

export interface TradeTickData {
  data: TradeData[];
}
