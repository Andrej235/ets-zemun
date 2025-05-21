import { FocusTrap } from "focus-trap-react";
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
import { Button } from "../ui/button";

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
      <div
        id="app-header"
        ref={ref}
        className="bg-card text-foreground fixed top-0 z-10 flex h-24 w-full items-center justify-between px-8 text-center text-2xl shadow-[0_2px_15px_var(--tw-shadow-color)]"
      >
        <Select
          defaultValue={i18n.language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Izaberite jezik" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="sr">Српски</SelectItem>
              <SelectItem value="sr_lt">Srpski</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex *:p-6 *:text-xl">
          <Button asChild variant="ghost">
            <Link to="/">Pocetna</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/vesti">Vesti</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/jezici">Jezici</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/predmeti">Predmeti</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/profili">Profili</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/nastavnici">Nastavnici</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/nagrade">Nagrade</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/korisnici">Korisnici</Link>
          </Button>
        </div>
      </div>
    </FocusTrap>
  );
});

export default AppHeader;
