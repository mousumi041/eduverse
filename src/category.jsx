import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./courses.css";

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => {
        const filtered = {};

        data.forEach(course => {
          if (course.category === category) {
            filtered[course.subject] = course.videos;
          }
        });

        setSubjects(filtered);
      });
  }, [category]);

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