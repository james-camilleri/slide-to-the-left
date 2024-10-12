<script lang="ts">
  import type { Slide } from '$lib/slide'

  import Title from './common-components/Title.svelte'

  let { h1, h2, component: Component }: Slide = $props()
</script>

<div class="slide">
  <Title {h1} {h2} />

  {#if Component}
    <Component />
  {/if}
</div>

<style>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }
</style>
