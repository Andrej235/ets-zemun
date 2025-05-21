import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";
import { useNavigate } from "react-router";

export default function Auth() {
  const [selected, setSelected] = useState<"login" | "register">("login");
  const isWaitingForResponse = useRef(false);
  const navigate = useNavigate();

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
        if (response.code !== "200")
          throw new Error(
            response?.content?.title ??
              "Neuspešna prijava, molimo pokušajte ponovo",
          );
      }),
      {
        loading: "Molimo sačekajte...",
        success: "Uspešno ste se prijavili! Dobrodošli!",
        error: (x) => (x as Error).message,
      },
    );

    const { code } = await promise;
    isWaitingForResponse.current = false;

    if (code !== "200") return;
    navigate("/");
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
        if (response.code !== "201")
          throw new Error(
            response?.content?.title ??
              "Neuspešna registracija, molimo pokušajte ponovo",
          );
      }),
      {
        loading: "Molimo sačekajte...",
        success: "Uspešno ste se registrovali! Molimo ulogujte se.",
        error: (x) => (x as Error).message,
      },
    );

    const { code } = await promise;
    isWaitingForResponse.current = false;

    if (code !== "201") return;
    setSelected("login");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
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
