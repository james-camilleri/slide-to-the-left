<script lang="ts">
  import type { Slide } from '$lib/slide'

  import Text from './common-components/Text.svelte'

  let { text }: Slide = $props()
</script>

<div class="slide">
  {#if text}
    <Text {text} />
  {/if}
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
