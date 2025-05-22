import { useTranslations } from "next-intl";

export default function Test() {
  const t = useTranslations("about");
  return <>{t("hero.tagLine")}</>;
}
