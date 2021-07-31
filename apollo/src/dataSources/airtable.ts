import { DataSource } from "apollo-datasource";
import AsyncAirtable from "asyncairtable";
import { Config } from "asyncairtable/lib/@types";

interface AirtableDataSourceConfig {
  apiKey: string;
  base: string;
  config?: Config;
}

export class Airtable extends DataSource {
  public api: AsyncAirtable;
  constructor(config: AirtableDataSourceConfig) {
    super();
    this.api = new AsyncAirtable(config.apiKey, config.base);
  }
}
