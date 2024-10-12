<script lang="ts">
  import type { Slide } from '$lib/slide'

  // We're not using any of the props for this template.
  let props: Slide = $props()
</script>

<div class="slide">
  <!--
    Adapted from Svelte loading spinners
    https://github.com/Schum123/svelte-loading-spinners/blob/master/src/lib/SyncLoader.svelte
  -->
  <div class="wrapper">
    {#each { length: 3 } as _, i}
      <div class="dot" style="animation-delay: {i * 0.1}s"></div>
    {/each}
  </div>
</div>

<style>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--dark);
  }

  .wrapper {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .dot {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    margin: 0.1em;
    background-color: var(--primary);
    border-radius: 100%;
    animation: sync 1s ease-in-out infinite alternate both running;
  }

  @keyframes sync {
    33% {
      transform: translateY(10px);
    }

    66% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0);
    }
  }
</style>
