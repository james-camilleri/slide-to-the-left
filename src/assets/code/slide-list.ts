import type { Slide } from '$lib/slide'
import SlideList from '$assets/code/slide-list?raw'

export default [
  // Define a slide template.
  { template: 'Start' },

  // Pass props through to your slides.
  {
    text: "hi, I'm James.",
    template: 'CentredText',

    // Add notes that will show in presenter
    // view or on the mobile clicker.
    notes: [
      'Very excited to be here. (But also recording presentations is weird).',
      '...'
    ],
  },

  // If no template is defined, the slide resolver
  // will pick the most appropriate one.
  {
    h1: 'slide to the left',
    // Use markdown in your slide text.
    h2: 'A presentation about writing presentations<br>with **SvelteKit** & **PartyKit**.',
  },

  // Embed websites directly into your presentation.
  {
    iframe: 'https://revealjs.com/',
  },

  {
    h1: 'Coming up next',
    text: [
      'making a slide deck',
      'slide templates',
      'transitions',
      'animated slide backdrops',
      'remote control & presenter view',
    ],
  },

  // Automagic code highlighting with Shiki.
  {
    h1: 'Text-driven presentations',
    h2: 'Just list your slides',
    code: {
      source: SlideList,
      language: 'ts',
    },
    notes: [
      'This is the key to the whole project – a quick list of slides that will magically turn into a full presentation.',
      "Using Vite's `?raw` parameter to import source code as a string."
    ]
  },

  // ...and so on and so forth.
] satisfies Slide[]
