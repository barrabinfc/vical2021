import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  useMatches,
  Scripts,
  ScrollRestoration,
} from "remix";
import { MetaFunction, useLoaderData } from "remix";

import pkg from "../package.json";

export function loader() {
  return {
    ENV: {
      FF: {
        ServiceWorker: Boolean(process.env["FF_ServiceWorker"]),
      },
    },
  };
}

export const meta: MetaFunction = () => {
  return {
    title: `${pkg.name}`,
    version: pkg.version,
  };
};

/**
 * Main entry point of web app
 */
export default function App() {
  const data = useLoaderData();
  const matches = useMatches();

  // If at least one route wants to hydrate, this will return true
  const includeScripts = matches.some((match) => match.handle?.hydrate);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />

        {/**
         * Browsers should be aware of environment variables and feature flags
         * @see window.ENV['key']
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />

        {/* include the scripts, or not! */}
        {includeScripts ? <Scripts /> : null}

        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
