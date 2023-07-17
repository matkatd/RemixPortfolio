import { Storage } from "@google-cloud/storage";
import { env } from "process";
import { Readable } from "stream";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";

const uploadStreamToCloudStorage = async (data, filename) => {
  if (filename === "") {
    return "";
  }
  // Convert from AsyncIterable to something Storage can handle

  const readable = Readable.from(data);

  console.log("upload-handler: In file handler");
  const bucketName = env.GOOGLE_BUCKET_NAME;

  // Create Cloud Storage client
  const cloudStorage = new Storage({
    projectId: env.PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: env.PROJECT_ID,
      private_key_id: env.GOOGLE_PRIVATE_KEY_ID,
      private_key: env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      client_email: env.GOOGLE_CLIENT_EMAIL,
      client_id: env.GOOGLE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: env.GOOGLE_CLIENT_CERT_URL,
    },
  });

  // Create a reference to the file.
  const bucket = cloudStorage.bucket(bucketName);

  const file = bucket.file(filename);

  async function streamFileUpload() {
    readable.pipe(file.createWriteStream()).on("finish", () => {
      // The file upload is complete
      console.log("upload-handler: upload completed");
    });

    console.log(`upload-handler: ${filename} uploaded to ${bucketName}`);
  }

  await streamFileUpload().catch(console.error);

  console.log(
    `upload-handler: confirming: ${filename} uploaded to ${bucketName}`
  );
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
};

export const uploadHandler = unstable_composeUploadHandlers(
  async ({ name, data, filename }) => {
    if (name === "img" || name === "src") {
      const uploadedImage = await uploadStreamToCloudStorage(data, filename);
      return uploadedImage;
    }
    return undefined;
  },
  unstable_createMemoryUploadHandler() // Uses this if it's not an image
);
