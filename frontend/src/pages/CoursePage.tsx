import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function CoursePage() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Home Page main content */}
        <div className="max-w-4xl text-3xl mx-auto mt-2">
          Course Page
        </div>

        {/* Achievement Bar */}
        <Achievements></Achievements>
      </div>
    </div>
  );
}

export default CoursePage;
