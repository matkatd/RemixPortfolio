import { Storage } from "@google-cloud/storage";
import { debug } from "./debug";
import { env } from "process";
import { Readable } from "stream";

const uploadStreamToCloudStorage = async (data, filename) => {
  debug();
  const readable = Readable.from(data);
  // if (name !== "post-img") {
  //   stream.resume();
  //   return;
  // } else {
  //   console.log(name, fileName);
  // }

  console.log("In file handler");
  const bucketName = "portfolio-resources";

  // Create Cloud Storage client
  const cloudStorage = new Storage({
    projectId: env.PROJECT_ID,
    credentials: {
      type: "service_account",
      project_id: env.PROJECT_ID,
      private_key_id: env.GOOGLE_PRIVATE_KEY_ID,
      private_key: env.GOOGLE_PRIVATE_KEY,
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
    });

    console.log(`${filename} uploaded to ${bucketName}`);
  }

  streamFileUpload().catch(console.error);

  return `https://storage.googleapis.com/portfolio-resources/${filename}`;
};

export const cloudStorageUploaderHandler = async (data, filename) => {
  return await uploadStreamToCloudStorage(data, filename);
};
