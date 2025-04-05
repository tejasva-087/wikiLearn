import Link from "./Link";
import logo from "../../assets/img/wiki_mascot.gif";

function Logo({ link }) {
  return (
    <Link link={link}>
      <figure className="logo flex-center">
        <img src={logo} alt="Logo" className="logo-img" />
        <figcaption className="font-mid logo-text">
          <span className="color-primary ">Wiki</span>Learn
        </figcaption>
      </figure>
    </Link>
  );
}

export default Logo;
