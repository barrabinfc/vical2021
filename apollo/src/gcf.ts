import { startServer } from "./index";

const theServer = startServer("googlecloud");
switch (theServer.mode) {
  case "googlecloud":
    exports.handler = theServer.server.createHandler();
}
