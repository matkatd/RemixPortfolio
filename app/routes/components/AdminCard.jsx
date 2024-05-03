import { Link, useFetcher, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import Confirmation from "./Confirmation";

function AdminCard({ project }) {
  const { storageUrl } = useLoaderData();

  const [showConfirmation, setConfirmation] = useState(false);
  function showDialog() {
    setConfirmation(true);
  }

  if (!project) {
    return <div></div>;
  }
  return (
    <div className="card">
      <img src={storageUrl + project.img} alt={project.alt} />
      <div className="card-text">
        <h3>{project.title}</h3>
        <p>{project.date}</p>
      </div>
      <div className="card-button">
        <Link to={"edit/" + project.slug}>Edit</Link>
      </div>
      <div className="card-button delete" onClick={showDialog}>
        <p>Delete</p>
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
