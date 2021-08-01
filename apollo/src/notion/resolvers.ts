import GQLJson, { GraphQLJSONObject as JSONObject } from "graphql-type-json";
import { pascalCase } from "change-case";

import * as NotionEnums from "./enums";
import { DataSources } from "../dataSources";

export const AnyText = {
  __resolveType: (text) => pascalCase(text.type),
};
export const Property = {
  __resolveType(obj, ctx, info) {
    return pascalCase(`property_${obj.type}`);
  },
};
export const Block = {
  __resolveType(obj, ctx, info) {
    return pascalCase(`block_${obj.type}`);
  },
};

export async function blocks(
  _: any,
  {
    block_id,
    start_cursor,
    page_size = 100,
  }: { block_id: string; start_cursor?: string; page_size?: number },
  { dataSources }: { dataSources: DataSources }
) {
  const notionAPI = dataSources.notion.api;
  const response = await notionAPI.blocks.children.list({
    block_id,
    start_cursor,
    page_size,
  });
  const blocks = response.results;
  console.info(JSON.stringify(blocks, null, "\t"));

  return {
    totalCount: undefined,
    edges: blocks.map((block) => ({
      node: {
        ...block,
        ...(block.type === "unsupported" && {
          ...block,
          unsupported: [],
        }),
      },
    })),
    pageInfo: {
      endCursor: response.next_cursor,
      hasNextPage: response.has_more,
    },
  };
}

export default {
  JSONObject,
  ...NotionEnums,
  AnyText,
  Property,
  Block,
  Query: {
    blocks,
  },
};
