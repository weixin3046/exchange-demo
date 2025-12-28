import NewTrade from "@/app/[locale]/market/NewTrade";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DepthData, TradeData } from "@/websocket/types/market";
import OrderBook from "../OrderBook";

export default function Order({ depthData, tradeData }: { depthData: DepthData; tradeData: TradeData[] }) {
  return (
    <Tabs defaultValue="order_book">
      <TabsList className="bg-transparent">
        <TabsTrigger value="order_book" className="border-0 bg-transparent">
          Order Book
        </TabsTrigger>
        <TabsTrigger value="order_list">Order List</TabsTrigger>
      </TabsList>
      <TabsContent value="order_book">
        <OrderBook depthData={depthData} latestTrade={tradeData[0]} />
      </TabsContent>
      <TabsContent value="order_list">
        <NewTrade tradeData={tradeData} />
        {/* <DepthTable depthData={depthData} maxLevels={depthLevels} showTotals={true} /> */}
      </TabsContent>
    </Tabs>
  );
}
