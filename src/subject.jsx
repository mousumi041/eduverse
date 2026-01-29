import { useParams, useNavigate } from "react-router-dom";
import coursesData from "./coursesData";
import "./courses.css";

export default function Subject() {
  const { category, subject } = useParams();
  const navigate = useNavigate();
  const videos = coursesData[category][subject];

  return (
    <div className="page">
      <button className="back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1>{subject}</h1>

      <div className="video-grid">
        {videos.map((id) => (
          <div key={id} className="video-card">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
}
