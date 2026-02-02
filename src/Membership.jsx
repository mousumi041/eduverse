import "./Membership.css";
import { useNavigate } from "react-router-dom";

function Membership() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubscribe = () => {
    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    alert("Subscription successful! 🎉 (Demo)");
  };

  return (
    <div className="membership-page">
      <h1>Choose Your Learning Plan</h1>
      <p className="subtitle">
        Unlock premium courses, quizzes, certificates & mentorship
      </p>

      <div className="plans">
        <div className="plan-card">
          <h2>Free</h2>
          <p className="price">₹0</p>
          <ul>
            <li>✔ Limited Courses</li>
            <li>✔ Basic Quizzes</li>
            <li>✖ Certificates</li>
            <li>✖ Mentorship</li>
          </ul>
          <button disabled>Current Plan</button>
        </div>

        <div className="plan-card popular">
          <span className="badge">MOST POPULAR</span>
          <h2>Pro</h2>
          <p className="price">₹499 / month</p>
          <ul>
            <li>✔ All Courses</li>
            <li>✔ Unlimited Quizzes</li>
            <li>✔ Certificates</li>
            <li>✔ Community Access</li>
          </ul>
          <button onClick={handleSubscribe}>Get Pro</button>
        </div>

        <div className="plan-card">
          <h2>Elite</h2>
          <p className="price">₹1499 / year</p>
          <ul>
            <li>✔ Everything in Pro</li>
            <li>✔ 1-on-1 Mentorship</li>
            <li>✔ Career Guidance</li>
            <li>✔ Priority Support</li>
          </ul>
          <button onClick={handleSubscribe}>Go Elite</button>
        </div>
      </div>
    </div>
  );
}

export default Membership;
