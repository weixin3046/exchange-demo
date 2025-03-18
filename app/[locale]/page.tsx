import LocaleSwitcher from "@/components/LocaleSwitcher";
import TradeLayout from "@/components/TradeLayout";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <LocaleSwitcher />
      <div>
        <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
      </div>
      <TradeLayout />
      <ConnectButton />
    </div>
  );
}
