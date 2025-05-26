import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AwardsCard from "./awards-card";
import "./awards.scss";

type AwardsProps = {
  awards: Schema<"AwardResponseDto">[];
};

export default function Awards({ awards }: AwardsProps) {
  const t = useTranslations();

  return (
    <div className="awards-pages" data-search-key="takmicenja-i-nagrade">
      <h1>{t("awards.title")}</h1>
      <div className="awards-list">
        {awards.map((award) => (
          <Link
            className="award-card-link"
            href={award.externalLink ?? "/takmicenja"}
            key={award.id}
          >
            <AwardsCard award={award} />
          </Link>
        ))}
      </div>
    </div>
  );
}
