import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const quizzesTaken =
    Number(localStorage.getItem("quizzesTaken")) || 0;

  /* SUBJECT-WISE QUIZ DATA */
  const quizData = {
    React: [
      {
        question: "What is React?",
        options: [
          "A JavaScript library",
          "A database",
          "A server",
          "A browser"
        ],
        answer: 0
      },
      {
        question: "Which hook is used for state?",
        options: ["useFetch", "useState", "useData", "useEffect"],
        answer: 1
      }
    ],
    JavaScript: [
      {
        question: "Which keyword declares a variable?",
        options: ["var", "int", "define", "letit"],
        answer: 0
      },
      {
        question: "Which type is NOT primitive?",
        options: ["String", "Number", "Object", "Boolean"],
        answer: 2
      }
    ],
    CSS: [
      {
        question: "What does CSS stand for?",
        options: [
          "Creative Style System",
          "Cascading Style Sheets",
          "Color Style Syntax",
          "Component Styling System"
        ],
        answer: 1
      }
    ]
  };

  const quizQuestions = selectedSubject
    ? quizData[selectedSubject]
    : [];

  const handleNext = () => {
    if (selected === quizQuestions[currentQ].answer) {
      setScore(score + 1);
    }

    setSelected(null);

    if (currentQ + 1 < quizQuestions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      localStorage.setItem(
        "quizzesTaken",
        quizzesTaken + 1
      );
      alert(
        `Quiz finished! Score: ${score + 1}/${quizQuestions.length}`
      );
      setShowQuiz(false);
      setSelectedSubject(null);
      setCurrentQ(0);
      setScore(0);
    }
  };

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

        {/* TAKE QUIZ */}
        <div
          className="card"
          style={{ cursor: "pointer" }}
          onClick={() => setShowQuiz(true)}
        >
          <h3>📝 Take a Quiz</h3>
          <p>Test your knowledge & track scores</p>
        </div>
      </div>

      {/* SUBJECT SELECTION — FIXED */}
      {showQuiz && !selectedSubject && (
        <div className="card" style={{ marginTop: "40px" }}>
          <h3>Select a Subject</h3>

          {Object.keys(quizData).map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSubject(sub);
              }}
              style={{
                margin: "10px",
                padding: "12px 30px",
                borderRadius: "30px",
                border: "none",
                background:
                  "linear-gradient(90deg, #ffcc70, #ff8c00)",
                fontWeight: "700",
                cursor: "pointer",
                pointerEvents: "auto"
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* QUIZ QUESTIONS */}
      {showQuiz && selectedSubject && (
        <div className="card" style={{ marginTop: "40px" }}>
          <h3>{selectedSubject} Quiz</h3>
          <p>{quizQuestions[currentQ].question}</p>

          {quizQuestions[currentQ].options.map((opt, idx) => (
            <div key={idx}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selected === idx}
                  onChange={() => setSelected(idx)}
                />{" "}
                {opt}
              </label>
            </div>
          ))}

          <button
            type="button"
            onClick={handleNext}
            disabled={selected === null}
            style={{
              marginTop: "20px",
              padding: "10px 30px",
              borderRadius: "30px",
              border: "none",
              background:
                "linear-gradient(90deg, #ffcc70, #ff8c00)",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            {currentQ + 1 === quizQuestions.length
              ? "Finish Quiz"
              : "Next"}
          </button>
        </div>
      )}

      {/* LOGOUT */}
      <div style={{ marginTop: "40px" }}>
        <button
          type="button"
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
