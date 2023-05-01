import { Link } from "@remix-run/react";
import logo from "../../res/logo.png";

function handleClick() {
  const toDisplay = document.querySelector("#mobile-overlay");
  toDisplay.classList.toggle("overlay");
}

function NavBar() {
  return (
    <nav>
      <img src={logo} alt="Logo" className="logo" />
      <div className="big-menu">
        <ul className="nav-links">
          <li>
            <Link href="./pages/wdd.html">Web Design/Development</Link>
          </li>
          <li>
            <Link href="./pages/se.html">Software Engineering</Link>
          </li>
          <li>
            <Link href="./pages/photo.html">Photography</Link>
          </li>
          <li>
            <Link href="./pages/other.html">Other</Link>
          </li>
          <li>
            <Link href="./pages/contact.html">Contact</Link>
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
            <Link href="./pages/wdd.html">Web Design/Development</Link>
          </li>
          <li>
            <Link href="./pages/se.html">Software Engineering</Link>
          </li>
          <li>
            <Link href="./pages/photo.html">Photography</Link>
          </li>
          <li>
            <Link href="./pages/other.html">Other</Link>
          </li>
          <li>
            <Link href="./pages/contact.html">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
