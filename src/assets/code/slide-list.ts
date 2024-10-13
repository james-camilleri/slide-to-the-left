import type { Slide } from '$lib/slide'
import SlideList from '$assets/code/slide-list?raw'

export default [
  { template: 'Start' },
  {
    text: "hi, I'm James.",
    template: 'CentredText',
    notes: [
      'Very excited to be here. (But also I need a nap).',
      '...'
    ],
  },
  {
    h1: 'slide to the left',
    h2: 'A presentation about writing presentations<br>with SvelteKit & PartyKit.',
  },
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
  },
] satisfies Slide[]
