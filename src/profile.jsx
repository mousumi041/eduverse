import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const quizzesTaken =
    Number(localStorage.getItem("quizzesTaken")) || 0;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="page">
      <h1>My Learning Dashboard</h1>

      {/* USER INFO */}
      <div className="card">
        <h3>👋 Hello, {user?.fullName}</h3>
        <p>Welcome back! Track your learning journey below.</p>
      </div>

      {/* DASHBOARD */}
      <div className="grid">
        <div className="card">
          <h3>📊 Course Progress</h3>
          <p>12 / 40 videos completed</p>
        </div>

        <div className="card">
          <h3>🧠 Quizzes Attempted</h3>
          <p>{quizzesTaken} quizzes completed</p>
        </div>

        <div className="card">
          <h3>🎯 Skills Gained</h3>
          <p>React, JavaScript, Python</p>
        </div>

        <div className="card">
          <h3>📺 Videos Watched</h3>
          <p>28 total videos</p>
        </div>

        {/* TAKE QUIZ — LOGIC CHANGE ONLY */}
        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/quizzes")}
        >
          <h3>📝 Take a Quiz</h3>
          <p>Test your knowledge & track scores</p>
        </div>
      </div>

      {/* LOGOUT */}
      <div style={{ marginTop: "40px" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "14px 40px",
            borderRadius: "30px",
            border: "none",
            background:
              "linear-gradient(90deg, #ffcc70, #ff8c00)",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
