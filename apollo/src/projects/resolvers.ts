import { Page, Sort } from "@notionhq/client/build/src/api-types";
import GQLJson, { GraphQLJSONObject as JSONObject } from "graphql-type-json";

import { DataSources, Notion } from "../dataSources";
import { slugify } from "../helpers/slugify";

import * as NotionEnums from "../notion/enums";
import { getPlainText } from "../notion/helpers";
import * as NotionTypes from "../notion/resolvers";

const databaseId = "9e64c3a89a9f4f858d5ab1674109cf7d";

// export async function projectsDatabase(
//   _: any,
//   params,
//   { dataSources }: { dataSources: DataSources }
// ) {
//   const projectsAPI = dataSources.notion.api;
//   const response = await projectsAPI.databases.retrieve({
//     database_id: databaseId,
//   });

//   return {
//     id: response.id,
//     object: response.object,
//     created_time: response.created_time,
//     last_edited_time: response.last_edited_time,
//     title: response.title,
//     properties: response.properties,
//   };
// }

export async function projects(
  _: any,
  {
    start_cursor,
    sorts,
    page_size = 100,
  }: { start_cursor?: string; page_size: number; sorts: Sort[] },
  { dataSources }: { dataSources: DataSources }
) {
  const projectsAPI = dataSources.notion.api;
  const response = await projectsAPI.databases.query({
    database_id: databaseId,
    start_cursor,
    page_size,
    sorts,
  });

  console.log(response.results);
  // response.results.map((item) => {
  //   console.log(JSON.stringify(item.properties, null, "\t"));
  // });

  /**
   * Validates if the project has the required propertys
   * @throws {TypeError}
   */
  function validateProjectProperties(proj: Page): Page {
    const requiredProperties = ["Name", "slug"];
    requiredProperties.forEach((reqProp) => {
      if (!(reqProp in proj.properties)) {
        throw new TypeError(
          `Notion Page ${proj.id} is missing property ${reqProp}`
        );
      }
    });

    return proj;
  }

  return {
    totalCount: 0,
    edges: response.results.map(validateProjectProperties).map((item) => {
      const name = getPlainText(item.properties["Name"]);
      const slug = getPlainText(item.properties["slug"]) || slugify(name);
      return {
        node: {
          id: item.id,
          name: name,
          title: name,
          slug: slug.toLowerCase(),

          created_time: item.created_time,
          last_edited_time: item.last_edited_time,

          published: item.properties["published"],
          archived: item.archived,

          properties: Object.entries(item.properties).map(
            ([key, { id, type, ...rest }]) => ({
              id: id,
              name: key,
              type: type,
              ...rest,
            })
          ),
        },
        cursor: item.id,
      };
    }),
    pageInfo: {
      endCursor: response.next_cursor,
      hasNextPage: response.has_more,
    },
  };
}

export default {
  JSONObject,
  ...NotionEnums,
  ...NotionTypes,
  Query: {
    // projectsDatabase,
    projects,
  },
};
