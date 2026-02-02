import { useNavigate } from "react-router-dom";

function QuizSubjects() {
  const navigate = useNavigate();

  const subjects = ["React", "JavaScript"];

  return (
    <div className="page">
      <h1>Select a Subject</h1>

      <div className="grid">
        {subjects.map((sub) => (
          <div
            key={sub}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/quiz/${sub}`)}
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
