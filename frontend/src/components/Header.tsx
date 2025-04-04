import logo from "../assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bell, Sun } from "lucide-react";

function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm flex flex-row items-start p-0 w-full">
      <div className="flex flex-1 flex-row items-start max-w-7xl mx-auto w-full self-stretch">
        <div className="flex h-16 sm:h-18 items-center justify-between w-full">
          {/* Logo and title */}
          <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-3">
            <img
              alt="Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full"
              src={logo}
              width="36"
              height="36"
            />
            <span className="text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap">
              <span className="text-blue-600">Wiki</span>Learn
            </span>
          </div>

          {/* Navigation - responsive for all screen sizes */}
          <div className="flex items-center gap-2 sm:gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 sm:w-10 sm:h-10">
              <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 sm:w-11 sm:h-11">
              <Bell className="h-5 w-5 sm:h-9 sm:w-9" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9 sm:h-11 sm:w-11">
              <AvatarImage src="/placeholder.svg?height=44&width=44" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
