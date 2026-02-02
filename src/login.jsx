import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = email.trim();
    const enteredPassword = password.trim();

    if (!enteredEmail || !enteredPassword) {
      setError("Please fill all fields");
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!storedUser) {
      setError("No account found. Please create an account.");
      return;
    }

    // ✅ FIX HERE
    if (
      enteredEmail === storedUser.email &&
      enteredPassword === storedUser.password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: storedUser.fullName,
          email: storedUser.email,
        })
      );

      navigate("/");
      window.location.reload();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-glass">

        {/* LEFT */}
        <div className="login-left">
          <h1>EduVerse 🇮🇳</h1>
          <h2>Welcome Back!</h2>
          <p>
            Log in to continue your learning journey and unlock
            India’s smartest digital education platform.
          </p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Mail ID</label>
            </div>

            <div className="input-box">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {error}
              </p>
            )}

            <button type="submit">Login</button>

            <p className="register">
              New here? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
