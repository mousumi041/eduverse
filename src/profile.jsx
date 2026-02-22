import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const quizzesTaken =
    Number(localStorage.getItem("quizzesTaken")) || 0;

  const [activeTab, setActiveTab] = useState("dashboard");

  /* 🔐 Password UI control */
  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  /* 🔐 Password states */
  const [currentPassword, setCurrentPassword] =
    useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [passwordError, setPasswordError] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  /* 🔐 Password Update Logic */
  const handlePasswordUpdate = () => {
    setPasswordError("");
    setSuccessMessage("");

    const storedUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (!storedUser) {
      setPasswordError("No registered account found.");
      return;
    }

    if (!loggedUser || loggedUser.email !== storedUser.email) {
      setPasswordError("User mismatch.");
      return;
    }

    if (currentPassword !== storedUser.password) {
      setPasswordError("Current password is incorrect.");
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters and contain a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    const updatedUser = {
      ...storedUser,
      password: newPassword,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    setSuccessMessage("Password updated successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      setShowPasswordForm(false);
      setSuccessMessage("");
    }, 1500);
  };

  return (
    <div className="profile-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Settings</h2>
        <ul>
          <li
            className={
              activeTab === "dashboard" ? "active" : ""
            }
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={
              activeTab === "security" ? "active" : ""
            }
            onClick={() => setActiveTab("security")}
          >
            Password & Security
          </li>

          <li onClick={() => navigate("/membership")}>
            Membership
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="profile-content">

        {activeTab === "dashboard" && (
          <>
            <h1>My Learning Dashboard</h1>

            <div className="card">
              <h3>👋 Hello, {loggedUser?.fullName}</h3>
              <p>
                Welcome back! Track your learning journey
                below.
              </p>
            </div>

            <div className="grid">
              <div className="card">
                <h3>📊 Course Progress</h3>
                <p>12 / 40 videos completed</p>
              </div>

              <div className="card">
                <h3>🧠 Quizzes Attempted</h3>
                <p>
                  {quizzesTaken} quizzes completed
                </p>
              </div>

              <div className="card">
                <h3>🎯 Skills Gained</h3>
                <p>React, JavaScript, Python</p>
              </div>

              <div className="card">
                <h3>📺 Videos Watched</h3>
                <p>28 total videos</p>
              </div>

              <div
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/quizzes")}
              >
                <h3>📝 Take a Quiz</h3>
                <p>
                  Test your knowledge & track scores
                </p>
              </div>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

        {activeTab === "security" && (
          <>
            <h1>Password & Security</h1>

            <div className="card">
              <h3>Password</h3>
              <p>Your password is currently set.</p>

              {!showPasswordForm ? (
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordForm(true)
                  }
                >
                  Update Password
                </button>
              ) : (
                <>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                  />

                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) =>
                      setNewPassword(e.target.value)
                    }
                  />

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />

                  {passwordError && (
                    <p className="error">
                      {passwordError}
                    </p>
                  )}

                  {successMessage && (
                    <p className="success">
                      {successMessage}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handlePasswordUpdate}
                  >
                    Confirm Update
                  </button>
                </>
              )}
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default Profile;
