import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ChooseRole from "./pages/ChooseRole";
import SignupTeacher from "./pages/SignupTeacher";
import SignupLearner from "./pages/SignupLearner";
import CourseDetail from "./pages/CourseDetail";
import BrowseCourses from "./pages/BrowseCourses";
import Home from "./pages/home";
import "./components/main-style.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Signin" element={<SignIn/>} />
      <Route path="/choose-role" element={<ChooseRole/>} />
      <Route path="/signup-learner" element={<SignupLearner/>} />
      <Route path="/signup-teacher" element={<SignupTeacher/>} />
      <Route path="/CourseDetail" element={<CourseDetail/>} />
      <Route path="/BrowseCourses" element={<BrowseCourses/>} />
    </Routes>
    </>
  );
}

export default App;