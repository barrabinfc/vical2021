import { Notion } from "./notion";
import { Airtable } from "./airtable";

export { Airtable } from "./airtable";
export { Notion } from "./notion";

import secrets from "../secrets";

export type DataSources = {
  books: Airtable;
  notion: Notion;
};

export default function dataSourcesFactory(): DataSources {
  return {
    books: new Airtable({
      apiKey: secrets.AIRTABLE.apiKey,
      base: secrets.AIRTABLE.booksBaseId,
    }),
    notion: new Notion({
      auth: secrets.NOTION.apiKey,
    }),
  };
}
