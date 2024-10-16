<script lang="ts">
  import { Canvas } from '@threlte/core'

  import type { BackgroundProps } from '$lib/slide'
  import { SeededRandom } from '$lib/random'
  import { createDirectionCalculator } from '$lib/direction.svelte'

  import Blocks from './Blocks.svelte'

  // Background gets all the slide props, plus the current slide index.
  let { currentSlideIndex, code, dark: explicitDark, h1, h2 }: BackgroundProps = $props()

  const NO_OF_BLOCKS = 20
  const BLOCK_SIZE = 0.37

  // Encapsulated Svelte 5 state.
  const getDirection = createDirectionCalculator(() => currentSlideIndex)
  const direction = $derived(getDirection.current)

  let dark = $derived(!!code || explicitDark)
  let random = $derived(
    // Predictable randomness.
    // Use the slide contents to seed the generator,
    // ensuring that each slide will always get the
    // same sequence of random numbers.
    new SeededRandom([currentSlideIndex, h1 ?? '', h2 ?? '', code ?? ''].join('')),
  )
</script>

<div class="background">
  <div class="canvas">
    <Canvas>
      <!-- A Threlte component that does all the
       fancy rotating cube magic in the background. -->
      <Blocks
        {dark}
        {direction}
        {random}
        blockSize={BLOCK_SIZE}
        rows={NO_OF_BLOCKS}
      />
    </Canvas>
  </div>
</div>

<style>
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: var(--background);
    transition: background 0.7s ease-in;
  }

  .canvas {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
