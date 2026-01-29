import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function QuizPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const quizData = {
    React: [
      {
        q: "What is React?",
        options: [
          "Library",
          "Framework",
          "Language",
          "Database"
        ],
        a: 0
      },
      {
        q: "Which hook is used for state?",
        options: ["useData", "useState", "useFetch", "useStore"],
        a: 1
      }
    ],
    JavaScript: [
      {
        q: "Which is not JS datatype?",
        options: ["Number", "String", "Boolean", "Float"],
        a: 3
      }
    ]
  };

  const questions = quizData[subject] || [];
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === questions[index].a) {
      setScore(score + 1);
    }

    setSelected(null);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
      const count =
        Number(localStorage.getItem("quizzesTaken")) || 0;
      localStorage.setItem("quizzesTaken", count + 1);
    }
  };

  return (
    <div className="page">
      <h1>{subject} Quiz</h1>

      {!finished ? (
        <div className="card">
          <h3>{questions[index]?.q}</h3>

          {questions[index]?.options.map((op, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name="opt"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />{" "}
                {op}
              </label>
            </div>
          ))}

          <button
            onClick={handleNext}
            disabled={selected === null}
            style={{ marginTop: "20px" }}
          >
            {index + 1 === questions.length
              ? "Submit"
              : "Next"}
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>🎉 Quiz Completed</h2>
          <p>
            Score: {score} / {questions.length}
          </p>

          <button onClick={() => navigate("/")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
