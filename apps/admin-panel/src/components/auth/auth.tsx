import { useRef, useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { toast } from "sonner";
import { LoginForm } from "./login-form";
import { SignUpForm } from "./sign-up-form";

export default function Auth() {
  const revalidator = useRevalidator();
  const [selected, setSelected] = useState<"login" | "register">("login");
  const isWaitingForResponse = useRef(false);
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    if (isWaitingForResponse.current) {
      toast.info("Please wait...", {
        duration: 3000,
      });
      return;
    }
    isWaitingForResponse.current = true;

    /*     const promise = sendAPIRequest("/users/login", {
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
          throw new Error(response.error?.message ?? "Failed to login");
      }),
      {
        loading: "Logging in...",
        success: "Successfully logged in! Welcome!",
        error: (x) => (x as Error).message,
      },
    ); */

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
      toast.info("Please wait...", {
        duration: 3000,
      });
      return;
    }
    isWaitingForResponse.current = true;

    /*     const promise = sendAPIRequest("/users/register", {
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
          throw new Error(response.error?.message ?? "Failed to register");
      }),
      {
        loading: "Registering...",
        success: "Successfully registered! Please log in.",
        error: (x) => (x as Error).message,
      },
    );

    const { isOk } = await promise;
    isWaitingForResponse.current = false;

    if (!isOk) return;
    setSelected("login"); */
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
