import styles from "~/styles/project.css";

export default function ContactPage() {
  return (
    <main>
      <h2 className="grid-page">Contact</h2>
      <div className="contact-body">
        <div className="contact-text">
          <h3>Hi, my name's David.</h3>
          <p>
            I'm majoring in Computer Science with an emphasis in software
            engineering. I call the great state of Idaho home and am happiest
            when out in the mountains.
          </p>
          <div className="links-contact">
            <a
              className="linked-button"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/david-thompson-569459210/"
            >
              LinkedIn
            </a>
            <a
              className="linked-button"
              target="_blank"
              rel="noopener noreferrer"
              href="https://storage.googleapis.com/cloudclock-pdf/Resume.pdf"
            >
              Resume
            </a>
          </div>
        </div>
        <img
          className="portrait"
          src="https://storage.googleapis.com/portfolio-resources/david.jpg"
          alt="Portrait of David Thompson"
        />
      </div>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
