import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import BadgePage from "../pages/BadgePage";
import Certificate from "../pages/Certificate";
import CoursePage from "../pages/CoursePage";
import ForumPage from "../pages/ForumPage";
import CourseMap from "../pages/CourseMap";

function Layout() {
  return (
    <Router>
      <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/course-map" element={<CourseMap />} />
            <Route path="/badges" element={<BadgePage />} />
            <Route path="/certificates" element={<Certificate />} />
            <Route path="/forum" element={<ForumPage />} />
          </Routes>
    </Router>
  );
}

export default Layout;

  


