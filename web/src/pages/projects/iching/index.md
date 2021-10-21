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

Me and friends used to start the day by playing the IChing[^1]. It was fun and most of all, reflexive. The IChing, also know as Book of changes is a ancient chinese Tao classic and full of meditative advice for **virtue**, **inner strength and integrity**. I miss those morning rituals.

So i've built an Iching app. My goal in the project was to create a clean, lightweight and ad-free application using only web technologies. I've built it with [React](https://reactjs.org/) and [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) for offline support.

The app scores above **90/100** in lighthouse[^2] performance benchmarks. 👌

</div>

<div class="toc-contents center">

| Type     | Live                   | Source Code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Created at | Technology                         | License                                                                                                                                                                                                                       |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Personal | [View App](iching.xyz) | [<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 32 32" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"></path></svg>](https://github.com/barrabinfc/iching) | 06/2018    | React, Redux, Service Workers, Web | <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img width="88px" height="32px" alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a> |

</div>

---

<div class="gallery grid2 justifyCenter">
  <div class="page h50">
    <div class="mockup">
      <div is="iphoneMockup">
        <img src="/images/iching/frontpage(iPhone X).png" alt="Iching app home screen" />
      </div>
    </div>
  </div>
  <div class="page h50">
    <div class="mockup">
      <div is="iphoneMockup">
        <img src="/images/iching/interpretation3(iPhone X).png" alt="Screen displaying the iching of The Creative" />
      </div>
    </div>
  </div>
</div>

---

### Lessons Learned

The most important one is the performance of client-side rendering. When i started, i thought that
rendering on the client device using react was fast enough, since it's a reccommended practice for SPA, but it soon showed it's limitations. Huge bundle output, poor performance on old mobile phones and a effective wall on lighthouse performance metrics around 80/90%. A sizable effort was done to minimize bundle size, remove dependencies and improve FCP time.

I now take great care for dependencies and bundle output. I avoid client-side rendering when possible using **island architectures**[^5] with Progressive hydration to acchieve extremely fast websites experiences. I've also
ditched webpack and core-js compilation in favor of [native javascript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) when possible.

[^1]: [Iching wikipedia](https://en.wikipedia.org/wiki/Tao_Te_Ching)
[^2]: [Lighthouse performance metrics](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fiching.netlify.app%2F)
[^5]: [Island Architecture](https://jasonformat.com/islands-architecture/)

<style global>
[project-slug="iching"] .logo {
  -webkit-transform-origin: 50%  50%;
  opacity: 0.18;
  transform: scale(3.3);
}

[project-slug="iching"] .project-masthead .title {
  text-align: center;
}

[project-slug="iching"] .project-masthead .subtitle {
  display: none;
}

</style>
