import { createModule } from "graphql-modules";

import typeDefs from "./schema.graphql";
import { books } from "./resolver";

export const resolvers = {
  Query: {
    books,
  },
};

export default createModule({
  id: "books",
  typeDefs: [typeDefs],
  resolvers,
});
