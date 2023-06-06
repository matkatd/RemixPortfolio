import { json } from "@remix-run/node";
import { getProject } from "../utils/db.server";
import Tiptap from "./components/Tiptap";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";

export async function loader({ params }) {
  const project = await getProject(params.project);

  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(project);
}

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  // TODO: Next up is uploading the main image to GCS
}

export default function AdminEdit() {
  const project = useLoaderData();
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
  };
  const title = project.title;
  return (
    <>
      <Form method="post" reloadDocument>
        <div className="category-dropdown">
          <label htmlFor="category">Choose Category</label>
          <br />
          <div className="select">
            <select name="category" id="category">
              <option value="wdd">Web Design & Development</option>
              <option value="software_engineering">Software Engineering</option>
              <option value="other">Other</option>
            </select>
            <span className="focus"></span>
          </div>
          <br />
        </div>
        <div className="post-title">
          <label htmlFor="title">Name of Post</label>
          <br />
          <input type="text" id="title" name="title" defaultValue={title} />
        </div>
        <br />
        <label className="image-upload" htmlFor="img">
          Upload an Image
        </label>
        <input type="file" id="img" name="img" accept="image/*" />
        <br />
        <img src={project.img} alt={project.alt} className="edit-image" />
        <input type="hidden" value={data} name="writeup"></input>
        <Tiptap project={project} childToParent={childToParent} />
        <button className="submit" type="submit">
          Create
        </button>
      </Form>
    </>
  );
}
