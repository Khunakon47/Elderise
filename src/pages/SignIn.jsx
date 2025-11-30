import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./SignIn.css";


function SignIn() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/choose-role");
  };

  const gotohome = () => {
    navigate("/");
  };

  const [activeTab, setActiveTab] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const switchTab = (tab) => {
    setActiveTab(tab);
    setOtpSent(false);
    setPhone("");
    setPhoneError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhone(value);
    if (phoneError) setPhoneError("");
  };

  const sendOTP = () => {
    if (phone.length !== 10) {
      setPhoneError("Please enter a 10-digit phone number.");
      return;
    }
    setPhoneError("");
    setOtpSent(true);
  };

  const backToPhoneInput = () => {
    setOtpSent(false);
  };

  return (
    <div className="signin-bg">
      <div className="signin-main-container">
        {/* LEFT SECTION */}
        <div className="signin-welcome-section">
          <div className="signin-welcome-content">
            <img src="/images/cover.svg" alt="Elder teaching" className="signin-vector-img" />
            <h1>
              Welcome to <span>Elderise</span>
            </h1>
            <p className="signin-subtitle">
              Where experience becomes education — a learning marketplace created for and by seniors.
            </p>
            <ul>
              <li>🌱 Share lifelong wisdom and skills with younger generations.</li>
              <li>💬 Build community through meaningful teaching.</li>
              <li>💸 Earn income while inspiring others to grow.</li>
            </ul>
            <p className="signin-quote">
              "At Elderise, every story, craft, and lesson from the past becomes a light for the future."
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="signin-right-section">
          <div className="signin-container">
            <h2>Sign In</h2>
            <p className="signin-welcome-text">Welcome back! Let's continue your journey with Elderise.</p>

            {/* Tabs */}
            <div className="signin-tab-buttons">
              <button
                className={`signin-tab-btn ${activeTab === "email" ? "active" : ""}`}
                onClick={() => switchTab("email")}
              >
                <i className="fa-solid fa-envelope"></i> Email
              </button>
              <button
                className={`signin-tab-btn ${activeTab === "phone" ? "active" : ""}`}
                onClick={() => switchTab("phone")}
              >
                <i className="fa-solid fa-phone"></i> Phone
              </button>
            </div>

            {/* EMAIL TAB */}
            {activeTab === "email" && (
              <div className="signin-tab-content active">
                <form>
                  <label className="signin-label">Email</label>
                  <input className="signin-form-input" type="email" placeholder="example@gmail.com" required />

                  <label className="signin-label">Password</label>
                  <div className="signin-password-wrapper">
                    <input
                      className="signin-form-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="signin-toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                  </div>

                  <div className="signin-options">
                    <label className="signin-label">
                      <input type="checkbox" defaultChecked /> Remember me
                    </label>
                    <a style={{cursor:"pointer"}}>Forgot password?</a>
                  </div>

                  <button type="submit" className="signin-submit-btn" onClick={gotohome}>
                    Sign in
                  </button>
                </form>

                <div className="signin-divider">
                  <span>Or continue with</span>
                </div>

                <div className="signin-social-login">
                  <a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" /></a>
                  <a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" /></a>
                  <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" /></a>
                  <a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg" alt="Twitter" /></a>
                  <a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" /></a>
                </div>

                <p className="signin-signup-text">
                  Don't have an account? <button onClick={handleSignup} className="signin-signup-btn">Sign Up</button>
                </p>
              </div>
            )}

            {/* PHONE TAB */}
            {activeTab === "phone" && (
              <div className="signin-tab-content active">
                {!otpSent ? (
                  <div id="phone-step-1">
                    <label className="signin-label">Mobile Number</label>
                    <input
                      className="signin-form-input"
                      type="tel"
                      placeholder="0XXXXXXXXX"
                      maxLength="10"
                      value={phone}
                      onChange={handlePhoneChange}
                      required
                    />
                    {phoneError && (
                      <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "6px" }}>{phoneError}</div>
                    )}
                    <p className="signin-small-text">✓ We'll send a verification code to this number</p>
                    <button type="button" className="signin-send-otp-btn" onClick={sendOTP}>
                      <i className="fa-solid fa-paper-plane"></i> Send Verification Code
                    </button>
                  </div>
                ) : (
                  <div id="phone-step-2">
                    <p className="signin-small-text">Enter the 6-digit code sent to your phone</p>
                    <div className="signin-otp-inputs">
                      {[...Array(6)].map((_, i) => (
                        <input key={i} className="signin-otp-input" maxLength="1" />
                      ))}
                    </div>
                    <button type="button" className="signin-verify-otp-btn">Verify & Sign In</button>
                    <div className="signin-resend-text">
                      Didn't receive code? <a href="#">Resend</a>
                    </div>
                    <button
                      type="button"
                      className="signin-otp-back-btn"
                      onClick={backToPhoneInput}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;