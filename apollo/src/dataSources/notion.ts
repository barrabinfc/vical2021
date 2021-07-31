import { Client } from "@notionhq/client";
import { ClientOptions } from "@notionhq/client/build/src/Client";
import { DataSource } from "apollo-datasource";

export class Notion extends DataSource {
  public api: Client;
  constructor(config: ClientOptions) {
    super();
    this.api = new Client(config);
  }
}

// const { Client } = require("@notionhq/client");

// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// (async () => {
//   const databaseId = "9e64c3a89a9f4f858d5ab1674109cf7d";
//   const response = await notion.databases.query({
//     database_id: databaseId,
//   });
//   console.log(response);
// })();
