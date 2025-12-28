import { cn } from "@/lib/utils";

interface OrderItemType {
  price: number;
  volume: number;
  cumulativeVolume?: number;
}

export default function OrderItem({
  item,
  isAsk,
  maxCumulativeVolume,
}: {
  item: OrderItemType;
  isAsk: boolean;
  maxCumulativeVolume: number;
}) {
  const widthPercentage = maxCumulativeVolume > 0 ? ((item.cumulativeVolume || 0) / maxCumulativeVolume) * 100 : 0;

  return (
    <div
      className="relative flex h-5 w-full items-center overflow-hidden text-xs font-medium"
      onClick={() => {
        console.log("点击了订单");
      }}
    >
      {/* 价格 */}
      <div className={cn("w-1/3", isAsk ? "text-up-text" : "text-down-text")}>
        {item.price.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      {/* 数量 */}
      <div className="w-1/3 text-right">
        {item.volume.toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </div>
      {/* 累计 */}
      <div className="w-1/3 text-right">
        {(item.cumulativeVolume || 0).toLocaleString(undefined, {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}
      </div>
      <div
        className={cn(
          isAsk ? "bg-down-bg-rgb/15" : "bg-up-bg-rgb/15",
          `absolute left-full h-[calc(100%-2px)] w-full transition duration-300 ease-in-out`
        )}
        style={{
          transform: "translate3d(-" + widthPercentage + "%, 0px, 0px)",
        }}
      />
    </div>
  );
}
