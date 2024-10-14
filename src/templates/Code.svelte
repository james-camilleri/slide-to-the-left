<script lang="ts">
  import type { Slide } from '$lib/slide'

  import { codeToHtml } from 'shiki'

  import Title from './common-components/Title.svelte'

  let { h1, h2, code }: Slide = $props()
  let formattedCodePromise = $derived(
    codeToHtml(code?.source ?? '', {
      lang: code?.language ?? 'js',
      theme: 'ayu-dark',
    }),
  )
</script>

<div class="slide dark">
  <Title {h1} {h2} />

  {#if code}
    {#await formattedCodePromise then formattedCode}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
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
    font-size: 0.9em;
    font-feature-settings: 'calt';
    font-variant-ligatures: contextual;
  }
</style>
