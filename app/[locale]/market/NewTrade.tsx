import { cn } from "@/lib/utils";
import { TradeData } from "@/websocket/types/market";
import { List, type RowComponentProps } from "react-window";

function RowComponent({
  index,
  tradeData,
  style,
}: RowComponentProps<{
  tradeData: TradeData[];
}>) {
  return (
    <div style={style} className="flex w-full items-center">
      <div className={cn("w-1/3", tradeData[index].side === "BUY" ? "text-up-text" : "text-down-text")}>
        ${parseFloat(tradeData[index].price).toLocaleString()}
      </div>
      <div className="w-1/3 text-right">{parseFloat(tradeData[index].vol).toFixed(4)}</div>
      <div className="w-1/3 text-right">{tradeData[index].ds.split(" ")[1]}</div>
    </div>
  );
}

export default function NewTrade({ tradeData }: { tradeData: TradeData[] }) {
  return (
    <div className="rounded-lg shadow lg:col-span-2">
      <div className="text-text-tertiary mb-2 flex items-center text-xs font-medium">
        <div className="w-1/3 font-semibold">价格</div>
        <div className="w-1/3 text-right font-semibold">数量</div>
        <div className="w-1/3 text-right font-semibold">时间</div>
      </div>
      <div className="h-[360px] text-xs font-medium">
        <List rowComponent={RowComponent} rowCount={tradeData.length} rowHeight={20} rowProps={{ tradeData }} />
      </div>
    </div>
  );
}
