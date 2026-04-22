import { useNavigate } from "react-router-dom";
import "./courses.css";

function QuizSubjects() {
  const navigate = useNavigate();

  const subjects = ["React", "JavaScript", "Python", "HTML", "CSS", "C++", "Java", "Node.js"];

  return (
    <div className="page">
      <h1>Select a Subject</h1>

      <div className="grid">
        {subjects.map((sub) => (
          <div
            key={sub}
            className="card"
            style={{ cursor: "pointer" }}
            
            // ✅ FIX: encode subject for safe URL (important)
            onClick={() => navigate(`/quiz/${encodeURIComponent(sub)}`)}
            
          >
            <h3>📘 {sub}</h3>
            <p>20 Questions • 5 Minutes</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSubjects;