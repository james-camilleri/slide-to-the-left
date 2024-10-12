<script lang="ts">
  import type { Slide } from '$lib/slide'

  import { random } from '$lib/random'

  import Title from './common-components/Title.svelte'

  let { h1, h2, image, images }: Slide = $props()
  let imageList = $derived(
    image ? [image]
    : Array.isArray(images) ? images
    : [images],
  )
  let width = $derived(Math.min(30, 100 / Math.floor(imageList.length / 2) - 5))
</script>

<div class="slide">
  <Title {h1} {h2} />

  <div class="grid">
    {#each imageList as image}
      <img src={image} style:--delay="{random(0.2, 0.8)}s" style:--width="{width}%" />
    {/each}
  </div>
</div>

<style>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }

  img {
    width: var(--width);
    max-height: 30vh;
    object-fit: contain;
    transform: scale(0);
    animation: bounce 1s cubic-bezier(0.28, 0.84, 0.42, 1);
    animation-delay: var(--delay);
    animation-fill-mode: forwards;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: auto 0;
  }

  @keyframes bounce {
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    20% {
      transform: scale3d(1.1, 1.1, 1.1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    40% {
      transform: scale3d(0.9, 0.9, 0.9);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    80% {
      transform: scale3d(0.97, 0.97, 0.97);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
</style>
