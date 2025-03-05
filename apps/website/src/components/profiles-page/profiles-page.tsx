import "./profiles-page.scss";
import ProfilesPageSection from "./profiles-page-section";

export default function ProfilesPage() {
  return (
    <div
      className="profiles-page"
      searchKey={{
        id: "obrazovni-profili",
        keywords: "searchKeys.educationProfiles.keywords",
        title: "searchKeys.educationProfiles.title",
        url: "/profili",
      }}
    >
      <h1>Obrazovni profili</h1>
      <ProfilesPageSection layout="image-left"/>
      <ProfilesPageSection layout="image-right"/>
      <ProfilesPageSection layout="image-left"/>
      <ProfilesPageSection layout="image-right"/>
      <ProfilesPageSection layout="image-left"/>
    </div>
  );
}

