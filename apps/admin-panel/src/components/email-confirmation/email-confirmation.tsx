import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ConfirmEmailInstructions from "./confirm-email-instructions";
import emailConfirmationLoader from "./email-confirmation-loader";

export default function EmailConfirmation() {
  const loaderData = useLoader<typeof emailConfirmationLoader>();

  return (
    <Async await={loaderData}>
      {(code) => <EmailConfirmationPage code={code} />}
    </Async>
  );
}

function EmailConfirmationPage({
  code,
}: {
  code: "no-token" | "bad-token" | "success";
}) {
  if (code === "no-token")
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <ConfirmEmailInstructions />
      </div>
    );

  if (code === "bad-token")
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <div className="relative mx-auto mb-4">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                <AlertTriangle
                  className="h-10 w-10 text-amber-600"
                  strokeWidth={2}
                />
              </div>
            </div>
            <h1 className="text-foreground text-3xl font-bold tracking-tight">
              Verifikacija nije uspela
            </h1>
            <p className="text-muted-foreground mt-2">
              Nismo mogli da verifikujemo vašu email adresu. Proverite detalje
              ispod.
            </p>
          </div>

          <Card className="gap-2">
            <CardHeader>
              <CardTitle>Šta se desilo?</CardTitle>
              <CardDescription>
                Vaš link za verifikaciju email adrese nije mogao biti obrađen iz
                jednog od sledećih razloga:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="expired">
                  <AccordionTrigger className="text-sm font-medium">
                    Link je istekao
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Linkovi za verifikaciju važe 24 sata. Ako je prošlo više od
                    toga, potrebno je da zatražite novi email za verifikaciju.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="used">
                  <AccordionTrigger className="text-sm font-medium">
                    Link je već iskorišćen
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Svaki link za verifikaciju može biti iskorišćen samo jednom.
                    Ako ste već verifikovali email, pokušajte da se prijavite.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="invalid">
                  <AccordionTrigger className="text-sm font-medium">
                    Link je nevažeći
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Link za verifikaciju možda nije potpun ili je oštećen. Ovo
                    se može desiti ako je link prekinut u vašem emailu ili ste
                    kliknuli na nepotpun link.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical">
                  <AccordionTrigger className="text-sm font-medium">
                    Tehnički problem
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm">
                    Možda postoji privremeni tehnički problem sa našim sistemom
                    za verifikaciju. Pokušajte ponovo kasnije ili kontaktirajte
                    naš tim za podršku.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button asChild className="mb-3 w-full text-sm font-medium">
                  <Link to={"/confirm-email"}>
                    Zatražite novi email za verifikaciju
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="border-border bg-card mt-6 rounded-lg border p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-card-foreground text-sm font-medium">
                  Treba vam pomoć?
                </h3>
                <div className="text-muted-foreground mt-2 text-sm">
                  <p>
                    Ako i dalje imate problema, kontaktirajte administratora.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="relative mx-auto mb-4">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                className="h-10 w-10 text-green-600"
                strokeWidth={2}
              />
            </div>
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight">
            Email je verifikovan!
          </h1>
          <p className="text-muted-foreground mt-2">
            Vaša email adresa je uspešno verifikovana. Sada imate pun pristup
            svim funkcijama.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Šta dalje?</CardTitle>
            <CardDescription>
              Spremni ste da počnete sa korišćenjem admin panela.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                Idite na početnu stranicu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
