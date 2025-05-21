import { Button } from "../ui/button";
import { Link } from "react-router";
import { Separator } from "../ui/separator";

export default function AppFooter() {
  return (
    <footer className="bg-card w-full gap-8 space-y-4 border-t-2 px-32 py-12">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <h1 className="text-primary mb-2 text-3xl">Admin Panel</h1>

          <p className="text-muted-foreground text-1xl">
            CMS platforma napravljena za upravljanje sadržajem sajta. Omogucava
            kreiranje i izmenu vesti, predmeta, obrazovnih profila, nastavnika i
            nagrada. Administratori takodje mogu upravljati i pristupom ovom
            sajtu.
          </p>
        </div>

        <div className="flex flex-col *:justify-start *:p-6 *:text-xl">
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
        </div>

        <div className="flex flex-col *:justify-start *:p-6 *:text-xl">
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

      <Separator orientation="horizontal" />

      <div className="flex h-8 items-center gap-4">
        <p className="copy">
          &copy; {new Date().getFullYear()} Elektrotehnička škola "Zemun"
        </p>

        <Separator orientation="vertical" className="max-h-6" />

        <p className="credits">
          <span>Sajt napravio: </span>
          <a
            href="https://www.nenadic.dev"
            target="_blank"
            className="hover:text-primary focus-visible:text-primary font-semibold transition-colors"
            rel="noreferrer"
          >
            Andrej Nenadić
          </a>
        </p>
      </div>
    </footer>
  );
}
