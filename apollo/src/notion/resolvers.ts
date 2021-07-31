import GQLJson, { GraphQLJSONObject as JSONObject } from "graphql-type-json";

import { pascalCase } from "change-case";

import { PropertyTypeEnum, RichTextTypeEnum } from "./enums";

export const AnyText = {
  __resolveType: (text) => pascalCase(text.type),
};
export const Property = {
  __resolveType(obj, ctx, info) {
    return pascalCase(`property_${obj.type}`);
  },
};
