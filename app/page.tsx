"use client";
import TradeLayout from "@/components/TradeLayout";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "@/store/globalStore";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { tokenList, setTokenList } = useGlobalStore();
  return (
    <div>
      <TradeLayout />
      <Button onClick={() => setTokenList(["ETH", "BTC"])}>更新 Token</Button>
      <ul>
        {tokenList.map((token) => (
          <li key={token}>{token}</li>
        ))}
      </ul>
      <ConnectButton />
    </div>
  );
}
