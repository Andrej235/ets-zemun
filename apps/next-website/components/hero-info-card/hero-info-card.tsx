import Icon from "@/components/icon/icon";
import "./hero-info-card.scss";
import { useTranslations } from "next-intl";
import Link from "next/link";

type HeroInfoCardProps = {
  readonly icon: string;
  readonly title: string;
  readonly description?: string;
  readonly onClick?: (sectionName: string) => void;
  readonly sectionName?: string;
  readonly url?: string;
  readonly isActive?: boolean;
};

export default function HeroInfoCard({
  description,
  icon,
  title,
  onClick,
  sectionName,
  url,
  isActive,
}: HeroInfoCardProps) {
  const t = useTranslations();

  const handleClick = () => {
    if (onClick && sectionName) {
      onClick(sectionName);
    }
  };

  return (
    <button
      className={`hero-block-element${isActive ? " active" : ""}`}
      onClick={url ? undefined : handleClick}
    >
      <Icon name={icon} className="hero-block-icon" />
      <div className="hero-block-info">
        <div className="hero-block-header">{title}</div>
        <div className="hero-block-description">
          {description && <p>{description}</p>}
          {url && (
            <Link href={url} className="hero-block-button">
              <span>{t("heroInfoCard.button")}</span>
            </Link>
          )}
        </div>
      </div>
    </button>
  );
}
