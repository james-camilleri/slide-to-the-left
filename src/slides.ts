import type { Slide } from '$lib/slide'

import Background from '$assets/code/background.svelte?raw'
import CodeTemplate from '$assets/code/code-template.svelte?raw'
// import DirectionCalculator from '$assets/code/direction.svelte.ts?raw'
import PartyKitServer from '$assets/code/partykit-server?raw'
import PseudorandomGenerator from '$assets/code/pseudorandom-generator?raw'
import SlideList from '$assets/code/slide-list?raw'
import SlideView from '$assets/code/slide-view.svelte?raw'
import TemplateResolver from '$assets/code/template-resolver?raw'
import Transitions from '$assets/code/transition-config?raw'
import RemoteStructureDiagram2 from '$assets/images/remote-structure-2.svg'
import RemoteStructureDiagram from '$assets/images/remote-structure.svg'
import StructureDiagram from '$assets/images/structure-diagram.svg'

export default [
  { template: 'Start' },
  {
    text: "**hi**, I'm James.",
    template: 'CentredText',
    notes: [
      "Very excited to be here, but also this is the first talk I've ever given without an audience in front of me.",
      'It is weird to only see my confused face in front of me, instead of all of yours.',
    ],
  },
  {
    h1: 'slide to the left',
    h2: 'A presentation about writing presentations<br>with **SvelteKit** & **PartyKit**.',
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
    h1: 'coming up next',
    text: [
      'making a slide deck',
      'slide templates',
      'transitions',
      'animated slide backdrops',
      'remote control & presenter view',
      // Not going to have time for this.
      // 'making this presentation speedrun',
    ],
  },
  {
    h1: 'text-driven presentations',
    h2: 'just list your slides',
    code: {
      source: SlideList,
      language: 'ts',
    },
    notes: [
      'This is the key to the whole project – a quick list of slides that will magically turn into a full presentation.',
    ],
  },
  {
    h2: 'top-level structure',
    image: StructureDiagram,
    // dark: true, // TODO: Keep this?
  },
  {
    h2: 'slide template resolver',
    code: {
      source: TemplateResolver,
      language: 'ts',
    },
    notes: [
      "The resolver helps automatically determine the best template to show for the given content, so you don't need to hard-code every template yourself.",
    ],
  },
  {
    h2: 'example template',
    code: {
      source: CodeTemplate,
      language: 'svelte',
    },
  },
  {
    h2: 'displaying the slides',
    code: {
      source: SlideView,
      language: 'svelte',
    },
    notes: [
      'This is the primary route.',
      'The current slide index is pulled out of the URL and the slide is rendered from the dynamically determined template.',
    ],
  },
  {
    h2: 'transitions',
    code: {
      source: Transitions,
      language: 'ts',
    },
  },
  {
    h1: 'animated backdrops',
    h2: 'because why be extra when you can be ✨***extra***✨?',
  },
  {
    iframe: 'https://demo.slides.james.mt/',
    notes: ['The most meta part of this talk.'],
  },
  {
    iframe: 'https://svelte-in-motion.slides.james.mt/',
    notes: [
      'A slideshow created with an earlier version of this template embedded in a slideshow created with this template being shown in a talk about making slideshows with this template.',
    ],
  },
  {
    // TODO:  Replace with screenshot.
    iframe: 'https://threlte.xyz//',
    notes: ['Shoutout to the Threlte team for building such a nifty library.'],
  },
  {
    h2: 'background component',
    code: {
      source: Background,
      language: 'svelte',
    },
  },
  // {
  //   h2: 'encapsulated svelte 5 state',
  //   code: {
  //     source: DirectionCalculator,
  //     language: 'ts',
  //   },
  // },
  {
    h2: 'predictable randomness ▶',
    notes: [
      'Predictable randomness allows us to have repeatable animation between slides, and not have things jumping about everywhere.',
      'It also means the animations are synced between all instances of the presentation (demo share mode), which is nice.',
    ],
  },
  {
    h2: '◀ predictable randomness',
  },
  {
    h2: 'pseudorandom number generator',
    code: {
      source: PseudorandomGenerator,
      language: 'ts',
    },
  },
  {
    h2: 'threlte animation',
    code: {
      source: 'THRELTE',
      language: 'ts',
    },
  },
  {
    h2: 'svelte 5 reactive class',
    code: {
      source: 'REACTIVE_CLASS',
      language: 'ts',
    },
  },
  {
    h1: 'remote control',
    h2: 'live synchronised state with web sockets and PartyKit',
  },
  {
    // TODO:  Replace with screenshot.
    iframe: 'https://partykit.io',
    notes: [
      '"Serverless" library built on Cloudflare\'s Durable Objects.',
      'Allows multiple instances of a serverless app to share state.',
      'Accessible via HTTP requests or Web Sockets',
    ],
  },
  {
    // TODO:  Replace with screenshot.
    iframe: 'https://www.cloudflare.com/developer-platform/durable-objects/',
    notes: ["Here's Cloudflare's Durable Objects if you want to learn more."],
  },
  {
    h2: 'remote access architecture',
    image: RemoteStructureDiagram,
  },
  {
    h2: '"authentication"',
    image: RemoteStructureDiagram2,
  },
  {
    h2: '(demo)',
  },

  {
    h2: 'PartyKit server',
    code: {
      source: PartyKitServer,
      language: 'ts',
    },
  },
  {
    h2: 'remote',
  },
  {
    h1: 'get in touch',
    h2: '(ask me questions)',
    text: ['github', 'email', "honestly I'm notoriously bad at social media"],
  },

  { template: 'End' },
] satisfies Slide[]
