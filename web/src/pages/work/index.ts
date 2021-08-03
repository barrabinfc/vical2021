import { range } from "~/lib/helpers";
import faker from "faker/locale/en";
import { lipsum } from "~/lib/lipsum";

const imgPrefix = "https://5j0s6.csb.app/images/";
export async function getAllProjects(): Promise<Work[]> {
  return [
    {
      slug: "eveniet-illo",
      href: `/work/eveniet-illo`,
      avatar: {
        url: imgPrefix + "a.jpg",
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
        url: imgPrefix + "b.jpg",
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
        url: imgPrefix + "c.jpg",
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
        url: imgPrefix + "d.jpg",
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
