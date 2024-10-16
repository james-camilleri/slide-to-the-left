<script lang="ts">
  import { onMount } from 'svelte'

  let { image }: { image: string } = $props()

  let imageFrame = $state(false)
  let canvasElement: HTMLCanvasElement | undefined = $state()
  let imageElement: HTMLImageElement | undefined = $state()

  function hasTransparentPixels(canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const context = canvas?.getContext('2d')
    if (!canvas || !context || !image) {
      return false
    }

    context?.drawImage(image, 0, 0, 100, 100)
    const { data } = context.getImageData(0, 0, 10, 10)

    for (let i = 3, n = data.length; i < n; i += 4) {
      if (data[i] === 0) {
        return true
      }
    }

    return false
  }

  // Check if the image has a transparent background.
  onMount(() => {
    if (imageElement?.complete && canvasElement) {
      imageFrame = !hasTransparentPixels(canvasElement, imageElement)
    } else {
      imageElement?.addEventListener('load', () => {
        if (canvasElement && imageElement) {
          imageFrame = !hasTransparentPixels(canvasElement!, imageElement)
        }
      })
    }
  })
</script>

<div class="img-wrapper">
  <img src={image} class:frame={imageFrame} bind:this={imageElement} />
</div>

<canvas bind:this={canvasElement} width="100" height="100"></canvas>

<style>
  .img-wrapper {
    position: relative;
    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;

    &.frame {
      filter: drop-shadow(0.5em 0.5em 0 var(--primary));
    }
  }

  canvas {
    display: none;
  }
</style>
