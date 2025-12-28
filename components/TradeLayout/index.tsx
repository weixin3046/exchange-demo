"use client";
import { useLayoutStore } from "@/store/layoutState";
import { useMarketData } from "@/websocket/useMarketData";
import { useState } from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CandlestickChart from "../CandlestickChart";
import Order from "../Order";
import DragHandle from "./DragHandle";

// TODO: 这里建议用zustand来做持久化
// const getLayoutsFromLocalStorage = (): Layouts | null => {
//   try {
//     const savedLayouts = localStorage.getItem(LOCAL_STORAGE_KEY);
//     return savedLayouts ? (JSON.parse(savedLayouts) as Layouts) : null;
//   } catch (e) {
//     console.error("Error loading layouts from localStorage", e);
//     return null;
//   }
// };

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function TradeLayout() {
  const { layouts, setLayouts } = useLayoutStore();
  const [selectedSymbol, setSelectedSymbol] = useState("btcusdt");
  // const [depthLevels, setDepthLevels] = useState(12);
  const { tradeData, depthData } = useMarketData(selectedSymbol);
  const handleLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
  };

  const handleListClick = (e: React.MouseEvent<HTMLUListElement>) => {
    if (e.target instanceof HTMLLIElement) {
      const value = e.target.dataset.value;
      if (value) {
        setSelectedSymbol(value);
      }
    }
  };

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 10, md: 8, sm: 6 }}
        margin={[3, 3]}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
      >
        <div key="market-list" className="bg-gray-800 p-2 text-white">
          <DragHandle>市场列表</DragHandle>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">数字货币市场</h1>
            <ul onClick={handleListClick} className="py-3">
              <li className="cursor-pointer p-2 hover:bg-gray-700" data-value="btcusdt">
                BTC/USDT
              </li>
              <li className="cursor-pointer p-2 hover:bg-gray-700" data-value="ethusdt">
                ETH/USDT
              </li>
              <li className="cursor-pointer p-2 hover:bg-gray-700" data-value="bnbusdt">
                BNB/USDT
              </li>
            </ul>
          </div>
        </div>
        <div key="chart" className="bg-gray-900 p-2 text-white">
          <DragHandle>K 线图</DragHandle>
          <CandlestickChart symbol="BTC/USDT" wsUrl="wss://wspri.okx.com:8443/ws/v5/ipublic" />
        </div>
        <div key="order-book" className="bg-gray-800 p-2 text-white">
          <DragHandle>订单簿</DragHandle>
          {depthData ? (
            <Order depthData={depthData} tradeData={tradeData} />
          ) : (
            <div className="flex h-40 items-center justify-center">暂无深度数据</div>
          )}
        </div>
        <div key="order-panel" className="bg-gray-800 p-2 text-white">
          <DragHandle>下单面板</DragHandle>
        </div>
        <div key="positions" className="bg-gray-900 p-2 text-white">
          <DragHandle>持仓 & 订单</DragHandle>
        </div>
        <div key="information" className="bg-gray-900 p-2 text-white">
          <DragHandle>币对信息</DragHandle>
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
