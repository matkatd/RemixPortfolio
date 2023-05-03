import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getProjects } from "../utils/db.server";

import { json, redirect } from "@remix-run/node";
// import { getRequiredParam, notFound } from "../../utils/http.server";
import CardList from "~/routes/components/CardList";
import styles from "~/styles/projects.css";

export async function loader({ request, params }) {
  // const param = getRequiredParam(params, "category");
  const url = new URL(request.url);
  const param = url.searchParams.get("category");

  if (!param) {
    return redirect("/");
  }
  const projects = await getProjects(param);
  if (projects.length === 0) {
    throw new Response("Invalid category", {
      status: 404,
    });
  }
  return json({ projects, param });
}

export default function Projects() {
  const { projects, param } = useLoaderData();

  return (
    <main>
      <h2 className="grid-page img-page">{getTitle(param)}</h2>
      <CardList data={projects} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main className="error-page">
        <h1>Oops</h1>
        <h2>Error: {error.status}</h2>
        <p>
          {error.status === 404
            ? "Invalid Category! We seem to have lost what you are looking for!"
            : error.data.message}
        </p>
      </main>
    );
  }
  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  return (
    <main className="error-page">
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function getTitle(category) {
  switch (category) {
    case "wdd":
      return "Web Design & Development Projects";
    case "software_engineering":
      return "Software Engineering Projects";
    case "other":
      return "Other Projects and Writings";
    default:
      return "Sorry bout that, you found an error 😬";
  }
}
