import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import ConfirmEmailInstructions from "@/components/confirm-email-instructions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export default async function EmailConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string; email: string }>;
}) {
  const { token, email } = await searchParams;

  //User got here without token, act as a normal page
  if (!token || !email)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <ConfirmEmailInstructions />
      </div>
    );

  //User got here with token, confirm email and display results
  const { isOk } = await sendApiRequestSSR("/users/confirm-email", {
    method: "post",
    payload: {
      email,
      token,
    },
  });

  if (!isOk)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Verifikacija nije uspela
            </h1>
            <p className="mt-2 text-muted-foreground">
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
                  <AccordionContent className="text-sm text-muted-foreground">
                    Linkovi za verifikaciju važe 24 sata. Ako je prošlo više od
                    toga, potrebno je da zatražite novi email za verifikaciju.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="used">
                  <AccordionTrigger className="text-sm font-medium">
                    Link je već iskorišćen
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Svaki link za verifikaciju može biti iskorišćen samo jednom.
                    Ako ste već verifikovali email, pokušajte da se prijavite.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="invalid">
                  <AccordionTrigger className="text-sm font-medium">
                    Link je nevažeći
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Link za verifikaciju možda nije potpun ili je oštećen. Ovo
                    se može desiti ako je link prekinut u vašem emailu ili ste
                    kliknuli na nepotpun link.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical">
                  <AccordionTrigger className="text-sm font-medium">
                    Tehnički problem
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Možda postoji privremeni tehnički problem sa našim sistemom
                    za verifikaciju. Pokušajte ponovo kasnije ili kontaktirajte
                    naš tim za podršku.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6">
                <Button asChild className="mb-3 w-full text-sm font-medium">
                  <Link href={"/confirm-email"}>
                    Zatražite novi email za verifikaciju
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-card-foreground">
                  Treba vam pomoć?
                </h3>
                <div className="mt-2 text-sm text-muted-foreground">
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Email je verifikovan!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Vaša email adresa je uspešno verifikovana. Sada imate pun pristup
            svim funkcijama.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Šta dalje?</CardTitle>
            <CardDescription>
              Zatražite pristup aplikaciji od administratora. Nakon što
              administrator odobri vaš zahtev, moći ćete da se prijavite i
              koristite admin panel.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">
                Idite na login stranicu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
