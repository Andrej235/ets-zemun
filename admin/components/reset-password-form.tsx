"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

export function ResetPasswordForm({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Lozinka mora imati najmanje 8 karaktera");
      return;
    }

    setIsLoading(true);

    try {
      const promise = sendApiRequest("/users/reset-password", {
        method: "patch",
        payload: {
          email,
          newPassword: password,
          token,
        },
      });

      toast.promise(
        promise.then((x) => {
          if (!x.isOk) throw new Error(x.error?.message);
        }),
        {
          loading: "Molimo sačekajte...",
          success: "Lozinka je uspešno promenjena!",
          error: (x) => (x as Error).message || "Promena lozinke nije uspela",
        },
      );

      const result = await promise;
      if (result.isOk) {
        setIsSubmitted(true);

        setTimeout(() => {
          router.push("/login?reset=success");
        }, 3000);
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
      {isSubmitted ? (
        <Alert className="border-green-500">
          <CheckCircle className="size-4 stroke-green-500" />
          <AlertDescription>
            Vaša lozinka je uspešno resetovana! Preusmeravanje na prijavu...
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nova lozinka</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className={`pr-10 ${error ? "border-red-300 focus-visible:ring-red-400" : ""}`}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 text-muted-foreground hover:text-muted-foreground/80"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
                </span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Potvrdite lozinku</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={
                error ? "border-red-300 focus-visible:ring-red-400" : ""
              }
              autoComplete="new-password"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Ažuriranje lozinke...
              </>
            ) : (
              "Resetuj lozinku"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
