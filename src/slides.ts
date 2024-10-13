import type { Slide } from '$lib/slide'

import SlideList from '$assets/code/slide-list?raw'
import TemplateResolver from '$assets/code/template-resolver?raw'

export default [
  { template: 'Start' },
  {
    text: "hi, I'm James.",
    template: 'CentredText',
    notes: [
      "Very excited to be here, but also this is the first talk I've ever given without an audience in front of me.",
      'It is weird to only see my confused face in front of me, instead of all of yours.',
    ],
  },
  {
    h1: 'slide to the left',
    h2: 'A presentation about writing presentations<br>with SvelteKit & PartyKit.',
    notes: [
      'Inevitably, whenever I need to make some slides, I end up over-engineering some hacky solution.',
      'This is a talk about a standard template for slides I eventually settled on, powered by SvelteKit (of course) and using PartyKit for synchronising the deck across multiple devices.',
    ],
  },
  {
    iframe: 'https://revealjs.com/',
    notes: [
      'Initially used Reveal.js, which is a great tool.',
      "It's SPA-based however, so it doesn't really play nice with SvelteKit's more advanced functionality.",
      "Also I couldn't get presenter view to work, so I built my own.",
    ],
  },
  {
    h1: 'Coming up next',
    text: [
      'making a slide deck',
      'slide templates',
      'transitions',
      'animated slide backdrops',
      'remote control & presenter view',
      'making this presentation walkthrough',
    ],
  },
  {
    h1: 'Text-driven presentations',
    h2: 'Just list your slides',
    code: {
      source: SlideList,
      language: 'ts',
    },
    notes: [
      'This is the key to the whole project – a quick list of slides that will magically turn into a full presentation.',
    ],
  },
  {
    h2: 'Top-level structure',
    text: 'For less emphasis.',
  },
  {
    h2: 'Slide template resolver',
    code: {
      source: TemplateResolver,
      language: 'ts',
    },
  },

  {
    iframe: 'https://svelte-in-motion.slides.james.mt/',
    notes: [
      'The most meta part of this talk.',
      'A slideshow created with an earlier version of this template embedded in a slideshow created with this template being shown in a talk about making slideshows with this template.',
    ],
  },
  { template: 'End' },
  {
    h1: 'Slide 2',
    h2: 'with a subtitle',
    text: ['and some text', 'on multiple lines', 'for *gravitas*'],
    notes: ['a single note on slide 2'],
  },

  {
    h1: 'Slide **3**',
    h2: 'The one with *lots* of ~~markdown~~',
    text: ["Coming to think of it this isn't *that* much markdown.", 'But you get the `gist`.'],
  },
  {
    text: 'A slide with **centred** text.',
    // Use the `template` property to manually select a template.
    template: 'CentredText',
  },
  // {
  //   h1: 'Also with code',
  //   h2: '(adjust colours and dark mode from template)',
  //   code: {
  //     source: Fibonacci,
  //     language: 'ts',
  //   },
  // },
] satisfies Slide[]
