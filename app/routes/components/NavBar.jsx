import { Link, NavLink } from "@remix-run/react";
import logo from "../../res/logo.png";

function handleClick() {
  const toDisplay = document.querySelector("#mobile-overlay");
  toDisplay.classList.toggle("overlay");
}

function NavBar() {
  return (
    <nav>
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="big-menu">
        <ul className="nav-links">
          <li>
            <NavLink to={"/projects?category=wdd"}>
              Web Design/Development
            </NavLink>
          </li>
          <li>
            <NavLink to={"/wdd"}>Software Engineering</NavLink>
          </li>
          <li>
            <NavLink to={"/wdd"}>Photography</NavLink>
          </li>
          <li>
            <NavLink to={"/wdd"}>Other</NavLink>
          </li>
          <li>
            <NavLink to={"/wdd"}>Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="mobile-menu">
        <div className="dropdown" onClick={handleClick}>
          Menu
        </div>
        <ul id="mobile-overlay">
          <div className="exit" onClick={handleClick}>
            &times;
          </div>
          <li>
            <NavLink to="/wdd">Web Design/Development</NavLink>
          </li>
          <li>
            <NavLink to="/wdd">Software Engineering</NavLink>
          </li>
          <li>
            <NavLink to="/wdd">Photography</NavLink>
          </li>
          <li>
            <NavLink to="/wdd">Other</NavLink>
          </li>
          <li>
            <NavLink to="/wdd">Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
