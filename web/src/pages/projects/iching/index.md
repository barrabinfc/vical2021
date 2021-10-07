---
schema: 'basic'
status: complete
published: true
layout: ../../../layouts/Project/Project.astro
title: I Ching
subtitle: A application for playing the IChing, the chinese book of changes.
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

Me and friends used to start the day by playing the IChing[^1]. It was fun and most of all, inspirative. The IChing[^1], also know as Book of changes is a ancient chinese Tao classic and full of meditative advice for **virtue**, **inner strength and integrity**. I'm not living with those friends anymore, but i miss those morning rituals.

So i've created my own mobile application
of the IChing[^1]. My goal in the project was to create a clean and lightweight application using only contemporary web technologies. I built it with [React](https://reactjs.org/), [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) for offline support and [material-ui](https://mui.com/) for the UX.

The app is almost indistinguible from a native application, with a score of **90/100** in lighthouse[^2] performance benchmarks. 👌

</div>

<div class="toc-contents center">

| URL                   | Source Code                                    | Created at | Technology | License                                                                                                                                                                                                         |
| --------------------- | ---------------------------------------------- | ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [website](iching.xyz) | [github](https://github.com/barrabinfc/iching) | 06/2018    | React, Web | <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img width="88px" height="32px" alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a> |

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

---

### Lessons Learned

The most important one is the performance of client-side rendering. When i started, i thought that
rendering on the client device using react was fast enough, since it's a common practice of the tech scene, but it showed it's limitations. Huge bundle output, poor performance on old mobile phones and a effective wall on lighthouse performance metrics around 80/90%. A sizable effort was done to minimize bundle size, remove dependencies and improve FCP time.

I now take great care for dependencies and bundle output. I avoid client-side rendering when possible using **island architectures**[^5] with Progressive hydration to acchieve extremely fast websites experiences. I've also
ditched webpack and core-js compilation in favor of [native javascript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

[^1]: [Iching wikipedia](https://en.wikipedia.org/wiki/Tao_Te_Ching)
[^2]: [Lighthouse performance metrics](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fiching.netlify.app%2F)
[^5]: [Island Architecture](https://jasonformat.com/islands-architecture/)

<style global>
[project-slug="iching"] .logo {
  -webkit-transform-origin: 50%  50%;
  opacity: 0.18;
  transform: scale(3.3);
}
</style>
