import "./profiles-page.scss";
import ProfilesPageITSection from "./profiles-page-it-section";
import ProfilesPageAdministratorSection from "./profiles-page-administrator-section";
import ProfilesPageElecticalEngineerSection from "./profiles-page-electical-engineer";

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
      <ProfilesPageITSection layout="image-left"/>
      <ProfilesPageAdministratorSection layout="image-right"/>
      <ProfilesPageElecticalEngineerSection layout="image-left"/>
      <ProfilesPageITSection layout="image-right"/>
      <ProfilesPageITSection layout="image-left"/>
    </div>
  );
}

