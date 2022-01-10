import { FC } from "react";

export const MinimalLayout: FC = ({ children }) => {
  return (
    <>
      <h1>Hello</h1>
      {children}
    </>
  );
};

export default MinimalLayout;
