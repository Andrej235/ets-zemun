"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type SignUpFormProps = {
  readonly onRequestSwitch: () => void;
  readonly onSubmit: (
    username: string,
    email: string,
    password: string,
  ) => void;
};

export function SignUpForm({ onRequestSwitch, onSubmit }: SignUpFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    onSubmit(username, email, password);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Napravite nalog</CardTitle>
          <CardDescription>
            Unesite svoje podatke ispod da biste napravili nalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Ime</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="ime_prezime"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Lozinka</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Potvrdi lozinku</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Registruj se
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Imate nalog?{" "}
              <button
                onClick={onRequestSwitch}
                className="underline underline-offset-4"
              >
                Ulogujte se
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
