import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and contain a number");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password
        })
      });

      // ✅ SAFE JSON PARSE (prevents crash like login issue)
      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server not responding properly");
      }

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      alert("Account created successfully 🎉");
      navigate("/login");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page">
      <div className="register-glass">

        <div className="register-left">
          <h1>EduVerse 🇮🇳</h1>
          <h2>Create Account</h2>
          <p>
            Start your learning journey today.
            Build skills, track progress, and unlock premium content.
          </p>

          <div className="register-left-footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="register-right">
          <h2>Sign Up</h2>

          <form onSubmit={handleRegister}>
            <div className="input-box">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <label>Full Name</label>
            </div>

            <div className="input-box">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
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

            <div className="input-box">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
              <label>Confirm Password</label>
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {error}
              </p>
            )}

            <div className="register-options">
              <label className="terms">
                <input type="checkbox" required />
                I agree to the <a href="#">Terms</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit">Create Account</button>

            <p className="login-back">
              Already have an account?{" "}
              <Link to="/login">Login</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Register;