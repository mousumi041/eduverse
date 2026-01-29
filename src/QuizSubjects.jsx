import { useNavigate } from "react-router-dom";

function QuizSubjects() {
  const navigate = useNavigate();

  const subjects = [
    "React",
    "JavaScript",
    "Python",
    "HTML & CSS"
  ];

  return (
    <div className="page">
      <h1>Select a Subject</h1>

      <div className="grid">
        {subjects.map((sub, i) => (
          <div
            key={i}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/quiz/${sub}`)}
          >
            <h3>📘 {sub}</h3>
            <p>Start quiz</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizSubjects;
