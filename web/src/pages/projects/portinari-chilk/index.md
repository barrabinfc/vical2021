---
schema: 'basic'
status: complete
published: true
layout: ../../../layouts/Project/Project2Column.astro
title: chilk
subtitle: Portinari Kiosk App
description: Portinari kiosk app
publishedAt: 2018-06-03
variant: full-width

thumbnail:
  path: '/images/portinari/portal.jpg'

gallery: src/pages/projects/portinari-chilk/portinari-gallery.astro
website: https://vitocal.bitbucket.io/
---

Produzimos em parceria com a [Ligalight](https://www.ligalight.com.br/about/) um aplicativo de desenho e projeções para Portinari[^1], baseado na idéia _faça você mesmo_. Queriamos que os visitantes tivessem a impressão de desenhar no ambiente.

Através de _iPads_ disponíveis no ambiente, os visitantes criam desenhos e frases que são reproduzidos através de poderosos projetores. Além disso, os visitantes também podiam simular uma parede de cerâmica, apontando a camera para o _QRCode_ de cada produto.

### Tecnologias usadas:

- Para as projeções, criamos sketchs [Processing](https://processing.org/) que estilizam os desenhos.
- Usamos um iPad e [Vue](https://vuejs.org/) para o aplicativo de controle remoto.
- Para comunicação entre os 2 aplicativos, criamos uma ponte [Websocket e OSC](https://github.com/vicalejuri/cli-ws2osc).

[^1]: [Cerâmicas portinari](https://www.ceramicaportinari.com.br/)
