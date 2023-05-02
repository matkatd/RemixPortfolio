import { useLoaderData } from "@remix-run/react";
import { getProjects } from "../../utils/projects.server";

import { json } from "@remix-run/node";
import { getRequiredParam, notFound } from "../../utils/http.server";
import CardList from "../components/CardList";

export async function loader({ request }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const projects = await getProjects(category);

  if (!projects) {
    throw notFound(`No projects with category `);
  }
  return json({ projects, category });
}

export default function Projects() {
  const { projects, category } = useLoaderData();
  return (
    <main>
      <h2 className="grid-page img-page">{getTitle(category)}</h2>
      <CardList data={projects} />
    </main>
  );
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
      break;
  }
}
