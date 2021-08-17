import { ApolloServer } from "apollo-server";
import { ApolloServer as ApolloGoogleCloud } from "apollo-server-cloud-functions";
import { ApolloServerPluginUsageReportingDisabled } from "apollo-server-core";
import { createApplication } from "graphql-modules";
import books from "./books/index";
import dataSourcesFactory from "./dataSources";
import notion from "./notion/index";
import projects from "./projects/index";

// The `listen` method launches a web server.
export function listen(server) {
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => null);
  }
}

export function startServer(mode: "local" | "googlecloud"):
  | {
      mode: "local";
      server: ApolloServer;
    }
  | {
      mode: "googlecloud";
      server: ApolloGoogleCloud;
    } {
  const app = createApplication({
    modules: [notion, books, projects],
  });

  const schema = app.createSchemaForApollo();

  switch (mode) {
    case "googlecloud":
      return {
        mode: "googlecloud",
        server: new ApolloGoogleCloud({
          schema,
          dataSources: dataSourcesFactory,
          plugins: [ApolloServerPluginUsageReportingDisabled()],
        }),
      };
    case "local":
      const server = new ApolloServer({
        schema,
        dataSources: dataSourcesFactory,
        plugins: [ApolloServerPluginUsageReportingDisabled()],
      });
      listen(server);
      return { mode: "local", server };
  }
}

/**
 * TODO: Only have one entry point plz, instead of gcf/local
 */
