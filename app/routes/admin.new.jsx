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
import { createProject } from "../utils/db.server";

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
    title: yup.string().label("Post Title").required(),
    category: yup.string().label("Post Category").required(),
    slug: yup.string().label("URL slug").required(),
    img: yup.string().label("Main image for Post").required(),
    alt: yup.string().label("Alt text for image").required(),
    writeup: yup.string().required(),
  })
);

export const action = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);
  createProject(fieldValues.data);
  return redirect("/admin");
};

export const loader = async () => {
  return json({
    placeholder: {
      title: "Enter a title",
      category: "Post Category",
      slug: "slug",
      img: "",
      alt: "Describe the image",
    },
  });
};

export default function AdminNew() {
  const { placeholder } = useLoaderData();
  const [data, setData] = useState("");

  const childToParent = (childData) => {
    setData(childData);
  };

  const isSubmitting = useIsSubmitting("new-post");

  return (
    <>
      <ValidatedForm
        validator={validator}
        method="post"
        name="new-post"
        id="new-post"
        encType="multipart/form-data">
        <FormInput
          name="title"
          label="Post Title"
          placeholder={placeholder.title}
        />
        <FormSelect
          name="category"
          label="Choose a Category"
          options={options}
          selected={{ value: "", label: "--Choose a Category--" }}
        />
        <FormInput
          name="slug"
          label="URL Slug"
          placeholder={placeholder.slug}
        />
        <FormInput
          name="img"
          label="Upload an Image"
          type="file"
          accept="image/*"
          className="image-upload"
        />
        <FormInput
          name="alt"
          label="Image alt text"
          placeholder={placeholder.alt}
        />
        <FormInput
          name="writeup"
          label="Post Text"
          type="hidden"
          value={data}
        />
      </ValidatedForm>
      <Tiptap project={""} childToParent={childToParent} />
      <button
        form="new-post"
        type="submit"
        disabled={isSubmitting}
        className={isSubmitting ? "disabled-btn submit" : "submit"}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </>
  );
}
