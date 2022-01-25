import React from "react";

import Header, { links as HeaderLinks } from "~/components/Header/Header";

export const links = () => [...HeaderLinks()];
export const handle = {
  hydrate: true,
};
export default function Pancake3({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header sticky={false} />
      </header>
      <main className="main" id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer"></footer>
    </>
  );
}
