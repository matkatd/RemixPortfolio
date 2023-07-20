import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import mainStyles from "~/styles/main.css";
import highlight from "~/styles/code.css";
import NavBar from "~/routes/components/NavBar";
import { Footer } from "~/routes/components/Footer";

export const meta = () => [
  {
    charset: "utf-8",
    title: "David's Portfolio",
    viewport: "width=device-width,initial-scale=1",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <NavBar />
        </header>
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: mainStyles },
    { rel: "stylesheet", href: highlight },
  ];
}

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <NavBar />
        </header>
        <h1>Oopsie...</h1>
        <p>Here's your error: {error}</p>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
