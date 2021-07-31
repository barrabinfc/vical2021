import { createModule } from "graphql-modules";

import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";

export default createModule({
  id: "projects",
  dirname: __dirname,
  typeDefs: [typeDefs],
  resolvers,
});
