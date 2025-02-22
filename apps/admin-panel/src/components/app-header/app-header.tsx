import FocusTrap from "focus-trap-react";
import { forwardRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./app-header.scss";

const AppHeader = forwardRef<HTMLDivElement>((_, ref) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  function handleLanguageChange(value: string) {
    i18n.changeLanguage(value);
    navigate(0);
  }

  return (
    <FocusTrap
      active={isHamburgerMenuOpen}
      focusTrapOptions={{
        escapeDeactivates: true,
        allowOutsideClick: false,
        clickOutsideDeactivates: false,
        onDeactivate: () => setIsHamburgerMenuOpen(false),
      }}
    >
      <div id="app-header" ref={ref}>
        <Select
          defaultValue={i18n.language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Izaberite jezik" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="sr_cr">Српски</SelectItem>
              <SelectItem value="sr_lt">Srpski</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Link
          to="/"
          className="logo"
          tabIndex={isHamburgerMenuOpen ? -1 : undefined}
          aria-hidden={isHamburgerMenuOpen}
        >
          <img src="/logo.png" alt="Logo" />
        </Link>

        <div className="app-header-navigation">
          <div className="nav-bar">
            <Link to="/">Pocetna</Link>
            <Link to="/vesti">Vesti</Link>
          </div>
        </div>

        <div className="background" />
      </div>
    </FocusTrap>
  );
});

export default AppHeader;

