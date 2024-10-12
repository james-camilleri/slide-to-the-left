import type { Slide } from '$lib/slide'

import CentredText from './CentredText.svelte'
import Code from './Code.svelte'
import Component from './Component.svelte'
import Default from './Default.svelte'
import End from './End.svelte'
import IFrame from './IFrame.svelte'
import ImageGrid from './ImageGrid.svelte'
import Start from './Start.svelte'

const templates = {
  centredText: CentredText,
  code: Code,
  component: Component,
  default: Default,
  end: End,
  iframe: IFrame,
  imageGrid: ImageGrid,
  start: Start,
} as const

export type TemplateName = keyof typeof templates

export function resolveTemplate(slide: Slide) {
  if (slide.code) {
    return templates.code
  }

  if (slide.component) {
    return templates.component
  }

  if (slide.iframe) {
    return templates.iframe
  }

  if (slide.images && Array.isArray(slide.images)) {
    return templates.imageGrid
  }

  return templates[slide.template ?? 'default'] ?? templates.default
}
