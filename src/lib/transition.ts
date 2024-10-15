import { quadOut } from 'svelte/easing'
import { type TransitionConfig as SvelteTransitionConfig, fly } from 'svelte/transition'

export type TransitionFunction = (
  node: Element,
  params: never,
  options?: { direction: 'in' | 'out' | 'both' },
) => SvelteTransitionConfig

export type SlideTransitionsConfig = { in: TransitionFunction; out: TransitionFunction }
export type TransitionConfigFunction = (direction: number) => SlideTransitionsConfig

const options = { easing: quadOut, duration: 500 }

export const transition: TransitionConfigFunction = (direction) => ({
  // Use the navigation direction to figure out
  // if we should slide to the left or not. 🕺
  in: (node) => fly(node, { x: `${100 * direction}%`, ...options }),
  out: (node) => fly(node, { x: `${100 * direction * -1}%`, ...options }),
})
