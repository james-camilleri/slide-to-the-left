<script lang="ts">
  import type { Slide } from '$lib/slide'
  import { codeToHtml } from 'shiki'

  import Title from './common-components/Title.svelte'

  let { h1, h2, code }: Slide = $props()

  // Use Shiki to format the given code string.
  let formattedCodePromise = $derived(
    codeToHtml(code?.source ?? '', {
      lang: code?.language ?? 'js',
      theme: 'ayu-dark',
    }),
  )
</script>

<!-- Teeny weeny template. -->
<div class="slide dark">
  <Title {h1} {h2} />

  {#if code}
    {#await formattedCodePromise then formattedCode}
      {@html formattedCode}
    {/await}
  {/if}
</div>

<style>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: self-start;
  }

  /* Override Shiki's styling. */

  :global(pre) {
    width: 100%;
    margin: 0;
    overflow-x: hidden;
    scrollbar-color: var(--primary) var(--dark);
    scrollbar-width: thin;
    background-color: transparent !important;
  }

  :global(code) {
    font-family: 'fira code', monospace;
    font-size: 0.8em;
    font-feature-settings: 'calt';
    font-variant-ligatures: contextual;
  }
</style>
