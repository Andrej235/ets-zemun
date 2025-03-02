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
      <ProfilesPageSection />
    </div>
  );
}

