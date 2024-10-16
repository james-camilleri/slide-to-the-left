import type { Slide } from '$lib/slide'

import BackgroundBlocks from '$assets/code/background-blocks.svelte?raw'
import Background from '$assets/code/background.svelte?raw'
import CodeTemplate from '$assets/code/code-template.svelte?raw'
import DirectionCalculator from '$assets/code/direction.svelte.ts?raw'
import PartyKitServer from '$assets/code/partykit-server?raw'
import PseudorandomGenerator from '$assets/code/pseudorandom-generator?raw'
import ReactiveBlock from '$assets/code/reactive-block?raw'
import Remote from '$assets/code/remote?raw'
import SlideList from '$assets/code/slide-list?raw'
import SlideView from '$assets/code/slide-view.svelte?raw'
import TemplateResolver from '$assets/code/template-resolver?raw'
import TitleTemplate from '$assets/code/title-template.svelte?raw'
import Transitions from '$assets/code/transition-config?raw'
import CloudflareDurableObjects from '$assets/images/cloudflare-durable-objects.webp'
import PartyKit from '$assets/images/partykit.webp'
import RemoteStructureDiagram2 from '$assets/images/remote-structure-2.svg'
import RemoteStructureDiagram from '$assets/images/remote-structure.svg'
import RevealJs from '$assets/images/revealjs.webp'
import StructureDiagram from '$assets/images/structure-diagram.svg'
import Threlte from '$assets/images/threlte.webp'

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
    image: RevealJs,
    fullscreen: true,
    // iframe: 'https://revealjs.com/',
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
      "Using Vite's `?raw` parameter to import source code as a string.",
    ],
  },
  {
    h2: 'top-level structure',
    image: StructureDiagram,
    notes: [
      'URL-driven state.',
      'Main slides route hosts SlideView component.',
      'SlideView component uses the index to get the appropriate slide from the slide list.',
      'Slide data is passed into a resolver to return the appropriate template.',
    ],
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
    h2: 'markdown rendering',
    code: {
      source: TitleTemplate,
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
    image: Threlte,
    fullscreen: true,
    // iframe: 'https://threlte.xyz//',
    notes: ['Shoutout to the Threlte team for building such a nifty library.'],
  },
  {
    h2: 'background component',
    code: {
      source: Background,
      language: 'svelte',
    },
  },
  {
    h2: 'encapsulated svelte 5 state',
    code: {
      source: DirectionCalculator,
      language: 'ts',
    },
  },
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
    notes: [
      'This code is genuinely quite beyond me.',
      "Thanks to bryc, which I'm probably mispronouncing, for their contribution to the internet.",
    ],
  },
  {
    h2: 'threlte animation',
    code: {
      source: BackgroundBlocks,
      language: 'svelte',
    },
    notes: [
      'Change slides to show change in lighting.',
      'Someone needs to write a preprocessor that will allow me to spell colour correctly and then compile it down to American.',
    ],
  },
  {
    h2: 'svelte 5 reactive class',
    code: {
      source: ReactiveBlock,
      language: 'ts',
    },
    notes: [
      'Pretty hefty example of a large piece of encapsulated reactive state.',
      'Which means there are probably bits that are implemented suboptimally/interestingly/badly as I figured out the technique.',
      'Any enlightenment about better ways to do this would very much be appreciated.',
      "This is also probably not the best for performance, especially since some bits are called/recalculated unnecessarily, but I didn't optimise",
    ],
  },
  {
    h1: 'remote control',
    h2: 'live synchronised state with web sockets and PartyKit',
  },
  {
    image: PartyKit,
    fullscreen: true,
    // iframe: 'https://partykit.io',
    notes: [
      '"Serverless" library built on Cloudflare\'s Durable Objects.',
      'Allows multiple instances of a serverless app to share state.',
      'Accessible via HTTP requests or Web Sockets',
    ],
  },
  {
    image: CloudflareDurableObjects,
    fullscreen: true,
    notes: [
      "Here's Cloudflare's Durable Objects if you want to learn more.",
      "This is a screenshot because Cloudflare's site doesn't appreciate being embedded in an iframe.",
    ],
  },
  {
    h2: 'remote access architecture',
    image: RemoteStructureDiagram,
    notes: [
      'Dead simple: a single shared piece of state, the current slide number.',
      'PartyKit makes this incredibly easy to set up.',
      'Host generates a presentation ID and creates a session ("room") via PartyKit.',
      'Clients can use that id to connect to the same room and access the same shared state.',
      "All web socket based, so it's nice and snappy.",
      'This same system is used for the live follow functionality, presentation and notes views, and the remote/clicker.',
    ],
  },
  {
    h2: '"authentication"',
    image: RemoteStructureDiagram2,
    notes: [
      'How do we stop any random person viewing the presentation from changing slides and causing chaos?',
      'Simplest (and worst) method of authentication, a shared secret.',
      'The secret is shared as a query parameter on links to open write-access views and then submitted as part of the initial connection request.',
      'No secret, no write access. Easy peasy.',
      "Do not use this security mechanism to protect your user's credit card details.",
    ],
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
    code: {
      source: Remote,
      language: 'ts',
    },
    notes: [
      'Since this is all web socket based, it could be extended to provide functionality like live polls and games with audiences.',
    ],
  },
  {
    h1: 'find these slides',
    h2: 'wallow in my questionable source code',
    text: [
      'slide-to-the-left.slides.james.mt',
      'github.com/james-camilleri/slide-to-the-left',
      'github.com/james-camilleri/slides',
    ],
  },
  {
    h1: 'get in touch',
    h2: '(talk nerdy to me)',
    text: [
      'james@‎james.mt',
      'github.com/james-camilleri',
      '*jamescamilleri* on Discord, I think?',
      "honestly I'm notoriously bad at social media",
      "I'm also on the Svelte Society London WhatsApp group if you're local",
    ],
  },

  { template: 'End' },
] satisfies Slide[]
