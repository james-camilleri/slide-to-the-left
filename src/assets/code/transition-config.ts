import { quadOut } from 'svelte/easing'
import { fly } from 'svelte/transition'

const options = { easing: quadOut, duration: 500 }

export const transition: TransitionConfigFunction = (direction) => ({
  // Use the navigation direction to figure out
  // if we should slide to the left or not. 🕺
  in: (node) => fly(node, { x: `${100 * direction}%`, ...options }),
  out: (node) => fly(node, { x: `${100 * direction * -1}%`, ...options }),
})
