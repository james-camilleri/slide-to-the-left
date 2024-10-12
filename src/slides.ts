import type { Slide } from '$lib/slide'

import Fibonacci from '$assets/code/fibonacci?raw'
import SvelteLogo from '$assets/components/SvelteLogo.svelte'
import Cow from '$assets/images/cow.svg'
import Crow from '$assets/images/crow.svg'
import Dragon from '$assets/images/dragon.svg'
import Hippo from '$assets/images/hippo.svg'
import KiwiBird from '$assets/images/kiwi-bird.svg'

export default [
  { template: 'start' },
  {
    h1: 'Slide 1',
    text: 'Some plain old ordinary text.',
    notes: ['a note', 'another note', 'a note with *formatting*'],
  },
  {
    h1: 'Slide 2',
    h2: 'with a subtitle',
    text: ['and some text', 'on multiple lines', 'for *gravitas*'],
    notes: ['a single note on slide 2'],
  },
  {
    h2: 'This one just has an h2 heading',
    text: 'For less emphasis.',
  },
  {
    h1: 'Slide **3**',
    h2: 'The one with *lots* of ~~markdown~~',
    text: ["Coming to think of it this isn't *that* much markdown.", 'But you get the `gist`.'],
  },
  {
    text: 'A slide with **centred** text.',
    // Use the `template` property to manually select a template.
    template: 'centredText',
  },
  {
    h2: 'Lots of images!',
    images: [Cow, Crow, Dragon, Hippo, KiwiBird],
  },
  {
    text: 'This slide has a custom component in it',
    component: SvelteLogo,
  },
  {
    h1: 'Also with code',
    h2: '(adjust colours and dark mode from template)',
    code: {
      source: Fibonacci,
      language: 'ts',
    },
  },
  {
    iframe: 'https://www.spacejam.com/1996',
  },
  { template: 'end' },
] satisfies Slide[]
