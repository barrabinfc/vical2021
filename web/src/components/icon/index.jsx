import React from "react";
import HamburgerIcon from "./hamburger.jsx";
import EmailIcon from "./email.jsx";
import GithubIcon from "./github.jsx";

function Icon(props) {
  switch (props.symbol) {
    case "email":
      return <EmailIcon />;
    case "github":
      return <GithubIcon />;
    case "hamburger":
      return <HamburgerIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
