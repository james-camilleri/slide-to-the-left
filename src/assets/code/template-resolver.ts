import type { Slide } from '$lib/slide'

import CentredTitle from './CentredTitle.svelte'
import Code from './Code.svelte'
import Default from './Default.svelte'

const templates = {
  CentredTitle,
  Code,
  Default,
  // ...
  // MOAR TEMPLATES
} as const

export type TemplateName = keyof typeof templates

export function resolveTemplate(slide: Slide) {
  // Use the `Code` template if the slide has a `code` key.
  if (slide.code) {
    return templates.Code
  }

  // Use the `CentredTitle` template if the slide
  // only has `h1`, `h2`, or `notes` defined.
  if (
    Object.keys(slide)
      .filter((key) => !['h1', 'h2', 'notes'].includes(key))
      .length === 0
  ) {
    return templates.CentredTitle
  }

  // Lots more here.
  // ...

  return templates[slide.template ?? 'Default'] ?? templates.Default
}
