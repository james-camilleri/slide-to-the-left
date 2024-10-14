export function createDirectionCalculator(getCurrentSlide: () => number) {
  let current = -1
  let previous = $state(-1)
  const direction = $derived(current - previous > 0 ? 1 : -1)

  // Run this *before* the dom updates, otherwise it gets
  // scheduled after the initial render and causes two
  // animations in opposite directions.
  $effect.pre(() => {
    previous = current
    current = getCurrentSlide()
  })

  return {
    get current() {
      return direction
    },
  }
}
