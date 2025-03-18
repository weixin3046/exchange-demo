import { Layouts } from "react-grid-layout";

export const LOCAL_STORAGE_KEY = "grid-layouts";

export const DEFAULT_LAYOUTS: Layouts = {
  lg: [
    { i: "market-list", x: 0, y: 0, w: 2, h: 6 },
    { i: "chart", x: 2, y: 0, w: 6, h: 3 },
    { i: "order-book", x: 8, y: 0, w: 2, h: 6 },
    { i: "order-panel", x: 2, y: 4, w: 6, h: 3 },
    { i: "positions", x: 0, y: 6, w: 8, h: 3 },
    { i: "information", x: 8, y: 6, w: 2, h: 3 },
  ],
  md: [
    { i: "market-list", x: 0, y: 0, w: 2, h: 5 }, // 市场列表稍微变小
    { i: "chart", x: 3, y: 0, w: 6, h: 3 }, // K线图稍微变小
    { i: "order-book", x: 8, y: 0, w: 2, h: 2 }, // 订单簿维持宽度
    { i: "order-panel", x: 2, y: 3, w: 4, h: 2 }, // 下单面板紧跟K线图
    { i: "positions", x: 0, y: 5, w: 6, h: 3 }, // 持仓 & 订单占据较大空间
    { i: "information", x: 6, y: 5, w: 2, h: 3 }, // 资讯区缩小一些
  ],
  sm: [
    { i: "market-list", x: 0, y: 0, w: 6, h: 4 }, // 适应小屏，单列布局
    { i: "chart", x: 0, y: 4, w: 6, h: 5 }, // K 线图占更大空间
    { i: "order-book", x: 0, y: 9, w: 6, h: 4 }, // 订单簿下移
    { i: "order-panel", x: 0, y: 13, w: 6, h: 4 }, // 下单面板继续往下
    { i: "positions", x: 0, y: 17, w: 6, h: 4 }, // 持仓 & 订单
    { i: "information", x: 0, y: 21, w: 6, h: 3 }, // 资讯区最下面
  ],
};
