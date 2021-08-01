import { createModule } from "graphql-modules";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

export default createModule({
  id: "notion",
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
});
