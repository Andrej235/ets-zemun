"use client";
import sendApiRequest from "@/api-dsl/send-api-request";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/user-store";
import { CheckCircle, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CountdownTimer from "./countdown-timer";
import FullPageLoadingIndicator from "./full-page-loading-indicator";

export default function ConfirmEmailInstructions() {
  const isLoading = useUserStore((x) => x.isLoading);
  const user = useUserStore((x) => x.user);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) router.replace("/login");
    else if (user.emailConfirmed) router.replace("/");
  }, [isLoading, user, router]);

  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendSuccess) {
      timer = setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [resendSuccess]);

  if (isLoading) return <FullPageLoadingIndicator />;

  async function handleResendEmail() {
    const response = await sendApiRequest("/users/resend-confirmation-email", {
      method: "post",
    });

    if (!response.isOk) {
      toast.error(response.error?.message ?? "Slanje emaila nije uspelo");
      return;
    }

    setResendSuccess(true);
    setIsCountdownActive(true);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="gap-0 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
          <Mail className="h-6 w-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">
          Proverite svoj email
        </CardTitle>
        <CardDescription className="mt-2 text-base">
          Poslali smo verifikacioni link na{" "}
          <span className="font-medium">
            {user?.email || "vašu email adresu"}
          </span>
          .
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Kliknite na link u emailu da verifikujete svoj nalog. Ako ne vidite
            email, proverite spam folder.
          </p>

          {resendSuccess && (
            <div className="flex items-center justify-center rounded-md bg-green-50 p-3 text-sm text-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Verifikacioni email je uspešno ponovo poslat!
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="w-full">
          <Button
            onClick={handleResendEmail}
            disabled={isCountdownActive}
            className="w-full"
            variant={isCountdownActive ? "outline" : "default"}
          >
            {isCountdownActive ? (
              <span className="flex items-center">
                Pošalji ponovo za{" "}
                <CountdownTimer
                  seconds={90}
                  onComplete={() => setIsCountdownActive(false)}
                />
              </span>
            ) : (
              <span>Ponovo pošalji verifikacioni email</span>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
