import { useNavigate } from "react-router-dom";
import coursesData from "./coursesData";
import "./courses.css";

export default function Courses() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>All Categories</h1>

      <div className="grid">
        {Object.keys(coursesData).map((cat) => (
          <div
            key={cat}
            className="card"
            onClick={() => navigate(`/courses/${cat}`)}
          >
            <h3>{cat}</h3>
            <p>{Object.keys(coursesData[cat]).length} subjects</p>
          </div>
        ))}
      </div>
    </div>
  );
}
