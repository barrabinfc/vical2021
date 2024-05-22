---
setup: |
  import IpadMockup from '../../../components/Mockups/Tablet/IpadPro13';
  import Gallery from '../../../components/Gallery/Gallery';

layout: ../../../layouts/Project/Project2Column.astro
schema: 'basic'
status: complete
published: true
title: chilk
subtitle: Portinari Kiosk App
description: Portinari kiosk app
publishedAt: 2018-06-03
variant: full-width

thumbnail:
  path: '/images/portinari/portal.jpg'

website: https://vitocal.bitbucket.io/
---

<div class="two-columns">
<section class="left text-pad introduction sticky">

## Introdução

Produzimos em parceria com a [Ligalight](https://www.ligalight.com.br/about/) um aplicativo de desenho e projeções para Portinari[^1], baseado na idéia _faça você mesmo_. Queriamos que os visitantes tivessem a impressão de desenhar no ambiente.

Através dos _iPads_ disponíveis, os visitantes criam desenhos e frases que são reproduzidos nas paredes por projetores. Além disso, os visitantes também podem simular uma parede de cerâmica, apontando a camera para o _QRCode_ de cada produto.

## Tecnologias usadas:

- Para as projeções, criamos sketchs [Processing](https://processing.org/) que estilizam os desenhos.
- Usamos um iPad e [Vue](https://vuejs.org/) para o aplicativo de controle remoto.
- Para comunicação entre os 2 aplicativos, criamos uma ponte [Websocket e OSC](https://github.com/vicalejuri/cli-ws2osc).

</section>

<aside class="right gallery">
  <Gallery>
    <video
        width="733"
        height="414"
        preload="none"
        controls
        poster='/images/portinari/tree_poster.jpg'>
        <source src='/images/portinari/tree.mp4' type="video/mp4" />
    </video>
    <img src="/images/portinari/thumb.jpg" alt="Showcase" />
    <video
      height="800"
      preload="none"
      poster='/images/portinari/user_poster.jpg'>
    <source src='/images/portinari/user.mp4' type='video/mp4' />
    </video>
    <div class="page h50">
      <div class="mockup">
        <IpadMockup>
          <img src="/images/portinari/screen.png" alt="Vector drawing app running on IPad" />
        </IpadMockup>
      </div>
    </div>
    <div class="page h50">
      <figure class="mockup">
        <div class="browser-mockup with-url">
          <img src="/images/portinari/admin.png" alt="Administration screen" />
        </div>
      </figure>
    </div>

  </Gallery>
</aside>

</div>

<hr>

<div style="--bg-color: var(--surface3);"} class="bg-color">

## Introdução

Produzimos em parceria com a [Ligalight](https://www.ligalight.com.br/about/) um aplicativo de desenho e projeções para Portinari[^1], baseado na idéia _faça você mesmo_. Queriamos que os visitantes tivessem a impressão de desenhar no ambiente.

Através de _iPads_ disponíveis no ambiente, os visitantes criam desenhos e frases que são reproduzidos através de poderosos projetores. Além disso, os visitantes também podiam simular uma parede de cerâmica, apontando a camera para o _QRCode_ de cada produto.

Duis ut arcu nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vel urna laoreet, malesuada augue a, posuere purus. Sed interdum metus sit amet rutrum laoreet. Aliquam lacus ipsum, imperdiet non lobortis nec, mattis ac libero. Curabitur id ex suscipit, sollicitudin ex sit amet, euismod ex. Duis lorem purus, ultrices porta egestas eget, consectetur sed leo. Duis tempor sem elit, sit amet feugiat mauris posuere a. Donec at viverra urna. Pellentesque vulputate ac erat eget ullamcorper. In tempus, libero ac consectetur elementum, est neque iaculis risus, in tempor dolor leo eu dui. Nam cursus mi nec augue ultricies, vel bibendum dui mollis. Sed et auctor felis. Sed mattis ut dui eu sollicitudin. Donec laoreet suscipit diam vel dictum.

Duis ut arcu nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vel urna laoreet, malesuada augue a, posuere purus. Sed interdum metus sit amet rutrum laoreet. Aliquam lacus ipsum, imperdiet non lobortis nec, mattis ac libero. Curabitur id ex suscipit, sollicitudin ex sit amet, euismod ex. Duis lorem purus, ultrices porta egestas eget, consectetur sed leo. Duis tempor sem elit, sit amet feugiat mauris posuere a. Donec at viverra urna. Pellentesque vulputate ac erat eget ullamcorper. In tempus, libero ac consectetur elementum, est neque iaculis risus, in tempor dolor leo eu dui. Nam cursus mi nec augue ultricies, vel bibendum dui mollis. Sed et auctor felis. Sed mattis ut dui eu sollicitudin. Donec laoreet suscipit diam vel dictum.

Duis ut arcu nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vel urna laoreet, malesuada augue a, posuere purus. Sed interdum metus sit amet rutrum laoreet. Aliquam lacus ipsum, imperdiet non lobortis nec, mattis ac libero. Curabitur id ex suscipit, sollicitudin ex sit amet, euismod ex. Duis lorem purus, ultrices porta egestas eget, consectetur sed leo. Duis tempor sem elit, sit amet feugiat mauris posuere a. Donec at viverra urna. Pellentesque vulputate ac erat eget ullamcorper. In tempus, libero ac consectetur elementum, est neque iaculis risus, in tempor dolor leo eu dui. Nam cursus mi nec augue ultricies, vel bibendum dui mollis. Sed et auctor felis. Sed mattis ut dui eu sollicitudin. Donec laoreet suscipit diam vel dictum.

Duis ut arcu nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vel urna laoreet, malesuada augue a, posuere purus. Sed interdum metus sit amet rutrum laoreet. Aliquam lacus ipsum, imperdiet non lobortis nec, mattis ac libero. Curabitur id ex suscipit, sollicitudin ex sit amet, euismod ex. Duis lorem purus, ultrices porta egestas eget, consectetur sed leo. Duis tempor sem elit, sit amet feugiat mauris posuere a. Donec at viverra urna. Pellentesque vulputate ac erat eget ullamcorper. In tempus, libero ac consectetur elementum, est neque iaculis risus, in tempor dolor leo eu dui. Nam cursus mi nec augue ultricies, vel bibendum dui mollis. Sed et auctor felis. Sed mattis ut dui eu sollicitudin. Donec laoreet suscipit diam vel dictum.

Ut metus risus, mollis quis sagittis sit amet, posuere id lacus. Vestibulum congue, massa et mollis maximus, nibh nibh lacinia eros, nec blandit dolor libero in massa. Sed non sollicitudin metus. Vivamus mollis leo id pharetra interdum. Mauris fermentum ultrices libero, ut convallis ante lobortis eu. Ut eu porttitor augue. Vivamus euismod tristique diam a tempus. Aliquam dapibus tristique dui id ultrices. In sit amet imperdiet quam. Nulla velit purus, fermentum ut consequat non, pretium et nisl. Integer at nisi interdum, pellentesque risus sed, tincidunt ipsum. Pellentesque rhoncus accumsan metus, tincidunt auctor ipsum suscipit sit amet. Quisque lacus mi, porttitor ultricies nibh eu, vestibulum bibendum est.

</div>

<div class="bg-color" style="--bg-color: var(--surface4);">

## OO OCOISA

<img src="/images/portinari/thumb.jpg" alt="Showcase" />

</div>

<hr>

<div class="two-columns">

<aside class="left gallery">
  <Gallery>
    <video
        width="733"
        height="414"
        preload="none"
        controls
        poster='/images/portinari/tree_poster.jpg'>
        <source src='/images/portinari/tree.mp4' type="video/mp4" />
    </video>
    <img src="/images/portinari/thumb.jpg" alt="Showcase" />
    <video
      height="800"
      preload="none"
      poster='/images/portinari/user_poster.jpg'>
    <source src='/images/portinari/user.mp4' type='video/mp4' />
    </video>
    <div class="page h50">
      <div class="mockup">
        <IpadMockup>
          <img src="/images/portinari/screen.png" alt="Vector drawing app running on IPad" />
        </IpadMockup>
      </div>
    </div>
    <div class="page h50">
      <figure class="mockup">
        <div class="browser-mockup with-url">
          <img src="/images/portinari/admin.png" alt="Administration screen" />
        </div>
      </figure>
    </div>

  </Gallery>
</aside>

<section class="right text-pad sticky">

## Introdução

Produzimos em parceria com a [Ligalight](https://www.ligalight.com.br/about/) um aplicativo de desenho e projeções para Portinari[^1], baseado na idéia _faça você mesmo_. Queriamos que os visitantes tivessem a impressão de desenhar no ambiente.

Através dos _iPads_ disponíveis, os visitantes criam desenhos e frases que são reproduzidos nas paredes por projetores. Além disso, os visitantes também podem simular uma parede de cerâmica, apontando a camera para o _QRCode_ de cada produto.

## Tecnologias usadas:

- Para as projeções, criamos sketchs [Processing](https://processing.org/) que estilizam os desenhos.
- Usamos um iPad e [Vue](https://vuejs.org/) para o aplicativo de controle remoto.
- Para comunicação entre os 2 aplicativos, criamos uma ponte [Websocket e OSC](https://github.com/vicalejuri/cli-ws2osc).

</section>

</div>

[^1]: [Cerâmicas portinari](https://www.ceramicaportinari.com.br/)
