import { Outlet } from "@remix-run/react";
import { requireUserId } from "../utils/auth.server";
import styles from "../styles/tiptap.css";

export const loader = async ({ request }) => {
  await requireUserId(request);
  return null;
};

export default function Admin() {
  return (
    <main>
      <h2>
        here is the administrative page where eventually you'll be able to
        create new posts
      </h2>
      <Outlet />
    </main>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
