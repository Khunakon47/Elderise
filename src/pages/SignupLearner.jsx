import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupLearner.css";

function SignupLearner() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/");
  };

  function togglePassword(type) {
    if (type === "password") setShowPassword(!showPassword);
    else setShowConfirm(!showConfirm);
  }

  function checkPasswordStrength(e) {
    const password = e.target.value;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) setPasswordStrength("weak");
    else if (strength === 3) setPasswordStrength("medium");
    else setPasswordStrength("strong");
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Sign up success (ยังไม่เชื่อม backend)");
  }

  return (
    <div className="signuplearner-bg">
      <div className="signuplearner-main-container">
        {/* LEFT SECTION */}
        <div className="signuplearner-signup-section">
          <div className="signuplearner-signup-container">
            <h2>Create Account</h2>
            <p className="signuplearner-welcome-text">
              Join our community and start your journey today!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="signuplearner-form-row">
                <div className="signuplearner-form-group">
                  <label className="signuplearner-label">First Name</label>
                  <input className="signuplearner-form-input" type="text" placeholder="John" required />
                </div>
                <div className="signuplearner-form-group">
                  <label className="signuplearner-label">Last Name</label>
                  <input className="signuplearner-form-input" type="text" placeholder="Doe" required />
                </div>
              </div>

              <div className="signuplearner-form-group">
                <label className="signuplearner-label">Email Address</label>
                <input className="signuplearner-form-input" type="email" placeholder="example@gmail.com" required />
              </div>

              <div className="signuplearner-form-group">
                <label className="signuplearner-label">Mobile Number</label>
                <input className="signuplearner-form-input" type="tel" placeholder="+66 XX XXX XXXX" maxLength="13" />
              </div>

              <div className="signuplearner-form-group">
                <label className="signuplearner-label">Password</label>
                <div className="signuplearner-password-wrapper">
                  <input
                    className="signuplearner-form-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    onInput={checkPasswordStrength}
                  />
                  <button
                    type="button"
                    className="signuplearner-toggle-password"
                    onClick={() => togglePassword("password")}
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                <div className="signuplearner-password-strength">
                  <div className={`password-strength-bar strength-${passwordStrength}`}></div>
                </div>
              </div>

              <div className="signuplearner-form-group">
                <label className="signuplearner-label">Confirm Password</label>
                <div className="signuplearner-password-wrapper">
                  <input
                    className="signuplearner-form-input"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="signuplearner-toggle-password"
                    onClick={() => togglePassword("confirm")}
                  >
                    <i className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="signuplearner-terms-checkbox">
                <input type="checkbox" required />
                <label className="signuplearner-label">
                  I agree to the <a href="#">Terms & Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="signuplearner-signup-btn">
                <i className="fa-solid fa-user-plus"></i> Create Account
              </button>
            </form>

            <div className="signuplearner-divider"><span>Or sign up with</span></div>

            <div className="signuplearner-social-login">
              <a href="#">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  alt="Google"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  alt="Facebook"
                />
              </a>
              <a href="#">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                />
              </a>
            </div>

            <p className="signuplearner-signin-text">
              Already have an account? <button onClick={handleSignup} className="signin-signup-btn">Sign Up</button>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="signuplearner-benefits-section">
          <div className="signuplearner-benefits-content">
            <h1>
              Start Your <span>Learning</span> Journey
            </h1>
            <p className="signuplearner-benefits-subtitle">
              Join thousands of learners and teachers in our vibrant community
              dedicated to lifelong learning.
            </p>

            <div className="signuplearner-benefit-item">
              <div className="signuplearner-benefit-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <div className="signuplearner-benefit-text">
                <h3>Connect with Experts</h3>
                <p>
                  Learn from experienced seniors who share their wisdom and
                  practical skills.
                </p>
              </div>
            </div>

            <div className="signuplearner-benefit-item">
              <div className="signuplearner-benefit-icon">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <div className="signuplearner-benefit-text">
                <h3>Earn & Learn</h3>
                <p>
                  As a teacher, monetize your knowledge. As a learner, gain
                  valuable skills.
                </p>
              </div>
            </div>

            <div className="signuplearner-benefit-item">
              <div className="signuplearner-benefit-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div className="signuplearner-benefit-text">
                <h3>Build Community</h3>
                <p>
                  Create meaningful connections across generations through shared
                  learning.
                </p>
              </div>
            </div>

            <div className="signuplearner-stats">
              <div className="signuplearner-stat-item">
                <div className="signuplearner-stat-number">10K+</div>
                <div className="signuplearner-stat-label">Active Teachers</div>
              </div>
              <div className="signuplearner-stat-item">
                <div className="signuplearner-stat-number">50K+</div>
                <div className="signuplearner-stat-label">Happy Learners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupLearner;