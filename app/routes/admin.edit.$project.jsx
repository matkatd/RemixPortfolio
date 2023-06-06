import { json } from "@remix-run/node";
import { getProject } from "../utils/db.server";
import Tiptap from "./components/Tiptap";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { type } from "../../Old/nodes/StickyNode";

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
  // values.writeup = data;
}

export default function AdminEdit() {
  const project = useLoaderData();

  const [data, setData] = useState("");
  const childToParent = (childData) => {
    setData(childData);
  };

  return (
    <>
      <Form method="post">
        <Tiptap project={project} childToParent={childToParent} />
        <input type="hidden"></input>
      </Form>
    </>
  );
}
