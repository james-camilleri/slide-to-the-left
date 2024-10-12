<script lang="ts">
  import type { BackgroundProps } from '$lib/slide'

  import { SeededRandom } from '$lib/random'

  let { currentSlideIndex, code, h1, h2 }: BackgroundProps = $props()

  const WIDTH = 1920
  const HEIGHT = 1080
  const MIN_CIRCLES = 3
  const MAX_CIRCLES = 7
  const MIN_RADIUS = 50
  const MAX_RADIUS = 500
  const MIN_OPACITY = 0.05
  const MAX_OPACITY = 0.1

  let dark = $derived(!!code)
  let random = $derived(
    new SeededRandom([currentSlideIndex, h1 ?? '', h2 ?? '', code ?? ''].join('')),
  )

  const hiddenCircle = {
    x: WIDTH / 2,
    y: HEIGHT / 2,
    scale: 0,
    opacity: 0,
    fill: 'var(--primary)',
  }

  let circles = $derived.by(() => {
    const noOfCircles = random.integerBetween(MIN_CIRCLES, MAX_CIRCLES)
    return Array(MAX_CIRCLES)
      .fill(0)
      .map((_, i) =>
        i < noOfCircles ?
          {
            x: random.numberBetween(0, WIDTH),
            y: random.numberBetween(0, HEIGHT),
            scale: random.numberBetween(0, MAX_RADIUS / MIN_RADIUS),
            opacity: random.numberBetween(MIN_OPACITY, MAX_OPACITY),
            fill: 'var(--primary)',
            // fill: random.numberBetween(0, 1) > 0.5 ? 'var(--primary)' : 'var(--tertiary)',
          }
        : { ...hiddenCircle },
      )
  })
</script>

<div class="background" class:dark>
  <svg viewBox="0 0 {WIDTH} {HEIGHT}" class="fullscreen">
    {#each circles as { x, y, scale, opacity, fill }, i (i)}
      <circle
        style:transform="scale({scale}) translate({x / scale}px, {y / scale}px)"
        style:color={fill}
        style:opacity
        cx={0}
        cy={0}
        r={MIN_RADIUS}
        fill="currentColour"
        stroke="none"
      />
    {/each}
  </svg>
</div>

<style>
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--background);
    transition: background 0.7s ease-in;
  }

  .background.dark {
    background: var(--foreground);
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.5s ease-in-out;
  }

  circle {
    transition:
      transform 0.5s ease-in-out,
      opacity 0.5s ease-in-out;
  }

  .background.dark svg {
    opacity: 0.3;
  }
</style>
