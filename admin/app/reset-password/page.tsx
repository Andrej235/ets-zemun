import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { RequestResetForm } from "@/components/request-reset-form";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const { email, token } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Resetujte Vašu Lozinku
            </CardTitle>
            <CardDescription className="text-center">
              {email && token
                ? "Molimo Vas da kreirate novu lozinku za Vaš nalog"
                : "Unesite Vaš email kako biste dobili link za resetovanje lozinke"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              }
            >
              {email && token ? (
                <ResetPasswordForm email={email} token={token} />
              ) : (
                <RequestResetForm />
              )}
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
