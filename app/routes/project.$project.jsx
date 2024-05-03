import { json } from "@remix-run/node";
import { env } from "process";
import { getProject } from "../utils/db.server";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ReadOnlyTiptap from "./components/ReadOnlyTiptap";

export async function loader({ params }) {
  const project = await getProject(params.project);

  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }
  console.log(env.STORAGE_URL);
  return json({ data: project, storageUrl: env.STORAGE_URL });
}

export default function Project() {
  const { data, storageUrl } = useLoaderData();

  return (
    <main className="project-page">
      <div className="left-sidebar"></div>
      <div className="project-body">
        <h1 id="projectTitle">{data.title}</h1>
        <img id="projectImg" src={storageUrl + data.img} alt={data.alt} />
        <ReadOnlyTiptap project={data} />
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </main>
    );
  }
  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage = "Unknown error";
  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{error.message || errorMessage}</pre>
    </div>
  );
}
