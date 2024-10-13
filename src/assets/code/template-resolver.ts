import type { Slide } from '$lib/slide'

import CentredTitle from './CentredTitle.svelte'
import Code from './Code.svelte'
import Default from './Default.svelte'

const templates = {
  CentredTitle,
  Code,
  Default,
} as const

export type TemplateName = keyof typeof templates

export function resolveTemplate(slide: Slide) {
  if (slide.code) {
    return templates.Code
  }

  if (Object.keys(slide)
      .filter((key) => !['h1', 'h2', 'notes'].includes(key))
      .length === 0
  ) {
    return templates.CentredTitle
  }

  return templates[slide.template ?? 'Default'] ?? templates.Default
}
