import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChooseRole.css";

function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleNext = () => {
    if (selectedRole === "teacher") {
      navigate("/signup-teacher");
    } else if (selectedRole === "learner") {
      navigate("/signup-learner");
    }
  };

  return (
    <div className="ChooseRole-bg">
      <div className="chooserole-container">
        <h1>Welcome to Elderise</h1>
        <p className="chooserole-subtitle">
          What brings you here today? Choose your role to continue.
        </p>

        <div className="chooserole-roles-grid">
          <div
            className={`chooserole-role-card ${
              selectedRole === "teacher" ? "active" : ""
            }`}
            onClick={() => handleSelect("teacher")}
          >
            <div className="chooserole-role-icon">
              <img src="/images/teacher.svg" alt="teacher" />
            </div>
            <div className="chooserole-role-title">Teacher</div>
            <div className="chooserole-role-desc">
              Share your skills and knowledge
            </div>
          </div>

          <div
            className={`chooserole-role-card ${
              selectedRole === "learner" ? "active" : ""
            }`}
            onClick={() => handleSelect("learner")}
          >
            <div className="chooserole-role-icon">
              <img src="/images/student.svg" alt="Learner" />
            </div>
            <div className="chooserole-role-title">Learner</div>
            <div className="chooserole-role-desc">
              Learn from experienced mentors
            </div>
          </div>
        </div>

        <button
          className="chooserole-next-btn"
          disabled={!selectedRole}
          onClick={handleNext}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default ChooseRole;
