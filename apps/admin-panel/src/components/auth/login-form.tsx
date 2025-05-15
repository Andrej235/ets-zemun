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
import { Link } from "react-router";

type LoginFormProps = {
  readonly onRequestSwitch: () => void;
  readonly onSubmit: (username: string, password: string) => void;
};

export function LoginForm({ onRequestSwitch, onSubmit }: LoginFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    onSubmit(username, password);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Pristupite svom nalogu</CardTitle>
          <CardDescription>
            Unesite svoje ime i lozinku da biste se ulogovali
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
                <div className="flex items-center">
                  <Label htmlFor="password">Lozinka</Label>
                  <Link
                    to="/reset-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Zaboravili ste lozinku?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Ulogujte se
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <button
                onClick={onRequestSwitch}
                className="underline underline-offset-4"
              >
                Sign up
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
