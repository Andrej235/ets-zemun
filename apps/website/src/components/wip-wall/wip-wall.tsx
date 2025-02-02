import Icon from "@components/icon/icon";
import "./wip-wall.scss";

export default function WipWall() {
  return (
    <div className="wip-wall">
      <h1>
        <Icon name="fa-solid fa-triangle-exclamation" /> U izradi{" "}
        <Icon name="fa-solid fa-triangle-exclamation" />
      </h1>

      <p>
        Naporno radimo da bismo vam predstavili ovu stranicu. Vratite se uskoro!
      </p>
    </div>
  );
}

