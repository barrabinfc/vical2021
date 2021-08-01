export enum RichTextTypeEnum {
  text = "text",
  mention = "mention",
  equation = "equation",
}

export enum PropertyTypeEnum {
  title = "title",
  rich_text = "rich_text",
  number = "number",
  select = "select",
  multi_select = "multi_select",
  date = "date",
  people = "people",
  file = "file",
  checkbox = "checkbox",
  url = "url",
  email = "email",
  phone_number = "phone_number",
  formula = "formula",
  relation = "relation",
  rollup = "rollup",
  created_time = "created_time",
  created_by = "created_by",
  last_edited_time = "last_edited_time",
  last_edited_by = "last_edited_by",
}

export enum BlockTypeEnum {
  paragraph = "paragraph",
  heading_1 = "heading_1",
  heading_2 = "heading_2",
  heading_3 = "heading_3",
  bulleted_list_item = "bulleted_list_item",
  numbered_list_item = "numbered_list_item",
  to_do = "to_do",
  toggle = "toggle",
  child_page = "child_page",
  unsupported = "unsupported",
}
