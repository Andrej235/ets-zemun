import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useRef } from "react";

export default function AdminLogin() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />

      <input type="email" name="email" id="email" ref={emailRef} />
      <input type="password" name="password" id="password" ref={passwordRef} />
      <button
        onClick={async () => {
          const response = await sendAPIRequest("/auth/login", {
            method: "post",
            parameters: {
              useCookies: true,
            },
            payload: {
              email: emailRef.current!.value,
              password: passwordRef.current!.value,
              twoFactorCode: "",
              twoFactorRecoveryCode: "",
            },
          });

          if (response.code !== "OK") return;
          window.location.href = "https://admin.localhost.com";
        }}
      >
        Login
      </button>

      <br />

      <button
        onClick={() => sendAPIRequest("/auth/logout", { method: "delete" })}
      >
        Log out
      </button>

      <a href={"https://admin.localhost.com"}>Admin page</a>
    </div>
  );
}

