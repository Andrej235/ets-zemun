import "./profiles-page.scss";
import ProfilesPageSection from "./profiles-page-section";

export default function ProfilesPage() {
  return (
    <div className="profiles-page">
      <h1>Obrazovni profili</h1>
      <ProfilesPageSection layout="image-left"/>
      <ProfilesPageSection layout="image-right"/>
    </div>
  );
}

