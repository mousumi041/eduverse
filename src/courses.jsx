import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./courses.css";

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then(res => res.json())
      .then(data => {
        const grouped = {};

        data.forEach(course => {
          if (!grouped[course.category]) {
            grouped[course.category] = {};
          }
          grouped[course.category][course.subject] = course.videos;
        });

        setCourses(grouped);
      });
  }, []);

  return (
    <div className="page">
      <h1>All Categories</h1>

      <div className="grid">
        {Object.keys(courses).map((cat) => (
          <div
            key={cat}
            className="card"
            onClick={() => navigate(`/courses/${cat}`)}
          >
            <h3>{cat}</h3>
            <p>{Object.keys(courses[cat]).length} subjects</p>
          </div>
        ))}
      </div>
    </div>
  );
}