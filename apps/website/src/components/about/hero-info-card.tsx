import Icon from "@components/icon/icon";
import { Link } from "react-router";

type HeroInfoCardProps = {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly url: string;
};

export default function HeroInfoCard({
  description,
  icon,
  title,
  url,
}: HeroInfoCardProps) {
  return (
    <div className="hero-block-element">
      <Icon name={icon} className="hero-block-icon" />
      <div className="hero-block-info">
        <div className="hero-block-header">{title}</div>
        <div className="hero-block-description">
          <p>{description}</p>

          <Link to={url} className="hero-block-button">
            <span>Saznaj vise</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

