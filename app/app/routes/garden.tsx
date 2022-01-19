import { Outlet } from "remix";
import { DefaultLayout } from "~/layouts/layout";

export default function Garden() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}
