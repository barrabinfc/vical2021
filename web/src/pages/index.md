---
setup: |
  import {Heading} from '../components/Text/Heading.tsx';
  import {HeadingLevel} from '../@types/a11y.ts';
  import Debug from 'astro/debug';

schema: basic
status: in progress
published: true
layout: ../layouts/home.astro

title: Vical
subtitle: I'm vitor and i write web software
description: Personal website
publishedAt: 2021-10-15
---

<Heading id="spotlight" className="heading-spotlight" client:idle>Vitor Calejuri</Heading>

<Heading HeadingLevel={HeadingLevel.h2} id="title" className="heading-title">
  I'm a developer living and working in São Paulo, Brazil.
</Heading>

<div id="subtitle" class="heading-subtitle">
  You've found my digital garden. I write about web development,
  software engineering and occasionaly, climbing and running.
</div>
