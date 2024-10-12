import { quadOut } from 'svelte/easing'
import { type TransitionConfig, fly } from 'svelte/transition'

type TransitionFunction = (
  node: Element,
  params: never,
  options?: { direction: 'in' | 'out' | 'both' },
) => TransitionConfig
type SlideTransitions = { in: TransitionFunction; out: TransitionFunction }

export const transition = (direction: number) =>
  ({
    in: (node) => fly(node, { x: `${100 * direction}%`, duration: 500, easing: quadOut }),
    out: (node) => fly(node, { x: `${100 * direction * -1}%`, duration: 500, easing: quadOut }),
  }) satisfies SlideTransitions
