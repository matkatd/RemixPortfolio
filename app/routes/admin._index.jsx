import { json } from "@remix-run/node";
import { getAllProjects } from "../utils/db.server";
import { Link, useLoaderData } from "@remix-run/react";
import CardList from "./components/CardList";
import { env } from "process";

export async function loader() {
  try {
    const data = await getAllProjects();
    return json({ data: data, storageUrl: env.STORAGE_URL });
  } catch (error) {
    throw new Response("We can't find the projects!", { status: 500 });
  }
}

export default function AdminIndex() {
  const { data } = useLoaderData();

  return (
    <div>
      <Link className="new-project" to={"/admin/new"}>
        New Project
      </Link>
      <CardList data={data} admin={true} />
    </div>
  );
}
