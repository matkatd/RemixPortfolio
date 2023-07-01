import { Link, useFetcher, useSubmit } from "@remix-run/react";
import { useState } from "react";
import Confirmation from "./Confirmation";

function AdminCard({ project }) {
  const [showConfirmation, setConfirmation] = useState(false);
  function showDialog() {
    setConfirmation(true);
  }

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
      <Link className="card-button" to={"edit/" + project.slug}>
        Edit
      </Link>
      <div className="card-button delete" onClick={showDialog}>
        Delete
      </div>
      {showConfirmation ? (
        <Confirmation
          projectId={project.id}
          setConfirmation={setConfirmation}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminCard;
