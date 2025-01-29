import { Link } from "react-router";
import "./info-card.scss";
import Icon from "@components/icon/icon";

type InfoCardProps = {
  readonly title: string;
  readonly text: string;
  readonly icon: string;
  readonly link: string;
};

export default function InfoCard({ icon, link, text, title }: InfoCardProps) {
  return (
    <div className="info-card">
      <Icon name={icon} />
      <Link to={link}>
        <h1>{title}</h1>
      </Link>
      <p>{text}</p>
    </div>
  );
}

