<script lang="ts">
  import type { Slide } from '$lib/slide'

  import SvelteMarkdown from 'svelte-markdown'

  let { h1, h2 }: Pick<Slide, 'h1' | 'h2'> = $props()
</script>

{#if h1}
  <h1><SvelteMarkdown source={h1} isInline /></h1>
{/if}
{#if h2}
  <h2 class:h2-only={!h1}><SvelteMarkdown source={h2} isInline /></h2>
{/if}

<style>
  .h2-only {
    margin-block-start: 0;
  }
</style>
