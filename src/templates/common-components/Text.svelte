<script lang="ts">
  import type { Slide } from '$lib/slide'

  import SvelteMarkdown from 'svelte-markdown'

  let { text }: { text?: Slide['text'] } = $props()

  let paragraphs = $derived(
    (Array.isArray(text) ? text
    : text ? [text]
    : []
    ).map((text) => (typeof text === 'string' ? { text } : text)),
  )
</script>

<div>
  {#each paragraphs as { text, style = { } }}
    {#if text === ''}
      <br />
    {/if}
    <!-- TODO: This style injection isn't the greatest thing. -->
    <p
      style={Object.entries(style)
        .map(([property, style]) => `${property}: ${style}`)
        .join('; ')}
    >
      <SvelteMarkdown source={text} isInline />
    </p>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.7em;
    align-items: start;
  }

  p {
    margin: 0;
    text-align: var(--text-align, start);
  }
</style>
