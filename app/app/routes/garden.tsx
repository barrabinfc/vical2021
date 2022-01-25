import { Outlet } from "remix";
import { DefaultLayout, links as layoutLinks } from "~/layouts/layout";

export function links() {
  return [...layoutLinks()];
}

export const handle = {
  hydrate: true,
};

export default function Garden() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
