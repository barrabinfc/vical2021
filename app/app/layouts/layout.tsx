import { FC } from "react";

import Pancake3 from "./Pancake3";
import { links as PancakeLinks } from "./Pancake3";

import sharedStyles from "~/styles/shared.css";
// import resetSheet from "~/styles/reset.css";
// import mediaSheet from "~/styles/media.css";
// import colorsSheet from "~/styles/colors.css";
// import typographySheet from "~/styles/typography/typography.css";

export const links = () => [
  // {
  //   rel: "stylesheet",
  //   href: resetSheet,
  // },
  // {
  //   rel: "stylesheet",
  //   href: mediaSheet,
  // },
  // {
  //   rel: "stylesheet",
  //   href: colorsSheet,
  // },
  // {
  //   rel: "stylesheet",
  //   href: typographySheet,
  // },
  {
    rel: "stylesheet",
    href: sharedStyles,
  },
  ...PancakeLinks(),
];

export const DefaultLayout: FC = ({ children }) => {
  return <Pancake3>{children}</Pancake3>;
};

export default DefaultLayout;
