<script lang="ts">
  import type { BackgroundProps } from '$lib/slide'

  import { Canvas } from '@threlte/core'

  import { SeededRandom } from '$lib/random'

  import Blocks from './Blocks.svelte'
  import { createDirectionCalculator } from '$lib/direction.svelte'

  let { currentSlideIndex, code, h1, h2 }: BackgroundProps = $props()

  const NO_OF_BLOCKS = 20
  const BLOCK_SIZE = 0.37

  const direction = createDirectionCalculator(() => currentSlideIndex)

  let dark = $derived(!!code)
  let random = $derived(
    new SeededRandom([currentSlideIndex, h1 ?? '', h2 ?? '', code ?? ''].join('')),
  )
</script>

<div class="background" class:dark>
  <div class="canvas">
    <Canvas>
      <Blocks rows={NO_OF_BLOCKS} blockSize={BLOCK_SIZE} {direction} {random} />
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

  .background.dark {
    background: var(--foreground);
  }

  .canvas {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
</style>
