import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/login";

function Brand() {
  return (
    <div className="brand">
      <div className="brand-icon">c</div>
      <span>cherrymatcha</span>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validateForm() {
    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailPattern.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.message || "Login failed.");
        return;
      }

      onLogin(data.user);
    } catch (error) {
      setApiError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">

      {/* LEFT WELCOME SECTION */}

      <section className="welcome-panel">

        <Brand />

        <div className="welcome-content">

          <span className="welcome-tag">
            A LITTLE SPACE FOR YOU
          </span>

          <h1>
            Sweet moments.
            <br />
            <span>Fresh starts.</span>
          </h1>

          <p>
            Your own little corner to collect ideas,
            find your rhythm, and grow one day at a time.
          </p>

          <div className="decorative-fruits">
            <span>🍒</span>
            <span>✿</span>
            <span>✳</span>
          </div>

        </div>

        <footer className="welcome-footer">
          <span>Made with a little sweetness</span>
          <span>♥</span>
        </footer>

      </section>

      {/* RIGHT LOGIN SECTION */}

      <section className="form-panel">

        <div className="form-container">

          <div className="mobile-brand">
            <Brand />
          </div>

          <div className="form-heading">

            <span className="heading-label">
              WELCOME BACK
            </span>

            <h2>Let's get you in.</h2>

            <p>
              Your next little adventure starts here.
            </p>

          </div>

          <form onSubmit={handleSubmit} noValidate>

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => {
                  setEmail(event.target.value);

                  setErrors((previous) => ({
                    ...previous,
                    email: "",
                  }));

                  setApiError("");
                }}
              />

              {errors.email && (
                <p className="error-message">
                  {errors.email}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <span>At least 6 characters</span>

              </div>

              <div className="password-input">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  aria-invalid={Boolean(errors.password)}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    setErrors((previous) => ({
                      ...previous,
                      password: "",
                    }));

                    setApiError("");
                  }}
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {errors.password && (
                <p className="error-message">
                  {errors.password}
                </p>
              )}

            </div>

            {/* BACKEND ERROR */}

            {apiError && (
              <div className="api-error" role="alert">
                {apiError}
              </div>
            )}

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Signing you in..." : "Sign in"}

              {!loading && <span>↗</span>}
            </button>

          </form>

          {/* DEMO CREDENTIALS */}

          <div className="demo-box">

            <span className="demo-icon">i</span>

            <div>
              <strong>Just exploring?</strong>

              <p>
                Email: demo@cherrymatcha.dev
                <br />
                Password: Cherry123
              </p>
            </div>

          </div>

          <p className="terms-text">
            By continuing, you agree to our{" "}
            <span>Terms</span> and{" "}
            <span>Privacy Policy</span>.
          </p>

        </div>

        <footer className="form-footer">
          <span>© 2026 CherryMatcha</span>
          <span>Grow at your own pace ✿</span>
        </footer>

      </section>

    </main>
  );
}

function Dashboard({ user, onLogout }) {
  return (
    <main className="dashboard-page">

      <header className="dashboard-header">

        <Brand />

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Sign out ↗
        </button>

      </header>

      <section className="dashboard-content">

        <span className="dashboard-badge">
          ✿ YOU'RE SIGNED IN
        </span>

        <p className="heading-label">
          YOUR LITTLE CORNER
        </p>

        <h1>
          Hello, <span>{user.name}!</span>
        </h1>

        <p className="dashboard-description">
          You're in! This is your dashboard, a little
          space to explore ideas and build something
          wonderful.
        </p>

        <div className="dashboard-cards">

          <article className="dashboard-card cherry-card">
            <span className="card-icon">🍒</span>
            <h3>Start something</h3>
            <p>
              Every great idea begins with a small step.
            </p>
          </article>

          <article className="dashboard-card matcha-card">
            <span className="card-icon">🌱</span>
            <h3>Keep growing</h3>
            <p>
              Learn something new and keep moving forward.
            </p>
          </article>

          <article className="dashboard-card cream-card">
            <span className="card-icon">✿</span>
            <h3>Make it yours</h3>
            <p>
              Your ideas deserve a place to bloom.
            </p>
          </article>

        </div>

        <p className="signed-in">
          Signed in as <strong>{user.email}</strong>
        </p>

      </section>

    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  if (user) {
    return (
      <Dashboard
        user={user}
        onLogout={() => setUser(null)}
      />
    );
  }

  return <LoginPage onLogin={setUser} />;
}