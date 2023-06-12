import { useState } from "react";
import Tiptap from "./components/Tiptap";
import { Form } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  // TODO: Next up is uploading the main image to GCP
  // TODO: then, we get to put everything into MongoDB
  return {};
}

export default function AdminNew() {
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
  };

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
          <input
            type="text"
            id="title"
            name="title"
            defaultValue="Project Title"
          />
        </div>
        <br />
        <label className="image-upload" htmlFor="img">
          Upload an Image
        </label>
        <input type="file" id="img" name="img" accept="image/*" />
        <br />
        <img src="" alt="" className="edit-image" />
        <input type="hidden" value={data} name="writeup"></input>

        <button className="submit" type="submit">
          Create
        </button>
      </Form>
      <Tiptap childToParent={childToParent} />
    </>
  );
}
