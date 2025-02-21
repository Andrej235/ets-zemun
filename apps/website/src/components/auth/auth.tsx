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
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>
              <span>Sign Up</span>
            </button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <span>or use your email password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="/">Forget Your Password?</a>
            <button>
              <span>Sign In</span>
            </button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" onClick={handleLoginClick}>
                <span>Sign In</span>
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button className="hidden" onClick={handleRegisterClick}>
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

