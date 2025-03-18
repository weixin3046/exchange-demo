import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  return (
    <div>
      <h3>{t("title")}</h3>
      <p>{t("content")}</p>
    </div>
  );
}
