import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";

export const loader:LoaderFunction = async ({ params }) => {
  return params.slug;
};

export default function GardenSlug() {
  const slug = useLoaderData();
  return (
    <section>
      <h1>Some ss Post</h1>
      {/* <pre>{slug}</pre> */}
    </section>
  );
}
