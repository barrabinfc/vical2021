---
schema: 'basic'
status: complete
published: true
layout: ../../../layouts/Project/Project.astro
title: I Ching
subtitle: The chinese book of changes application built with React
description: The book of changes app
thumbnail:
  path: /images/iching/yin_yang_filled.svg

publishedAt: 2018-06-01

logo: /images/icons/yin_yang.svg

color: '#0f0f0f'
bg_color: '#f8fbfb'
dark_gray: '#f8f8f8'
currentColor: asd
---

<div class="description">

The I Ching ,also known as Book of Changes, is an ancient Chinese divination text and the oldest of the Chinese classics.

A Progressive Web Application that is lightweight, open source and offline & without ads, built using React, Service Workers and UX of material-ui. Indistinguible from a native application and with a score of 90/100 in lighthouse performance benchmarks. 👌

</div>

<div class="toc-contents center">

| Source Code                                    | URL                   | Created at | Technology | License          |
| ---------------------------------------------- | --------------------- | ---------- | ---------- | ---------------- |
| [github](https://github.com/barrabinfc/iching) | [website](iching.xyz) | 06/2018    | React, SPA | Creative commons |

</div>

---

<div class="gallery grid2 justifyCenter">
  <div class="page h50">
    <div class="mockup">
      <div is="iphoneMockup">
        <img src="/images/iching/frontpage_new.jpg" alt="Iching app home screen" />
      </div>
    </div>
  </div>
  <div class="page h50">
    <div class="mockup">
      <div is="iphoneMockup">
        <img src="/images/iching/INTERPRETATION2.jpg" alt="Screen displaying the iching of Enthusiasm" />
      </div>
    </div>
  </div>
</div>

<style global>
[project-slug="iching"] .logo {
  -webkit-transform-origin: 50%  50%;
  opacity: 0.18;
  transform: scale(3.3);
}
</style>
