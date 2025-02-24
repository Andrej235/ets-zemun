import sendAPIRequest from "@shared/api-dsl/send-api-request";
import { useRef, useState } from "react";
import { useNavigate, useRevalidator } from "react-router";
import { validateEmail, validatePassword } from "./auth-validation";
import "./auth.scss";
import { useTranslation } from "react-i18next";

export default function Auth() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { t } = useTranslation();

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
            <h1>{t("auth.signUp.primary")}</h1>
            <span>{t("auth.signUp.secondary")}</span>
            <input
              type="text"
              placeholder={t("auth.signUp.namePlaceholder")}
              ref={registrationNameRef}
              name="registerName"
              id="registerName"
              autoComplete="off"
            />
            <input
              type="email"
              placeholder={t("auth.signUp.emailPlaceholder")}
              ref={registrationEmailRef}
              name="registerEmail"
              id="registerEmail"
              autoComplete="off"
            />
            <input
              type="password"
              placeholder={t("auth.signUp.passwordPlaceholder")}
              ref={registrationPasswordRef}
              name="registerPassword"
              id="registerPassword"
              autoComplete="off"
            />
            <button onClick={handleRegister}>
              <span>{t("auth.signUp.button")}</span>
            </button>
          </div>
        </div>

        <div className="form-container sign-in">
          <div className="form">
            <h1>{t("auth.signIn.primary")}</h1>
            <span>{t("auth.signIn.secondary")}</span>
            <input
              type="email"
              placeholder={t("auth.signIn.emailPlaceholder")}
              ref={loginEmailRef}
              name="loginEmail"
              id="loginEmail"
            />
            <input
              type="password"
              placeholder={t("auth.signIn.passwordPlaceholder")}
              ref={loginPasswordRef}
              name="loginPassword"
              id="loginPassword"
            />
            <button onClick={handleLogin}>
              <span>{t("auth.signIn.button")}</span>
            </button>
          </div>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>{t("auth.toggleLeft.title")}</h1>
              <p>{t("auth.toggleLeft.description")}</p>
              <button className="hidden" onClick={() => setActive(false)}>
                <span>{t("auth.toggleLeft.button")}</span>
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>{t("auth.toggleRight.title")}</h1>
              <p>{t("auth.toggleRight.description")}</p>
              <button className="hidden" onClick={() => setActive(true)}>
                <span>{t("auth.toggleRight.button")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

