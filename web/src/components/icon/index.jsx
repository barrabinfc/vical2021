import React from 'react';

import HamburgerIcon from './hamburger.jsx';
import EmailIcon from './email.jsx';
import GithubIcon from './github.jsx';
import GithubOutlineIcon from './github-outline.jsx';
import TwitterIcon from './twitter-outline.jsx';
import VicalIcon from './vical.jsx';

function Icon(props) {
  switch (props.symbol) {
    case 'email':
      return <EmailIcon />;
    case 'twitter-outlined':
      return <TwitterIcon />;
    case 'github':
      return <GithubIcon />;
    case 'github-outlined':
      return <GithubOutlineIcon />;
    case 'hamburger':
      return <HamburgerIcon />;
    case 'vical':
      return <VicalIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
}

export default Icon;
