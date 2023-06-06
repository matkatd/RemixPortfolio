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
}

export default function AdminEdit() {
  const project = useLoaderData();
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
    // this seems to be breaking things...
  };
  const title = project.title;
  return (
    <>
      <Form method="post" reloadDocument>
        <label for="category">Choose Category</label>
        <select name="category" id="category">
          <option value="wdd">Web Design & Development</option>
          <option value="software_engineering">Software Engineering</option>
          <option value="other">Other</option>
        </select>
        <label for="title">Name of Post</label>
        <input type="text" id="title" name="title" value={title} />
        <img src={project.img} alt={project.alt} />
        <input type="file" id="img" name="img" accept="image/*" />
        <input type="hidden" value={data} name="writeup"></input>
      </Form>
      <Tiptap project={project} childToParent={childToParent} />
    </>
  );
}
