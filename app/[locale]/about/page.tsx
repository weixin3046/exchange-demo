import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <div className="flex h-96 items-center justify-center">
      <h3>{t("title")}</h3>
      <p>{t("content")}</p>
    </div>
  );
}
