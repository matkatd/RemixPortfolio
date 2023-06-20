import { Link } from "@remix-run/react";
import redArrow from "../res/red-Arrow-clipart-transparent.svg";
export const meta = () => {
  return [{ title: "David's Portfolio" }];
};

export default function Index() {
  return (
    <main>
      <div className="green-box">
        <h1>
          Hi, <br />
          I'm David.
        </h1>
        <h2>Check out some of my work:</h2>
      </div>
      <img
        className="red-arrow"
        srcSet={redArrow}
        alt="a red arrow pointing upwards"
      />
      <Link className="contact-button" to="/contact">
        <button>Contact</button>
      </Link>
    </main>
  );
}
