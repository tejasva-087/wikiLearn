import { BrowserRouter, Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses";
import Overview from "./pages/Overview";
import CoursePage from "./pages/CoursePage";
import Editor from "./pages/Editor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/course-page" element={<CoursePage />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
