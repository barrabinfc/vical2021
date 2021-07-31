declare module "*.module.css";
declare module "*.module.scss";

interface ImportMeta {
  globEager(string): Promise<NodeModule>;
}
