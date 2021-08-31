---
draft: false
layout: ../../../layouts/Project/Project.astro
slug: portinari-chilk
path: /projects/portinari-chilk
title: chilk
subtitle: Portinari On-site Kiosk App
thumbnail: "/images/portinari/portal.jpg"
schema: "article"

# color: "#0f0f0f"
# bg_color: "#f8fbfb"
# dark_gray: "#f8f8f8"
# logo: "/images/icons/yin_yang.svg"
# currentColor: asd

date: "2018-06-03"
thumbscheme: "dark"
thumb_position: "top"

website: "https://vitocal.bitbucket.io/"
description: "Junto com Ligalight, produzimos o aplicativo e projeções do kiosk da portinari. Baseado na idéia <i>faça vc mesmo</i>, os desenhos criados no aplicativo são projetados no stand.</p><p>Utilizamos Processing e Vue</p>"
---

Produzimos em conjunto com a **Ligalight** o aplicativo SPA e projeções para Portinari, baseado na idéia <i>faça vc mesmo</i>.

Os desenhos criados pelos visitantes através de um iPad são reproduzidos no ambiente através de poderosos projetores.
O aplicativo também permite a visualização do catálogo da portinari, lendo o código QR no stand.

- Para as projeções, criamos sketchs Processing que estilizam os desenhos.
- Usamos um iPad e VueJS para o aplicativo de controle remoto.
- Para comunicação entre os 2 aplicativos, criamos uma ponte Websocket e OSC UDP.

<div class="gallery">
  <img src="/images/portinari/thumb.jpg" alt="Showcase" />
  <div class="container grid browser-mask">
    <div class="cellphone margin:auto pad:big">
      <div class="marvel-device ipad landscape">
          <div class="camera"></div>
          <div class="screen">
              <img src="/images/portinari/screen.png" alt="Vector drawing app" />
              <!-- <img src="//images/portinari/uploads/portinari/screen.png" alt="Vector drawing app" /> -->
          </div>
          <div class="home"></div>
      </div>
    </div>
  </div>
<!--
  <div class="browser-mask">
    <div class="browser-screen appearFromBottom :play">
      img src="/images/portinari/admin.png" alt="Administrator screen
    </div>
  </div>
-->
  <video poster='/images/portinari/tree_poster.jpg' preload="none"
        controls src='/images/portinari/tree.mp4' type="video/mp4"></video>

  <div class="gallery-columns">
    <div>
        <video poster='/images/portinari/user_poster.jpg' preload="none"
          controls src='/images/portinari/user.mp4' type="video/mp4"></video>
    </div>
    <div>
        <img src="/images/portinari/text.jpg" alt="Text panel" />
        <img src="/images/portinari/t2.jpg" alt="People taking pictures on portinari stand" />
    </div>
  </div>
</div>
