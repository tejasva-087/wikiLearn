import { useState } from "react";
import { ChevronDown, Settings, LogOut } from "lucide-react";

function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-2"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium">TK</span>
        </div>
        <span className="font-medium">Tejasva Khandelwal</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-md font-medium">Tejasva Khandelwal</p>
          </div>

          <a
            href="/setting"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="w-6 h-6 mr-3" />
            <span className="text-md">Setting</span>
          </a>

          <a
            href="/"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="w-6 h-6 mr-3" />
            <span className="text-md">Log out</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
