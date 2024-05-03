import { env } from "process";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader() {
  console.log("url", env.STORAGE_URL);
  return json({ storageUrl: env.STORAGE_URL });
}

function ProjectCard({ project }) {
  const { storageUrl } = useLoaderData();
  console.log("storageUrl", storageUrl);

  return (
    <div className="card">
      <img src={storageUrl + project.img} alt={project.alt} />
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
