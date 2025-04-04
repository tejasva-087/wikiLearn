import { Bell, Sun } from "lucide-react";
import { useState } from "react"; // Import useState
import { Button } from "./ui/button";
import Notification from "./Notification";
import UserDropdown from "./UserDropdown";
import logo from "../assets/logo.gif"

function Header() {
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  return (
    <header className="border-b border-gray-200 bg-white flex flex-row items-start w-full relative">
      {" "}
      {/* Added relative positioning */}
      <div className="flex flex-1 flex-row items-start w-full self-stretch px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between w-full">
          {/* Logo and title */}
          <div className="flex items-center gap-1 sm:gap-2 py-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap flex items-center">
              <img
                src={logo}
                className="h-[2em] w-auto" // This makes the image height match the text height
                alt="WikiLearn Logo"
              />
              <span className="text-blue-600 ml-2">Wiki</span>Learn
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 py-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 sm:w-10 sm:h-10"
            >
              <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9 sm:w-11 sm:h-11 relative" // Added relative
              onClick={toggleNotification} // Added click handler
            >
              <Bell className="h-5 w-5 sm:h-9 sm:w-9" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
          <UserDropdown></UserDropdown>
        </div>
      </div>
      {/* Notification dropdown */}
      {showNotification && (
        <div className="absolute right-4 sm:right-6 lg:right-8 top-16 sm:top-18 z-50">
          <Notification />
        </div>
      )}
    </header>
  );
}

export default Header;
