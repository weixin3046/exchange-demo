import LocaleSwitcher from "@/components/LocaleSwitcher";
import TradeLayout from "@/components/TradeLayout";
import { Link } from "@/i18n/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslations } from "next-intl";

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
