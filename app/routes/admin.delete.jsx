import { redirect } from "@remix-run/node";
import { deleteProject } from "../utils/db.server";

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("id");
  await deleteProject(id);
  return redirect("/admin");
}
