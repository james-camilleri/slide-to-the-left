<script lang="ts">
  import Background from '$assets/components/Background.svelte'
  import { transition } from '$lib/transition'
  import slides from '$slides'

  import { beforeNavigate } from '$app/navigation'

  import { resolveTemplate } from '../../templates'

  import '../../styles/slides.css'

  interface Props {
    scale?: boolean
    slideIndex: number
  }

  let { scale = false, slideIndex }: Props = $props()
  let currentSlide = $derived(slides[slideIndex])
  let Slide = $derived(resolveTemplate(currentSlide))

  // Keep track of if we're moving to the next/previous slide to adjust the transition direction.
  let direction = $state(1)
  let { in: inTransition, out: outTransition } = $derived(transition(direction))

  beforeNavigate(({ from, to }) => {
    const previousSlideIndex = Number.parseInt(from?.params?.index ?? '0')
    const nextSlideIndex = Number.parseInt(to?.params?.index ?? '0')

    direction = nextSlideIndex - previousSlideIndex > 0 ? 1 : -1
  })

  let previewWidth = $state(1)
  let previewHeight = $state(1)
  let pageWidth = $state(1)
  let pageHeight = $state(1)
  let isPortrait = $derived(pageHeight > pageWidth)
  let scaleRatio = $derived(isPortrait ? previewHeight / pageHeight : previewWidth / pageWidth)
</script>

<svelte:window bind:innerWidth={pageWidth} bind:innerHeight={pageHeight} />

<div
  class="slide-view"
  bind:offsetWidth={previewWidth}
  bind:offsetHeight={previewHeight}
  class:scale
>
  {#key slideIndex}
    <div
      class="animation-wrapper"
      in:inTransition
      out:outTransition
      style:zoom={scale ? scaleRatio : undefined}
    >
      <Slide {...currentSlide} />
    </div>
  {/key}
  <Background currentSlideIndex={slideIndex} {...currentSlide} />
</div>

<style>
  .slide-view {
    position: relative;
    width: 100%;

    /* Aspect ratio won't work if both width and height are defined. */
    &:not(.scale) {
      height: 100%;
    }
  }

  .scale {
    aspect-ratio: 16/9;
  }

  .animation-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
