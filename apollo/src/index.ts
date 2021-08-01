import { ApolloServer } from "apollo-server";
import { createApplication } from "graphql-modules";
import { ApolloServerPluginUsageReportingDisabled } from "apollo-server-core";

import dataSourcesFactory from "./dataSources";

import books from "./books/index";
import projects from "./projects/index";
import notion from "./notion/index";

const app = createApplication({
  modules: [notion, books, projects],
});

const schema = app.createSchemaForApollo();
const server = new ApolloServer({
  schema,
  dataSources: dataSourcesFactory,
  plugins: [ApolloServerPluginUsageReportingDisabled()],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => null);
}
