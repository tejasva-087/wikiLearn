import Button from "./ui/Button";
import Link from "./ui/Link";

import {
  House,
  Medal,
  Books,
  Certificate,
  UsersThree,
} from "@phosphor-icons/react";

const options = [
  {
    id: 1,
    icon: <House className="icon--big" />,
    label: "Overview",
    link: "/overview",
  },
  {
    id: 2,
    icon: <Books className="icon--big" />,
    label: "Courses",
    link: "/courses",
  },
  {
    id: 3,
    icon: <Medal className="icon--big" />,
    label: "Badges",
    link: "/badges",
  },
  {
    id: 4,
    icon: <Certificate className="icon--big" />,
    label: "Certificate",
    link: "/certificate",
  },
  {
    id: 5,
    icon: <UsersThree className="icon--big" />,
    label: "Forum",
    link: "/forum",
  },
];

function MainMenu({ activeEl }) {
  return (
    <menu className="flex-center flex-column main-menu gap--mid">
      {options.map((option) => (
        <Link
          link={`${option.link}`}
          className={`link--normal flex-center gap--sml ${
            activeEl === option.label ? "link--active" : ""
          }`}
          key={option.id}
        >
          {option.icon}
          {option.label}
        </Link>
      ))}
    </menu>
  );
}

export default MainMenu;
