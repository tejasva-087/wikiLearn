import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";

function Editor() {
  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar></Sidebar>
        {/* Home Page main content */}
        <div className="max-w-4xl mx-auto text-3xl mt-2">
          Editor
        </div>
        {/* Achievement Bar */}
        <Achievements></Achievements>
      </div>
    </div>
  );
}

export default Editor;
