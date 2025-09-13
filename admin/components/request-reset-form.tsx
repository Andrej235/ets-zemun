"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle, Loader2, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "./ui/alert";

export function RequestResetForm({
  isTokenInvalid = false,
}: {
  isTokenInvalid?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitRemaining, setRateLimitRemaining] = useState(0);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rateLimitRemaining > 0) {
      setError(
        `Molimo sačekajte ${rateLimitRemaining} sekundi pre nego što zatražite novi link za resetovanje`,
      );
      return;
    }

    if (!email) {
      setError("Molimo unesite svoju email adresu");
      return;
    }

    if (!validateEmail(email)) {
      setError("Molimo unesite validnu email adresu");
      return;
    }

    setIsLoading(true);

    try {
      const promise = sendApiRequest("/users/send-reset-password-email", {
        method: "post",
        payload: {
          email,
        },
      });

      toast.promise(
        promise.then((x) => {
          if (!x.isOk) throw new Error(x.error?.message);
        }),
        {
          loading: "Molimo sačekajte...",
          success: "Link za resetovanje lozinke je poslat!",
          error: (err) => err.message || "Resetovanje lozinke nije uspelo",
        },
      );

      const result = await promise;
      if (result.isOk) {
        setIsSubmitted(true);
        setRateLimitRemaining(90);

        const countdownInterval = setInterval(() => {
          setRateLimitRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(
          result.error?.message ||
            "Došlo je do greške. Molimo pokušajte ponovo kasnije.",
        );
      }
    } catch {
      setError("Došlo je do greške. Molimo pokušajte ponovo kasnije.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {isTokenInvalid && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Ovaj link za resetovanje lozinke je nevažeći ili je istekao. Molimo
            zatražite novi.
          </AlertDescription>
        </Alert>
      )}

      {isSubmitted ? (
        <div className="space-y-4">
          <Alert className="border-green-500">
            <CheckCircle className="h-4 w-4 stroke-green-500" />
            <AlertDescription>
              Link za resetovanje lozinke je poslat! Molimo proverite svoj email
              i pratite uputstva.
            </AlertDescription>
          </Alert>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-2 text-sm font-medium text-muted-foreground">
              Šta dalje?
            </h3>
            <ol className="ml-4 list-decimal space-y-2 text-sm">
              <li>Proverite svoj email inbox za poruku od nas</li>
              <li>Kliknite na link za resetovanje lozinke u email-u</li>
              <li>Kreirajte novu lozinku na stranici koja se otvori</li>
              <li>Prijavite se sa svojom novom lozinkom</li>
            </ol>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Niste primili email?{" "}
              {rateLimitRemaining > 0 ? (
                <span>Zatražite novi link za {rateLimitRemaining}s</span>
              ) : (
                <Button
                  variant="link"
                  className="h-auto p-0 text-blue-600"
                  onClick={() => setIsSubmitted(false)}
                >
                  Pokušajte ponovo
                </Button>
              )}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email adresa</Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                placeholder="ime@primer.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className={`pl-10 ${error ? "border-red-300 focus-visible:ring-red-400" : ""}`}
              />
            </div>
            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || rateLimitRemaining > 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Slanje...
              </>
            ) : rateLimitRemaining > 0 ? (
              `Zatražite novi link (${rateLimitRemaining}s)`
            ) : (
              "Pošalji link za resetovanje"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
