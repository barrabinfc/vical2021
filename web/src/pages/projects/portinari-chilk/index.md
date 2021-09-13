---
status: complete
published: true
publishedAt: 2018-06-03
layout: ../../../layouts/Project/Project2Column.astro
gallery: src/pages/projects/portinari-chilk/portinari-gallery.astro
title: chilk
subtitle: Portinari On-site Kiosk App
thumbnail: '/images/portinari/portal.jpg'
schema: 'basic'

# color: "#0f0f0f"
# bg_color: "#f8fbfb"
# dark_gray: "#f8f8f8"
# logo: "/images/icons/yin_yang.svg"
# currentColor: asd

thumbscheme: 'dark'
thumb_position: 'top'

website: 'https://vitocal.bitbucket.io/'
description: 'Junto com Ligalight, produzimos o aplicativo e projeções do kiosk da portinari. Baseado na idéia <i>faça vc mesmo</i>, os desenhos criados no aplicativo são projetados no stand.</p><p>Utilizamos Processing e Vue</p>'
---

Produzimos em parceria com a [Ligalight](https://www.ligalight.com.br/about/) um aplicativo de desenho e projeções para Portinari[^1], baseado na idéia _faça você mesmo_. Queriamos que os visitantes tivessem a impressão de desenhar no ambiente.

Através de _iPads_ disponíveis no ambiente, os visitantes criam desenhos e frases que são reproduzidos através de poderosos projetores. Além disso, os visitantes também podiam simular uma parede de cerâmica, apontando a camera para o _QRCode_ de cada produto.

### Tecnologias usadas:

- Para as projeções, criamos sketchs [Processing](https://processing.org/) que estilizam os desenhos.
- Usamos um iPad e [Vue](https://vuejs.org/) para o aplicativo de controle remoto.
- Para comunicação entre os 2 aplicativos, criamos uma ponte [Websocket e OSC](https://github.com/vicalejuri/cli-ws2osc).

[^1]: [Cerâmicas portinari](https://www.ceramicaportinari.com.br/)
