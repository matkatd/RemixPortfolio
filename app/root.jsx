import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import mainStyles from '~/styles/main.css';
import NavBar from "./routes/components/NavBar";

export const meta = () => ([{
  charset: "utf-8",
  title: "David's Portfolio",
  viewport: "width=device-width,initial-scale=1",
}]);

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <NavBar />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: mainStyles }]
}
