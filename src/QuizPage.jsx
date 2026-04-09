import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function QuizPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const quizBank = {
    React: [
      { q: "What is React?", options: ["Library", "Language", "DB", "Server"], a: 0 },
      { q: "Hook for state?", options: ["useEffect", "useState", "useRef", "useMemo"], a: 1 },
      { q: "JSX stands for?", options: ["Java XML", "JS Syntax", "JS Extension", "JSON XML"], a: 2 },
      { q: "React is developed by?", options: ["Google", "Meta", "Microsoft", "Amazon"], a: 1 },
      { q: "Virtual DOM is?", options: ["Real DOM", "Copy of DOM", "Database", "API"], a: 1 },
      { q: "Component type?", options: ["Class & Function", "Only Class", "Only Function", "None"], a: 0 },
      { q: "Props are?", options: ["Mutable", "Immutable", "Both", "None"], a: 1 },
      { q: "useEffect runs?", options: ["After render", "Before render", "Never", "Always"], a: 0 },
      { q: "Key in list?", options: ["Optional", "Required", "Ignored", "None"], a: 1 },
      { q: "React uses?", options: ["MVC", "Component-based", "OOP only", "Procedural"], a: 1 }
    ],

    JavaScript: [
      { q: "Which is NOT datatype?", options: ["String", "Boolean", "Undefined", "Float"], a: 3 },
      { q: "JS is?", options: ["Compiled", "Interpreted", "Both", "None"], a: 1 },
      { q: "let is?", options: ["Block scoped", "Global", "Function", "None"], a: 0 },
      { q: "=== means?", options: ["Equal", "Strict equal", "Assign", "None"], a: 1 },
      { q: "NaN means?", options: ["Null", "Not a number", "Zero", "Error"], a: 1 },
      { q: "Array method?", options: ["push", "add", "insert", "put"], a: 0 },
      { q: "typeof null?", options: ["null", "object", "undefined", "string"], a: 1 },
      { q: "JS runs in?", options: ["Browser", "Server", "Both", "None"], a: 2 },
      { q: "Promise is?", options: ["Object", "Function", "Loop", "None"], a: 0 },
      { q: "DOM stands for?", options: ["Data Obj", "Doc Model", "Document Object Model", "None"], a: 2 }
    ]
  };

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [finished, setFinished] = useState(false);

  /* 🔀 SHUFFLE FUNCTION */
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  /* 🔀 LOAD & SHUFFLE QUIZ */
  useEffect(() => {
    const raw = quizBank[subject?.trim()] || [];

    const shuffled = shuffleArray(raw).map((q) => {
      const optionsWithFlag = q.options.map((opt, i) => ({
        text: opt,
        isCorrect: i === q.a
      }));

      return {
        q: q.q,
        options: shuffleArray(optionsWithFlag)
      };
    });

    setQuestions(shuffled);
  }, [subject]);

  /* ⏱ TIMER */
  useEffect(() => {
    if (finished) return;

    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  const handleNext = () => {
    if (questions[index].options[selected]?.isCorrect) {
      setScore((s) => s + 1);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setFinished(true);

    // quizzes taken
    const count = Number(localStorage.getItem("quizzesTaken")) || 0;
    localStorage.setItem("quizzesTaken", count + 1);

    // best score
    const bestScore = Number(localStorage.getItem("bestScore")) || 0;
    if (score > bestScore) {
      localStorage.setItem("bestScore", score);
    }
  };

  if (!questions.length) {
    return (
      <div className="page">
        <h2>No quiz found for this subject</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>{subject} Quiz</h1>

      <p style={{ textAlign: "center" }}>
        ⏱ Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      {!finished ? (
        <div className="card">
          <h3>
            Q{index + 1}. {questions[index].q}
          </h3>

          {questions[index].options.map((op, i) => (
            <div
              key={i}
              onClick={() => setSelected(i)}
              style={{
                margin: "12px 0",
                padding: "14px 20px",
                borderRadius: "14px",
                cursor: "pointer",
                pointerEvents: "auto",
                position: "relative",
                zIndex: 2,
                border:
                  selected === i
                    ? "2px solid #ff8c00"
                    : "1px solid rgba(255,255,255,0.3)",
                background:
                  selected === i
                    ? "rgba(255, 204, 112, 0.25)"
                    : "rgba(255,255,255,0.08)",
                color: "#e2e8f0"
              }}
            >
              {op.text}
            </div>
          ))}

          <button onClick={handleNext} disabled={selected === null} style={{ position: "relative", zIndex: 2 }}>
            {index + 1 === questions.length ? "Submit Quiz" : "Next"}
          </button>
        </div>
      ) : (
        <div className="card" style={{ textAlign: "center" }}>
          <h2>🎉 Quiz Completed</h2>

          <p>
            Your Score: {score} / {questions.length}
          </p>

          {/* ✅ CORRECT ANSWERS */}
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <h3>Correct Answers:</h3>

            {questions.map((q, i) => {
              const correct = q.options.find((op) => op.isCorrect);
              return (
                <p key={i}>
                  <strong>Q{i + 1}:</strong> {correct.text}
                </p>
              );
            })}
          </div>

          <button onClick={() => navigate("/profile")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;