import dotenv from "dotenv";
dotenv.config();

export default {
  AIRTABLE: {
    apiKey: process.env["AIRTABLE_APIKEY"] || "<API_KEY_HERE>",
    booksBaseId: "appOqm0oQNWYyP5Kd",
  },
  NOTION: {
    apiKey: process.env["NOTION_API_KEY"] || "<API_KEY_HERE>",
  },
};
