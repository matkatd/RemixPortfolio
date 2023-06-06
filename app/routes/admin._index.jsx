import { json } from "@remix-run/node";
import { getAllProjects } from "../utils/db.server";
import { useLoaderData } from "@remix-run/react";
import CardList from "./components/CardList";

export async function loader() {
  try {
    const data = await getAllProjects();
    return json(data);
  } catch (error) {
    throw new Response("We can't find the projects!", { status: 500 });
  }
}

export default function AdminIndex() {
  const data = useLoaderData();

  return (
    <div>
      <CardList data={data} admin={true} />
    </div>
  );
}
