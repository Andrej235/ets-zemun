import "./profile-preview.scss";
import { Link } from "react-router";
import PreviewCard, {
  PreviewCardLayout,
} from "@components/preview-card/preview-card";
import ProfileOverviewSchema from "@assets/json-data/ts-schemas/profile-overview.schema";

type ProfileOverviewProps = {
  readonly profile: ProfileOverviewSchema;
  readonly layout: PreviewCardLayout;
};

export default function ProfileOverview({
  profile,
  layout,
}: ProfileOverviewProps) {
  function getInfoClassname(layout: PreviewCardLayout) {
    switch (layout) {
      case "image-left":
        return "info-right";
      case "image-right":
        return "info-left";
      case "vertical":
      default:
        return "vertical";
    }
  }

  return (
    <PreviewCard
      layout={layout}
      imagePath={profile.imagePath}
      imageAlt={profile.name}
    >
      <div className={`info ${getInfoClassname(layout)}`}>
        <Link to={`/profili/${profile.profileURL[0]}`}>
          <h1 className="title">{profile.name}</h1>
        </Link>

        <p className="description">{profile.description}</p>
      </div>
    </PreviewCard>
  );
}

