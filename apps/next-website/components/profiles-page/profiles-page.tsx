import "./profiles-page.scss";
import ProfilesPageITSection from "./profiles-page-it-section";
import ProfilesPageAdministratorSection from "./profiles-page-administrator-section";
import ProfilesPageElectricalEngineerSection from "./profiles-page-electrical-engineer-section";
import ProfilesPageElectricalAutomaticsSection from "./profiles-page-electrical-automatics-section";
import ProfilesPageElectricalDevicesSection from "./profiles-page-electrical-devices-section";

export default function ProfilesPage() {
  return (
    <div className="profiles-page" data-search-key="obrazovni-profili">
      <ProfilesPageITSection layout="image-left" />
      <ProfilesPageAdministratorSection layout="image-right" />
      <ProfilesPageElectricalEngineerSection layout="image-left" />
      <ProfilesPageElectricalAutomaticsSection layout="image-right" />
      <ProfilesPageElectricalDevicesSection layout="image-left" />
    </div>
  );
}
