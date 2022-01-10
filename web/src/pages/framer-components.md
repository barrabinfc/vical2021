---
schema: basic
status: in progress
published: true

title: Framer components
subtitle: Framer components
layout: ../layouts/Post/Post.astro
description: Styleguide example
publishedAt: 2021-16-10
setup: |
  import Hero from "https://framer.com/m/Hero-iOie.js@KI8KI8iOa6V33JdzpvDc"
---

<div class="pad4">
  <div class="grid2">
    <div class="item grid2 pad4">
      <div class="surface surface1 item">Surface 1</div>
      <div class="surface surface2 item">Surface 2</div>
      <div class="surface surface3 item">Surface 3</div>
      <div class="surface surface4 item">Surface 4</div>
    </div>
    <div class="item fl-y-center pad4">
      <div class="text1">
        <Hero
          action={undefined}
          image={true}
          image1={image}
          text={`I specialize in design & art direction. 
          I'm crafting intuitive concepts that connect design with purpose and personality.`}
          title={true}
          title1="HI, I'm nancy"
          variant="Center"
        />      
      </div>
    </div>
  </div>
</div>
