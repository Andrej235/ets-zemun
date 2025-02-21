import { useState } from "react";
import "./auth.scss";

export default function Auth() {
  const [active, setActive] = useState(false);

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  return (
    <div className="auth-page">
      <div
        className={`auth-container ${active ? "active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up">
          <form>
            <h1>Kreiraj Nalog</h1>
            <span>ili koristite svoj email za registraciju</span>
            <input type="text" placeholder="Ime" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Lozinka" />
            <button>
              <span>Registruj se</span>
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Prijavi se</h1>
            <span>ili koristite svoj email i lozinku</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Lozinka" />
            <a href="/">Zaboravili ste lozinku?</a>
            <button>
              <span>Prijavi se</span>
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Dobrodošli nazad!</h1>
              <p>Unesite svoje lične podatke da biste koristili sve funkcije sajta</p>
              <button className="hidden" onClick={handleLoginClick}>
                <span>Prijavi se</span>
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Zdravo, nastavniče!</h1>
              <p>
                Registrujte se sa svojim ličnim podacima da biste koristili sve funkcije sajta
              </p>
              <button className="hidden" onClick={handleRegisterClick}>
                <span>Registruj se</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

