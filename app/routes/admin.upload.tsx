import type { ActionFunctionArgs} from "@remix-run/node";
import { json, unstable_parseMultipartFormData } from "@remix-run/node";

import { uploadHandler } from "../utils/uploader-handler.server";

export async function action({ request }: ActionFunctionArgs) {
  let formData: FormData = new FormData();
  try {
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } catch (e) {
    console.log("admin-upload: Problem uploading file: " + e);
    throw new Error("admin-upload: Problem uploading file");
  }

  const src: any = formData.get("src");
  console.log("admin-upload: Uploaded filename: " + src?.name);

  return json({ src: src, alt: formData.get("alt") });
}
