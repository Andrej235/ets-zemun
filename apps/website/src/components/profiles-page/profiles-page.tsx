import ProfileOverview from "@components/profile-preview/profile-preview";
import "./profiles-page.scss";
import data from "@data/profiles.json";
import ProfileOverviewSchema from "@assets/json-data/ts-schemas/profile-overview.schema";

export default function ProfilesPage() {
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

