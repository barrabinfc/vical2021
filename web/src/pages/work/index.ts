import { range } from "~/lib/helpers";
import faker from "faker/locale/en";
import { lipsum } from "~/lib/lipsum";

export async function getAllProjects(): Promise<Work[]> {
  return [
    {
      slug: "eveniet-illo",
      href: `/work/eveniet-illo`,
      avatar: {
        /** @ts-ignore */
        url: faker.image.unsplash.imageUrl(),
        width: 280 * 2,
        height: 280,
      },
      content: {
        title: faker.lorem.sentence(),
        description: lipsum(1).join(" "),
      },
    },
    {
      slug: "dicta-rerum",
      href: `/work/dicta-rerum`,
      avatar: {
        /** @ts-ignore */
        url: faker.image.unsplash.imageUrl(),
        width: 280 * 2,
        height: 280,
      },
      content: {
        title: faker.lorem.sentence(),
        description: lipsum(1).join(" "),
      },
    },
    {
      slug: "quod-autem",
      href: `/work/quod-autem`,
      avatar: {
        /** @ts-ignore */
        url: faker.image.unsplash.imageUrl(),
        width: 280 * 2,
        height: 280,
      },
      content: {
        title: faker.lorem.sentence(),
        description: lipsum(1).join(" "),
      },
    },
    {
      slug: "velit-exercitationem",
      href: `/work/velit-exercitationem`,
      avatar: {
        /** @ts-ignore */
        url: faker.image.unsplash.imageUrl(),
        width: 280 * 2,
        height: 280,
      },
      content: {
        title: faker.lorem.sentence(),
        description: lipsum(1).join(" "),
      },
    },
  ];
}
