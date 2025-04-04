import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BadgePage from "../pages/BadgePage";
import Certificate from "../pages/Certificate";
import CoursePage from "../pages/CoursePage";
import ForumPage from "../pages/ForumPage";
import CourseMap from "../pages/CourseMap";

function Layout() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="courses" element={<CoursePage />} />
				<Route path="course-map" element={<CourseMap />} />
				<Route path="badges" element={<BadgePage />} />
				<Route path="certificates" element={<Certificate />} />
				<Route path="forum" element={<ForumPage />} />
			</Routes>
		</div>
	);
}

export default Layout;
