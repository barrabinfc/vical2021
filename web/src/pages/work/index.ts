import { range } from "~/lib/helpers";
import style from "./work.module.css";
import faker from "faker/locale/en";

export async function getAllProjects(): Promise<Work[]> {
  const projects = range(5).map(() => {
    return {
      route: "/",
      href: "/",
      avatar: {
        /** @ts-ignore */
        url: faker.image.unsplash.imageUrl(),
        width: 280 * 2,
        height: 280,
      },
      content: {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraphs(),
      },
    };
  });
  return projects;
}
