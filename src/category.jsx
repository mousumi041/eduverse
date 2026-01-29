import { useParams, useNavigate } from "react-router-dom";
import coursesData from "./coursesData";
import "./courses.css";

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();
  const subjects = coursesData[category];

  return (
    <div className="page">
      <button className="back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{category}</h1>

      <div className="grid">
        {Object.keys(subjects).map((sub) => (
          <div
            key={sub}
            className="card"
            onClick={() => navigate(`/courses/${category}/${sub}`)}
          >
            <h3>{sub}</h3>
            <p>{subjects[sub].length} videos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
