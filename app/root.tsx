import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import Layout from "./layout";
import { createCSRFToken } from "./util/createCSRF.server";
import { commitSession, getSession } from "./sessions";

import indexSheet from "./styles/index.css";
import tailwindSheet from "./styles/app.css";

import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import { AuthenticityTokenProvider } from "./context/AuthenticityToken";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Sean Cotter | Full Stack Web Developer",
  viewport: "width=device-width,initial-scale=1",
  description: `
    My name is Sean Cotter, I'm a full stack web developer located outside of Philadelphia, PA. I specialize in React, Typescript, Node.JS and Go.
  `,
  keywords: `
    Full Stack Web Developer, Web Development, Front-end Development, Back-end Development, React, JSX, TSX, Typescript, Javascript, Node.JS, Go, Golang, Python, HTML, CSS
  `,
  "og:title": "Sean Cotter | Full Stack Web Developer",
  "og:description": `
    My name is Sean Cotter, I'm a full stack web developer located outside of Philadelphia, PA. I specialize in React, Typescript, Node.JS and Go.
  `,
  "og:image": "https://cotter.tech/splash.png",
  "og:url": "https://cotter.tech",
  "twitter:card": "summary_large_image",
  "twitter:title": "Sean Cotter | Full Stack Web Developer",
  "twitter:description": `
    My name is Sean Cotter, I'm a full stack web developer located outside of Philadelphia, PA. I specialize in React, Typescript, Node.JS and Go.
  `,
  "twitter:image": "https://cotter.tech/splash.png",

});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindSheet },
  { rel: "stylesheet", href: indexSheet },
];

export let loader: LoaderFunction = async ({ request }) => {
  let session = await getSession(request.headers.get("Cookie"));
  let csrf = createCSRFToken();
  session.set("csrf", csrf);
  return json(
    { csrf },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
};

export default function App() {
  const { csrf } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AuthenticityTokenProvider token={csrf}>
          <Layout />
        </AuthenticityTokenProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
