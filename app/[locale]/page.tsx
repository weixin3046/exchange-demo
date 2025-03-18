import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div>
      <div className="flex h-96 items-center justify-center">
        <h1>{t("title")}</h1>
        <Link href="/about">{t("about")}</Link>
      </div>
    </div>
  );
}
