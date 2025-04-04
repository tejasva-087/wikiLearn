import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function BadgePage() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Home Page main content */}
        <div className="max-w-4xl text-3xl mx-auto mt-2">Badge Page</div>

        {/* Achievement Bar */}
        <Achievements></Achievements>
      </div>
    </div>
  );
}

export default BadgePage;
