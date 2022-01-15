import React from "react";

export default function Pancake3({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">header</header>
      <main className="main" id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="footer">footer</footer>
    </>
  );
}
