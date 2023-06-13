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
import { uploadHandler } from "../utils/uploader-handler.server";
import { createPost } from "../utils/db.server";
import FormInput from "./components/FormInput";
import { useState } from "react";
import Tiptap from "./components/Tiptap";
import FormSelect from "./components/FormSelect";

const validator = withYup(
  yup.object({
    title: yup.string().label("Post Title").required(),
    category: yup.string().label("Post Category").required(),
    slug: yup.string().label("URL slug").required(),
    img: yup.string().label("Main image for Post").required(),
    alt: yup.string().label("Alt text for image").required(),
  })
);

export const action = async ({ request }) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const fieldValues = await validator.validate(formData);
  if (fieldValues.error) return validationError(fieldValues.error);
  // createPost(fieldValues.data);
  return redirect("/admin");
};

export const loader = async (args) => {
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

export default function AdminEdit() {
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
        <FormSelect name="category">
          <option>--Choose a Category--</option>
          <option value="wdd">Web Design & Development</option>
          <option value="software_engineering">Software Engineering</option>
          <option value="other">Other</option>
        </FormSelect>
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
