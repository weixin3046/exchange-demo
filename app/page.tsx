import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>
      <ConnectButton />
      <Button>Click me</Button>
    </div>
  );
}
