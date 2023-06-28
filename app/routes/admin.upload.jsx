import { json, unstable_parseMultipartFormData } from "@remix-run/node";
import { uploadHandler } from "../utils/uploader-handler.server";

export async function action({ request }) {
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const src = formData.get("src");
  console.log(src.name);

  return json({ src: src, alt: formData.get("alt") });
  //   return json(await cloudStorageUploaderHandler(src, src.name));
}
