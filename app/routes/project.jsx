import { Outlet } from "@remix-run/react";
import styles from "../styles/project.css";

export default function ProjectsPage() {
  return <Outlet />;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
