import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("about");

  return <>{t("hero.title")}</>;
}
