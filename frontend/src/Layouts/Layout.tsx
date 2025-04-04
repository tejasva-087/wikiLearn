import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BadgePage from "../pages/BadgePage";
import Certificate from "../pages/Certificate";
import CoursePage from "../pages/CoursePage";
import ForumPage from "../pages/ForumPage";
import CourseMap from "../pages/CourseMap";
import Setting from "../pages/Setting"
import Editor from "../pages/Editor";

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
            <Route path="/setting" element={<Setting />} />
            <Route path="/editor" element={<Editor />} />
          </Routes>
    </Router>
  );
}

export default Layout;
