import ProfileOverview from "../ProfileOverview/ProfileOverview";
import "./Profiles.scss";
import * as data from "@data/profiles.json";

export default function Profiles() {
  return (
    <div className="profiles-page">
      {data.profiles.map((profile) => (
        <ProfileOverview
          name={profile.name}
          briefDescription={profile.description}
          image={profile.imagePath}
          key={profile.name}
          layout="vertical"
        />
      ))}
    </div>
  );
}
