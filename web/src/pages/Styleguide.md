---
schema: basic
status: in progress
published: true

title: Styleguide
subtitle: Styleguide
layout: ../layouts/Post/Post.astro
description: I write about software programming.
publishedAt: 2021-16-10
---

<div class="pad4">
  <h1>Colorscheme</h1>
  <div class="grid2">
    <div class="item grid2 pad4">
      <div class="surface surface1 item">Surface 1</div>
      <div class="surface surface2 item">Surface 2</div>
      <div class="surface surface3 item">Surface 3</div>
      <div class="surface surface4 item">Surface 4</div>
    </div>
    <div class="item fl-y-center pad4">
      <div class="text1">
        <h1>● Text color 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia nibh eu congue ullamcorper. Vestibulum vitae augue pharetra justo fringilla dignissim.</p>
      </div>
      <div class="text2">
        <h2>● Text color 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia nibh eu congue ullamcorper. Vestibulum vitae augue pharetra justo fringilla dignissim.</p>
      </div>
    </div>
  </div>
</div>

# Styleguide

Lets start paragraph, with _Italic_, **bold**, and `monospace`. And see vertical rhythm with lorem ipsum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lacinia nibh eu congue ullamcorper. Vestibulum vitae augue pharetra justo fringilla dignissim. Integer gravida, lacus vel molestie fermentum.

Here's a link to [a website](http://foo.bar), to a [local
doc](local-doc.html), and to a [section heading in the current
doc](#an-h2-header).
Cras pharetra urna nec est interdum, vitae aliquam odio egestas. Aliquam sollicitudin est et augue pellentesque, id fringilla metus ultricies. Etiam gravida euismod augue quis mattis. Vivamus ac tristique enim. Proin euismod risus ipsum, eu gravida nunc auctor nec. Nam pretium sollicitudin quam, et convallis tellus sodales vel. Fusce maximus vitae sapien quis fermentum. Pellentesque sed ultricies lorem, quis pretium sem. Donec eget massa mattis, hendrerit enim quis, fringilla tellus. Quisque lobortis maximus sapien eget ultrices. Integer aliquet ex quis dui rhoncus semper. Nam vitae diam bibendum, euismod enim sed, commodo justo. Sed nibh lacus, rhoncus eget imperdiet sit amet, sollicitudin ac nisi. Suspendisse ut nulla justo.

> **Block quotes are
> written like so.**
>
> They can span multiple paragraphs,
> if you like.

Fusce congue mollis sem, quis tempus augue lacinia tincidunt. Integer vulputate, quam eu scelerisque aliquam, velit neque lobortis massa, at viverra metus tortor eu purus. In fringilla, felis interdum tristique dictum, lorem elit fermentum erat, id pellentesque velit ligula in velit. Sed eu neque rutrum, pretium nunc id, feugiat elit. Donec eget dui nec massa efficitur cursus eget eget purus. Proin ac nisl pretium, interdum nisi ac, placerat erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed egestas nec neque ac imperdiet. Integer vitae nunc sit amet urna gravida accumsan. Quisque ut libero nec arcu sodales sagittis ac facilisis orci. Proin venenatis quis diam eget malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec pretium mi eu pulvinar aliquam. Donec ac sem sed tortor dictum tempor. Suspendisse consequat eleifend tellus a blandit. Quisque et vestibulum nisi, eget pharetra sapien [^1].

[^1]: Constructing a case for every possible input requires 2n hidden neurons, when you have n input neurons. In reality, the situation isn’t usually that bad. You can have cases that encompass multiple inputs. And you can have overlapping cases that add together to achieve the right input on their intersection.

And here's a numbered list:

1.  first item
2.  second item
3.  third item

And a code block

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```

Tables can look like this:

| size | material    | color       |
| ---- | ----------- | ----------- |
| 9    | leather     | brown       |
| 10   | hemp canvas | natural     |
| 11   | glass       | transparent |

Donec non ex orci. Suspendisse purus felis, laoreet ac interdum eget, ultrices iaculis sem. Vestibulum sapien augue, tempus non magna quis, vehicula vehicula ipsum. Cras sit amet tortor interdum, convallis dui vel, dignissim ante. Nunc eget rutrum sapien, sed scelerisque lacus. Nam aliquam eros malesuada erat interdum ultricies. Integer euismod ipsum elit, id condimentum urna eleifend eget. Nulla imperdiet fringilla massa, id porttitor tellus egestas ac.

## An h2 header

Images can be specified like so:

![alt text](/pictures/dancing-master-1600.jpeg 'Dancing masters')

Many important downstream tasks such as Question Answering (QA) and Natural Language Inference (NLI) are based on understanding the relationship between two sentences, which is not directly captured by language modeling. In orderto train a model that understands sentence relationships, we pretrain for a binarized next sen
tence prediction task that can be trivially generated from any monolingual corpus. Speciﬁcally,when choosing the sentences A and B for each pre-training example, 50% of the time B is the actualnext sentence that follows A (labeled as IsNext),and 50% of the time it is a random sentence fromthe corpus (labeled as NotNext).

```jsx
// tailwind.config.js

// This content is not transformed!
const object = { someOtherValue: 10 };
```

### An h3 header

Now a nested list:

1.  First, get these ingredients:

    - carrots
    - celery
    - lentils

2.  Boil some water.

3.  Dump everything in the pot and follow this algorithm:

    - find wooden spoon
    - uncover pot
    - stir
    - cover pot
    - balance wooden spoon precariously on pot handle
    - wait 10 minutes
    - goto first step (or shut off burner when done)

    `Do not bump wooden spoon or it will fall.`

4.  Turn off the heat

Nested bulleted lists, deeper levels:

- A item, first level - no space in front the bullet character
  - Aa item, second level - 1 space is enough
    - Aaa item, third level - 5 spaces min
    - Ab item, second level - 4 spaces possible too
- B item, first level

And a video

<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/ntk8XsxVDi0" title="T-Cell" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### A two column page

<div class="twocolumn-page">

Language model pre-training has been shown tobe effective for improving many natural languageprocessing tasks [^2]. These include sentence-level tasks such as
natural language inference[^3] and paraphrasing (Dolanand Brockett, 2005), which aim to predict the re-
lationships between sentences by analyzing themholistically, as well as token-level tasks such asnamed entity recognition and question answering,where models are required to produce ﬁne-grainedoutput at the token level[^4]

There are two existing strategies for apply-ing pre-trained language representations to down-stream tasks: feature-based and ﬁne-tuning. Thefeature-based approach, such as ELMo (Peters
et al., 2018a), uses task-speciﬁc architectures that
include the pre-trained representations as addi-tional features. The ﬁne-tuning approach, such asthe Generative Pre-trained Transformer (OpenAIGPT) (Radford et al., 2018), introduces minimaltask-speciﬁc parameters, and is trained on thedownstream tasks by simply ﬁne-tuning all pre-trained parameters. The two approaches share thesame objective function during pre-training, wherethey use unidirectional language models to learngeneral language representations.We argue that current techniques restrict thepower of the pre-trained representations, espe-cially for the ﬁne-tuning approaches. The ma-jor limitation is that standard language models areunidirectional, and this limits the choice of archi-tectures that can be used during pre-training. Forexample, in OpenAI GPT, the authors use a left-to-right architecture, where every token can only at-tend to previous tokens in the self-attention layersof the Transformer (Vaswani et al., 2017). Such re-
strictions are sub-optimal for sentence-level tasks,and could be very harmful when applying ﬁne-tuning based approaches to token-level tasks suchas question answering, where it is crucial to incor-porate context from both directions.In this paper, we improve the ﬁne-tuning basedapproaches by proposing BERT: BidirectionalEncoder Representations from Transformers.

BERT alleviates the previously mentioned unidi-rectionality constraint by using a “masked lan-guage model” (MLM) pre-training objective, in-spired by the Cloze task (Taylor, 1953). The
masked language model randomly masks some ofthe tokens from the input, and the objective is topredict the original vocabulary id of the masked

[^2]:

  Dai and Le, 2015;
  Peters et al.,2018a;
  Radford et al., 2018;
  Howard and Ruder, 2018

[^3]:

  Bowman et al., 2015;
  Williams et al., 2018

[^4]:

  Tjong Kim Sang and De Meulder, 2003;
  Rajpurkar et al., 2016.

</div>
