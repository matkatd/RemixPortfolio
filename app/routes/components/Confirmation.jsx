import { useSubmit } from "@remix-run/react";
import { useRef } from "react";

function Confirmation({ projectId, setConfirmation }) {
  const dialogRef = useRef(null);
  const submit = useSubmit();
  function deleteItem() {
    const form = new FormData();
    form.append("id", projectId);
    submit(form, { method: "post", action: "/admin/delete" });
  }
  function cancelDelete() {
    setConfirmation(false);
    dialogRef.current.close();
  }
  return (
    <dialog className="confirmation" ref={dialogRef} open>
      <h3>Are you sure you want to delete?</h3>
      <div className="button-box">
        <button className="card-button" onClick={cancelDelete}>
          No, Cancel
        </button>
        <button className="card-button delete" onClick={deleteItem}>
          Yes, Delete this Project
        </button>
      </div>
    </dialog>
  );
}

export default Confirmation;
