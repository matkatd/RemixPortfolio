import { Link } from "@remix-run/react";

function AdminCard({ project }) {
  if (!project) {
    return <div></div>;
  }
  return (
    <div className="card">
      <img src={project.img} alt={project.alt} />
      <div className="card-text">
        <h3>{project.title}</h3>
        <p>{project.date}</p>
      </div>
      <Link className="card-button" to={"/edit/" + project.slug}>
        Edit
      </Link>
      <Link className="card-button delete" to={"/edit/" + project.slug}>
        Delete
      </Link>
    </div>
  );
}

export default AdminCard;
