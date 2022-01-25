import { FC } from "react";

import Pancake3 from "./Pancake3";
export { links } from "./Pancake3";

export const DefaultLayout: FC = ({ children }) => {
  return <Pancake3>{children}</Pancake3>;
};

export default DefaultLayout;
