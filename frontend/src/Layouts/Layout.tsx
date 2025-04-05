import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BadgePage from "../pages/BadgePage";
import Certificate from "../pages/Certificate";
import CoursePage from "../pages/CoursePage";
import ForumPage from "../pages/ForumPage";
import CourseMap from "../pages/CourseMap";
import Setting from "../pages/Setting";
import Editor from "../pages/Editor";
import Quiz from "../pages/Quiz";
import CourseContent from "../pages/CourseContent";

function Layout() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="courses" element={<CoursePage />} />
				<Route path="course-map" element={<CourseMap />} />
				<Route path="course-content" element={<CourseContent />} />
				<Route path="quiz" element={<Quiz />} />
				<Route path="badges" element={<BadgePage />} />
				<Route path="certificates" element={<Certificate />} />
				<Route path="/setting" element={<Setting />} />
				<Route path="/editor" element={<Editor />} />
				<Route path="forum" element={<ForumPage />} />
				<Route path="forum/post/:postId" element={<ForumPage />} />
			</Routes>
		</div>
	);
}

export default Layout;
