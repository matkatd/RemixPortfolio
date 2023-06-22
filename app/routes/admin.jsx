import { Outlet } from "@remix-run/react";
import { requireUserId } from "../utils/auth.server";
import styles from "../styles/tiptap.css";
import adminStyles from "../styles/admin.css";
import remixicon from "remixicon/fonts/remixicon.css";

export const loader = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Admin() {
  return (
    <main>
      <h2>Admin</h2>
      <Outlet />
    </main>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: remixicon },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: adminStyles },
  ];
}
