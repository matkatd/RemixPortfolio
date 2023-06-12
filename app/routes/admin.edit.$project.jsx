import {
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { getProject } from "../utils/db.server";
import Tiptap from "./components/Tiptap";
import { cloudStorageUploaderHandler } from "../utils/uploader-handler.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { prisma } from "../utils/prisma.server";
import { debug } from "../utils/debug";

export async function loader({ params }) {
  const project = await getProject(params.project);

  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(project);
}

export async function action({ request }) {
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename }) => {
      if (name !== "post-img") {
        return undefined;
      }
      const uploadedImage = await cloudStorageUploaderHandler(data, filename);
      return uploadedImage;
    },
    unstable_createMemoryUploadHandler() // Uses this if it's not an image
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const img = formData.get("post-img");
  const id = formData.get("id");
  const category = formData.get("category");
  const title = formData.get("title");
  const slug = formData.get("slug");
  const alt = formData.get("alt");
  const writeup = formData.get("writeup");

  // TODO: We got it uploading to GCS, but the image is all weird looking...
  // TODO: then, we get to put everything into MongoDB
  return { img };
}

export default function AdminEdit() {
  const project = useLoaderData();
  const [data, setData] = useState("");

  const actionData = useActionData();

  if (actionData && actionData.img) {
    redirect("/admin");
  }

  const childToParent = (childData) => {
    setData(childData);
  };
  const fileName = actionData?.img != undefined ? actionData.img : project.img;

  const title = project?.title;

  return (
    <>
      <Form method="post" encType="multipart/form-data">
        <input type="hidden" name="id" value={project?.id}></input>
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
        <div className="post-field">
          <label htmlFor="slug">URL Slug</label>
          <br />
          <input
            type="text"
            id="slug"
            name="slug"
            defaultValue={project?.slug}
          />
        </div>
        <br />
        <label className="image-upload" htmlFor="post-img">
          Upload an Image
        </label>
        <input type="file" id="img" name="post-img" accept="image/*" />
        <br />
        <img src={fileName} alt={project?.alt} className="edit-image" />
        <div className="post-field">
          <label htmlFor="alt">Image Alt Image</label>
          <br />
          <input type="text" id="alt" name="alt" defaultValue={project?.alt} />
        </div>
        <br />
        <input type="hidden" value={data} name="writeup"></input>

        <button className="submit" type="submit">
          Create
        </button>
      </Form>
      <Tiptap project={project} childToParent={childToParent} />
    </>
  );
}
