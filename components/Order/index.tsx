import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderBook from "../OrderBook";

export default function Order() {
  return (
    <Tabs defaultValue="order_book">
      <TabsList className="bg-transparent">
        <TabsTrigger value="order_book" className="border-0 bg-transparent">
          Order Book
        </TabsTrigger>
        <TabsTrigger value="order_list">Order List</TabsTrigger>
      </TabsList>
      <TabsContent value="order_book">
        <OrderBook />
      </TabsContent>
      <TabsContent value="order_list">Change your password here.</TabsContent>
    </Tabs>
  );
}
