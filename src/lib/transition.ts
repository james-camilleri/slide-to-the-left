import { quadOut } from 'svelte/easing'
import { type TransitionConfig as SvelteTransitionConfig, fly } from 'svelte/transition'

export type TransitionFunction = (
  node: Element,
  params: never,
  options?: { direction: 'in' | 'out' | 'both' },
) => SvelteTransitionConfig

export type SlideTransitionsConfig = { in: TransitionFunction; out: TransitionFunction }
export type TransitionConfigFunction = (direction: number) => SlideTransitionsConfig

// Add your transitions here.
export const transition: TransitionConfigFunction = (direction) => ({
  in: (node) => fly(node, { x: `${100 * direction}%`, duration: 500, easing: quadOut }),
  out: (node) => fly(node, { x: `${100 * direction * -1}%`, duration: 500, easing: quadOut }),
})
