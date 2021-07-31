import {
  PropertyValueBase,
  RichTextPropertyValue,
  TitlePropertyValue,
} from "@notionhq/client/build/src/api-types";

export function isRichText(
  prop: PropertyValueBase
): prop is RichTextPropertyValue {
  return prop && "rich_text" in prop;
}
export function isTitle(prop: PropertyValueBase): prop is TitlePropertyValue {
  return prop && "title" in prop;
}

/**
 * Retrieve the plain_text of a Title/RichText property
 */
export function getPlainText(prop: PropertyValueBase): string | undefined {
  if (isTitle(prop)) {
    return prop.title[0]?.plain_text;
  } else if (isRichText(prop)) {
    return prop.rich_text[0]?.plain_text;
  } else {
    return undefined;
  }
}
