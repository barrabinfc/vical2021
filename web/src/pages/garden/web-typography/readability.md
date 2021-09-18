---
schema: article
status: draft
published: true
layout: ../../../layouts/Post/Post.astro
title: Text readability on the web
subtitle: Strategies for improving text readability on the web
description: Strategies for improving text readability on the web
tags:
  - web text readability
  - web typography
  - web typography tips
publishedAt: 2021-10-09
---

The browser does a remarkable job of layouting text, but still has many missing pieces that exists are standard for printed text.
I've collected many tips and strategies for improving readability.

## Avoiding windowed sentences

In typography, a _widow_ is a sentence line or word that appears alone at the top of a page, column or line,
and is separated by the rest of the paragraph.

<div class="pad4">

![widow line](./widow-example.png)

</div>

CSS has a native `widows` property, but it only works for with **multi-column** layouts or `print` styles.
The `widows` property is the minimum number of lines in a paragraph split on the new page/column.

<div class="twocolumn-page">

```css
.title-container {
  columns: 2; /** required */
  widows: 3;
}
```

<div style="break-after: column;"></div>

<style>
  .title-container {
    columns: 2;
    widows: 5;
  }
</style>
<div class="title-container">
  <p>
  Dolor in Lorem esse officia nulla in amet excepteur sint do do aute in sit. Ipsum in sunt cupidatat non irure esse deserunt quis occaecat incididunt id cillum ut Lorem. Anim laboris id cillum aliqua do.Aliquip eiusmod ad dolor incididunt quis voluptate velit quis labore et aute. Quis sit velit eu Lorem pariatur enim reprehenderit id labore excepteur exercitation. Enim anim ea esse pariatur Lorem tempor cillum laboris magna.</p>

</div>
