import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useRef, useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { validateEmail, validatePassword } from "./auth-validation";
import "./auth.scss";

export default function Auth() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const registrationNameRef = useRef<HTMLInputElement>(null);
  const registrationEmailRef = useRef<HTMLInputElement>(null);
  const registrationPasswordRef = useRef<HTMLInputElement>(null);

  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);

  const isWaitingForResponse = useRef(false);

  async function handleRegister() {
    if (
      !registrationNameRef.current ||
      !registrationEmailRef.current ||
      !registrationPasswordRef.current ||
      !validateEmail(registrationEmailRef.current.value) ||
      !validatePassword(registrationPasswordRef.current.value)
    )
      return;

    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/auth/register", {
      method: "post",
      payload: {
        email: registrationEmailRef.current.value,
        password: registrationPasswordRef.current.value,
      },
    });

    if (response.code !== "OK") {
      isWaitingForResponse.current = false;
      return;
    }

    const loginResponse = await sendAPIRequest("/auth/login", {
      method: "post",
      parameters: {
        useCookies: true,
      },
      payload: {
        email: registrationEmailRef.current.value,
        password: registrationPasswordRef.current.value,
        twoFactorCode: "",
        twoFactorRecoveryCode: "",
      },
    });

    isWaitingForResponse.current = false;
    if (loginResponse.code !== "OK") return;
    revalidator.revalidate();
    navigate("/");
  }

  async function handleLogin() {
    if (
      !loginEmailRef.current ||
      !loginPasswordRef.current ||
      !validateEmail(loginEmailRef.current.value) ||
      !validatePassword(loginPasswordRef.current.value)
    )
      return;

    if (isWaitingForResponse.current) return;
    isWaitingForResponse.current = true;

    const response = await sendAPIRequest("/auth/login", {
      method: "post",
      parameters: {
        useCookies: true,
      },
      payload: {
        email: loginEmailRef.current.value,
        password: loginPasswordRef.current.value,
        twoFactorCode: "",
        twoFactorRecoveryCode: "",
      },
    });

    isWaitingForResponse.current = false;
    if (response.code !== "OK") return;
    revalidator.revalidate();
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div
        className={`auth-container ${active ? "active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up">
          <div className="form">
            <h1>Kreiraj Nalog</h1>
            <span>ili koristite svoj email za registraciju</span>
            <input
              type="text"
              placeholder="Ime"
              ref={registrationNameRef}
              name="registerName"
              id="registerName"
              autoComplete="off"
            />
            <input
              type="email"
              placeholder="Email"
              ref={registrationEmailRef}
              name="registerEmail"
              id="registerEmail"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Lozinka"
              ref={registrationPasswordRef}
              name="registerPassword"
              id="registerPassword"
              autoComplete="off"
            />
            <button onClick={handleRegister}>
              <span>Registruj se</span>
            </button>
          </div>
        </div>

        <div className="form-container sign-in">
          <div className="form">
            <h1>Prijavi se</h1>
            <span>ili koristite svoj email i lozinku</span>
            <input
              type="email"
              placeholder="Email"
              ref={loginEmailRef}
              name="loginEmail"
              id="loginEmail"
            />
            <input
              type="password"
              placeholder="Lozinka"
              ref={loginPasswordRef}
              name="loginPassword"
              id="loginPassword"
            />
            <button onClick={handleLogin}>
              <span>Prijavi se</span>
            </button>
          </div>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Zdravo, nastavniče!</h1>
              <p>
                Registrujte se sa svojim ličnim podacima da biste koristili sve
                funkcije sajta
              </p>
              <button className="hidden" onClick={() => setActive(true)}>
                <span>Registruj se</span>
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Dobrodošli nazad!</h1>
              <p>
                Unesite svoje lične podatke da biste koristili sve funkcije
                sajta
              </p>
              <button className="hidden" onClick={() => setActive(false)}>
                <span>Prijavi se</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

