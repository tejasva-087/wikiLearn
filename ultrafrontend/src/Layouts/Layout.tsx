import Header from "../components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BadgePage from "../pages/BadgePage";
import Certificate from "../pages/Certificate";
import CoursePage from "../pages/CoursePage";
import ForumPage from "../pages/ForumPage";
import CourseMap from "../pages/CourseMap";
import CourseMap2 from "../pages/CourseMap2";
import CourseMap3 from "../pages/CourseMap3";
import CourseMap4 from "../pages/CourseMap4";
import CourseMap5 from "../pages/CourseMap5";
import Setting from "../pages/Setting";
import Editor from "../pages/Editor";
import Quiz from "../pages/Quiz";
import CourseContent from "../pages/CourseContent";
import CourseContent2 from "../pages/CourseContent2";
import CourseContent3 from "../pages/CourseContent3";
import CourseContent4 from "../pages/CourseContent4";
import CourseContent5 from "../pages/CourseContent5";
import CourseContent6 from "../pages/CourseContent6";
import CourseContent7 from "../pages/CourseContent7";
import CourseContent8 from "../pages/CourseContent8";
import CourseContent9 from "../pages/CourseContent9";
import CourseContent10 from "../pages/CourseContent10";
import CourseContent12 from "../pages/CourseContent12";
import CourseContent13 from "../pages/CourseContent13";
import CourseContent14 from "../pages/CourseContent14";
import CourseContent15 from "../pages/CourseContent15";

function Layout() {
	return (
		<div className="bg-white">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="courses" element={<CoursePage />} />
				<Route path="course-map" element={<CourseMap />} />
				<Route path="course-map2" element={<CourseMap2 />} />
				<Route path="course-map3" element={<CourseMap3 />} />
				<Route path="course-map4" element={<CourseMap4 />} />
				<Route path="course-map5" element={<CourseMap5 />} />
				<Route path="course-content1" element={<CourseContent />} />
				<Route path="course-content2" element={<CourseContent2 />} />
				<Route path="course-content3" element={<CourseContent3 />} />
				<Route path="course-content4" element={<CourseContent4 />} />
				<Route path="course-content5" element={<CourseContent5 />} />
				<Route path="course-content6" element={<CourseContent6 />} />
				<Route path="course-content7" element={<CourseContent7 />} />
				<Route path="course-content8" element={<CourseContent8 />} />
				<Route path="course-content9" element={<CourseContent9 />} />
				<Route path="course-content10" element={<CourseContent10 />} />
				<Route path="course-content12" element={<CourseContent12 />} />
				<Route path="course-content13" element={<CourseContent13 />} />
				<Route path="course-content14" element={<CourseContent14 />} />
				<Route path="course-content15" element={<CourseContent15 />} />
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
