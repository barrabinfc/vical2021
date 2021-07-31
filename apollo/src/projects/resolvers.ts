import GQLJson, { GraphQLJSONObject as JSONObject } from "graphql-type-json";

import { DataSources } from "../dataSources";
import { pascalCase } from "change-case";

import { PropertyTypeEnum, RichTextTypeEnum } from "./enums";

const databaseId = "9e64c3a89a9f4f858d5ab1674109cf7d";

export const AnyText = {
  __resolveType: (text) => pascalCase(text.type),
};

export async function projectsDatabase(
  _: any,
  params,
  { dataSources }: { dataSources: DataSources }
) {
  const projectsAPI = dataSources.notion.api;
  const response = await projectsAPI.databases.retrieve({
    database_id: databaseId,
  });

  return {
    id: response.id,
    object: response.object,
    created_time: response.created_time,
    last_edited_time: response.last_edited_time,
    title: response.title,
    properties: response.properties,
  };
}

export async function projects(
  _: any,
  {
    start_cursor,
    page_size = 100,
  }: { start_cursor?: string; page_size: number },
  { dataSources }: { dataSources: DataSources }
) {
  const projectsAPI = dataSources.notion.api;
  const response = await projectsAPI.databases.query({
    database_id: databaseId,
    // start_cursor,
    // page_size,
  });

  return {
    totalCount: 0,
    edges: response.results.map((item) => ({
      node: {
        id: item.id,
        object: item.object,
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
    })),
    pageInfo: {
      endCursor: response.next_cursor,
      hasNextPage: response.has_more,
    },
  };
}

export default {
  JSONObject,
  RichTextTypeEnum,
  PropertyTypeEnum,
  AnyText,
  Query: {
    projectsDatabase,
    projects,
  },
};
