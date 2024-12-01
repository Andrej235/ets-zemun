import { Link } from "react-router";
import "./InfoCard.scss";
import Icon from "../Icon/Icon";

type InfoCardProps = {
  title: string;
  text: string;
  icon: string;
  link: string;
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
