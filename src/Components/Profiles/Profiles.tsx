import ProfileOverviewSchema from "src/assets/json-data/ts-schemas/profile-overview.schema";
import ProfileOverview from "../ProfileOverview/ProfileOverview";
import "./Profiles.scss";
import * as data from "@data/profiles.json";

export default function Profiles() {
  return (
    <div className="profiles-page">
      {data.profiles.map((profile) => (
        <ProfileOverview
          profile={profile as ProfileOverviewSchema}
          key={profile.name}
          layout="vertical"
        />
      ))}
    </div>
  );
}
