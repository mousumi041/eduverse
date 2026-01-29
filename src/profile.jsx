import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

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
        <h3>👋 Hello, {user?.username}</h3>
        <p>Welcome back! Track your learning journey below.</p>
      </div>

      {/* PROGRESS */}
      <div className="grid">
        <div className="card">
          <h3>📊 Course Progress</h3>
          <p>12 / 40 videos completed</p>
        </div>

        <div className="card">
          <h3>🧠 Quizzes Attempted</h3>
          <p>5 quizzes completed</p>
        </div>

        <div className="card">
          <h3>🎯 Skills Gained</h3>
          <p>React, JavaScript, Python</p>
        </div>

        <div className="card">
          <h3>📺 Videos Watched</h3>
          <p>28 total videos</p>
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
            background: "linear-gradient(90deg, #ffcc70, #ff8c00)",
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
