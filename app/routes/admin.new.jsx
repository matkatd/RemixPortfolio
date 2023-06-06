import { useState } from "react";
import Tiptap from "./components/Tiptap";
import { Form } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
}

export default function AdminNew() {
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
    // this seems to be breaking things...
  };

  return (
    <>
      <Form method="post" reloadDocument>
        <label htmlFor="category">Choose Category</label>
        <select name="category" id="category">
          <option value="wdd">Web Design & Development</option>
          <option value="software_engineering">Software Engineering</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="title">Name of Post</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue="Title of Project"
        />
        <img src="" alt="" />
        <input type="file" id="img" name="img" accept="image/*" />
        <input type="hidden" value={data} name="writeup"></input>
      </Form>
      <Tiptap childToParent={childToParent} />
    </>
  );
}
