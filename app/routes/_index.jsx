
import redArrow from "../res/red-Arrow-clipart-transparent.svg"
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
        alt="a red arrow pointing upwards"/>
      <a className="contact-button" href="./pages/contact.html"><button>Contact</button></a>
    </main>
  );
}


// export function links() {
//   return [{ rel: 'stylesheet', href: }]
// }
