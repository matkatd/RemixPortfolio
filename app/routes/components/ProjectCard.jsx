import { Link, useLoaderData } from "@remix-run/react";

function ProjectCard({ project }) {
  const { storageUrl } = useLoaderData();

  return (
    <div className="card">
      <img src={storageUrl + project.img} alt={project.alt} />
      <div className="card-text">
        <h3>{project.title}</h3>
        <p>{project.date}</p>
      </div>
      <div className="card-button">
        <Link to={"/project/" + project.slug}>See More</Link>
      </div>
    </div>
  );
}

export default ProjectCard;
