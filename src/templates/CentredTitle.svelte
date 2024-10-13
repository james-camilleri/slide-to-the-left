<script lang="ts">
  import type { Slide } from '$lib/slide'

  import Title from './common-components/Title.svelte'

  let { h1, h2 }: Slide = $props()
</script>

<div class="slide">
  <Title {h1} {h2} />
</div>

<style>
  .slide {
    --text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
