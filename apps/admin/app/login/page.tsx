"use client";
import sendAPIRequest from "@/api-dsl/send-api-request";
import { LoginForm } from "@/components/login-form";
import { SignUpForm } from "@/components/sign-up-form";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [selected, setSelected] = useState<"login" | "register">("login");
  const isWaitingForResponse = useRef(false);
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    if (isWaitingForResponse.current) {
      toast.info("Molimo sačekajte...", {
        duration: 3000,
      });
      return;
    }
    isWaitingForResponse.current = true;

    const promise = sendAPIRequest("/users/login", {
      method: "post",
      payload: {
        username: email,
        password,
      },
      parameters: {
        useCookies: true,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ??
              "Neuspešna prijava, molimo pokušajte ponovo",
          );
      }),
      {
        loading: "Molimo sačekajte...",
        success: "Uspešno ste se prijavili! Dobrodošli!",
        error: (x) => (x as Error).message,
      },
    );

    const { isOk } = await promise;
    isWaitingForResponse.current = false;

    if (!isOk) return;
    window.location.reload();
  }

  async function handleRegister(
    username: string,
    email: string,
    password: string,
  ) {
    if (isWaitingForResponse.current) {
      toast.info("Molimo sačekajte...", {
        duration: 3000,
      });
      return;
    }
    isWaitingForResponse.current = true;

    const promise = sendAPIRequest("/users/register", {
      method: "post",
      payload: {
        username,
        email,
        password,
      },
    });

    toast.promise(
      promise.then((response) => {
        if (!response.isOk)
          throw new Error(
            response.error?.message ??
              "Neuspešna registracija, molimo pokušajte ponovo",
          );
      }),
      {
        loading: "Molimo sačekajte...",
        success: "Uspešno ste se registrovali! Molimo ulogujte se.",
        error: (x) => (x as Error).message,
      },
    );

    const { isOk } = await promise;
    isWaitingForResponse.current = false;

    if (!isOk) return;
    router.push("/confirm-email");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {selected === "login" && (
          <LoginForm
            onRequestSwitch={() => setSelected("register")}
            onSubmit={handleLogin}
          />
        )}
        {selected === "register" && (
          <SignUpForm
            onRequestSwitch={() => setSelected("login")}
            onSubmit={handleRegister}
          />
        )}
      </div>
    </div>
  );
}
