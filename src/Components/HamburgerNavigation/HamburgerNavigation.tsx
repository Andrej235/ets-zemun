import "./HamburgerNavigation.scss";

type HamburgerNavigationProps = {
  isMenuActive: boolean;
};

export default function HamburgerNavigation({
  isMenuActive,
}: HamburgerNavigationProps) {
  return (
    <div
      className={`hamburger-navigation${
        !isMenuActive ? " navigation-not-active" : ""
      }`}
    ></div>
  );
}
