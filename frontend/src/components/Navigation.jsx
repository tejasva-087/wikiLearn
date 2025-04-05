import { useState } from "react";

import Button from "./ui/Button";
import Logo from "./ui/Logo";
import UserMenu from "./ui/UserMenu";

import { Plus, Moon, Sun } from "@phosphor-icons/react";

function Navigation() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const changeTheme = function () {
    document.body.classList.toggle("dark-mode");

    // Storimg the current theme in local storage
    const currentTheme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
    setTheme(currentTheme);
  };

  return (
    <header className="nav-bar">
      {/* Logo */}
      <Logo link="#" />

      <div className="flex-center gap--mid">
        {/* options */}

        <Button color="primary" className="flex-center" onClick={changeTheme}>
          {theme === "dark" ? (
            <Moon className="icon--big" weight="light" />
          ) : (
            <Sun className="icon--big" weight="light" />
          )}
        </Button>

        {/* user menu */}
        <UserMenu userName={"Tejasva Khandelwal"} />
      </div>
    </header>
  );
}

export default Navigation;
