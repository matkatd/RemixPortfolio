import { Link } from "@remix-run/react";

function ProjectCard({ project }) {
  return (
    <div className="card">
      <img src={project.img} alt={project.alt} />
      <div className="card-text">
        <h3>{project.title}</h3>
        <p>{project.date}</p>
      </div>
      <Link className="card-button" to={"/project/" + project.slug}>
        See More
      </Link>
    </div>
  );
}

export default ProjectCard;
