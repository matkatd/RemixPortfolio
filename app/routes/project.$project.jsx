import { json } from "@remix-run/node";
import { getRequiredParam } from "../utils/http.server";
import { getProject } from "../utils/projects.server";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

export async function loader({ params }) {
  const project = await getProject(params.project);

  if (!project) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(project);
}

export default function Project() {
  const data = useLoaderData();

  return (
    <main className="project-page">
      <div className="left-sidebar"></div>
      <div className="project-body">
        <h1 id="projectTitle">{data.title}</h1>
        <img id="projectImg" src={data.img} alt={data.alt} />
        {convertToHTML(data.writeup)}
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

function convertToHTML(writeup) {
  const parse = require("html-react-parser");
  const html = parse(writeup.join(""));
  return html;
}
