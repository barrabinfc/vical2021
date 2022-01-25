import React from "react";

import HamburgerIcon from "./hamburger";
import EmailIcon from "./email";
import GithubIcon from "./github";
import GithubOutlineIcon from "./github-outline";
import TwitterIcon from "./twitter-outline";
import VicalIcon from "./vical";

type Props = {
  symbol:
    | "email"
    | "twitter-outlined"
    | "github-outlined"
    | "github"
    | "hamburger"
    | "vical";
};

const Icon = (props: Props): JSX.Element => {
  switch (props.symbol) {
    case "email":
      return <EmailIcon />;
    case "twitter-outlined":
      return <TwitterIcon />;
    case "github":
      return <GithubIcon />;
    case "github-outlined":
      return <GithubOutlineIcon />;
    case "hamburger":
      return <HamburgerIcon />;
    case "vical":
      return <VicalIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
};

export default Icon;
