import { Link, Outlet } from "@remix-run/react";
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
      <Link className="admin-header" to="/admin">
        <h2>Admin</h2>
      </Link>
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
