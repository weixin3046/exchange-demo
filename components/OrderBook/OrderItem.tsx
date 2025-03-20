import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function OrderItem({ type, item, total = 0 }: { type: "buy" | "sell"; item: number[]; total?: number }) {
  const [radio, setRadio] = useState(0);
  //   const radio = useMemo(() => {
  //     if (item.length > 0 && total > 0) {
  //       return (item[2] / total) * 100;
  //     }
  //     return 0;
  //   }, [item, total]);
  useEffect(() => {
    setInterval(() => {
      setRadio(Math.floor(Math.random() * 100));
    }, 1000);
  }, []);
  console.log(total);
  return (
    <div
      className="relative flex h-5 w-full items-center overflow-hidden text-xs font-medium"
      onClick={() => {
        console.log("点击了订单");
      }}
    >
      <div className={cn("flex-1", type == "buy" ? "text-down-text" : "text-up-text")}>
        {item?.length ? item[0] : "--"}
      </div>
      <div className="flex-1 text-right">{item?.length ? item[1] : "--"}</div>
      <div className="flex-1 text-right">{item?.length ? item[2] : "--"}</div>
      <div
        className={cn(
          type === "sell" ? "bg-down-bg-rgb/15" : "bg-up-bg-rgb/15",
          `absolute left-full h-[calc(100%-2px)] w-full transition duration-300 ease-in-out`
        )}
        style={{
          transform: "translate3d(-" + radio + "%, 0px, 0px)",
        }}
      />
    </div>
  );
}
