import {
  json,
  redirect,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import * as yup from "yup";
import { withYup } from "@remix-validated-form/with-yup";
import {
  validationError,
  ValidatedForm,
  useIsSubmitting,
} from "remix-validated-form";
import { useState } from "react";
import { uploadHandler } from "../utils/uploader-handler.server";
import { getProject, updatePost } from "../utils/db.server";

import Tiptap from "./components/Tiptap";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

const options = [
  { value: "", label: "--Choose a Category--" },
  { value: "wdd", label: "Web Design & Development" },
  { value: "software_engineering", label: "Software Engineering" },
  { value: "other", label: "Other" },
];

const validator = withYup(
  yup.object({
    id: yup.string().required(),
    title: yup.string().label("Post Title").required(),
    category: yup.string().label("Post Category").required(),
    slug: yup.string().label("URL slug").required(),
    img: yup.string().label("Main image for Post"),
    alt: yup.string().label("Alt text for image").required(),
    writeup: yup.string().required(),
    originalImg: yup.string().required(),
  })
);

export async function action({ request }) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);
  if (fieldValues.data.img === "") {
    fieldValues.data.img = fieldValues.data.originalImg;
  }
  updatePost(fieldValues.data);
  return redirect("/admin");
}

export async function loader({ params }) {
  const project = await getProject(params.project);

  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ project });
}

export default function AdminEdit() {
  const { project } = useLoaderData();
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
  };

  const isSubmitting = useIsSubmitting("edit-post");

  function findOptionIndex() {
    const result = options.filter(
      (option) => option.value === project.category
    );
    return result[0];
  }
  return (
    <>
      <ValidatedForm
        validator={validator}
        method="post"
        name="edit-post"
        id="edit-post"
        encType="multipart/form-data">
        <FormInput name="id" value={project.id} type="hidden" />
        <FormInput name="title" label="Post Title" value={project.title} />
        <FormSelect
          name="category"
          label="Choose a Category"
          options={options}
          selected={findOptionIndex()}
        />
        <FormInput name="slug" label="URL Slug" value={project.slug} />
        <img src={project.img} alt={project.alt} className="edit-image" />
        <FormInput
          name="img"
          label="Upload an Image"
          type="file"
          accept="image/*"
          className="image-upload"
        />
        <FormInput name="alt" label="Image alt text" value={project.alt} />
        <FormInput name="originalImg" type="hidden" value={project.img} />
        <FormInput
          name="writeup"
          label="Post Text"
          type="hidden"
          value={data !== "" ? data : project.writeup}
        />
      </ValidatedForm>
      <Tiptap project={project} childToParent={childToParent} />
      <button
        form="edit-post"
        type="submit"
        disabled={isSubmitting}
        className={isSubmitting ? "disabled-btn submit" : "submit"}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </>
  );
}
