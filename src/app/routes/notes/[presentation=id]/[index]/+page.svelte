<script lang="ts">
  import type { PageData } from './$types'

  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import SvelteMarkdown from 'svelte-markdown'

  import { remote } from '$internal/utils/remote.svelte'
  import slides from '$slides'

  import { goto } from '$app/navigation'

  let { data }: { data: PageData } = $props()

  let slideIndex = $derived(data.slideIndex)
  let { notes = [] } = $derived(slides[slideIndex])

  onMount(() => {
    remote.connect(data.presentation, undefined, (index) => {
      goto(`./${index}`)
    })
  })
</script>

<div class="wrapper">
  <span class="current-slide">
    Slide {slideIndex}
  </span>
  <div class="notes">
    {#each notes as note}
      <span transition:fade={{ duration: 200 }}>
        <SvelteMarkdown source={note} />
      </span>
    {/each}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 5em;
    background: var(--interface-dark);
  }

  .current-slide {
    padding-block-end: 0.5em;
    padding-inline-start: 1em;
    font-size: 1.5em;
    font-weight: 600;
    color: var(--interface-light);
    text-transform: uppercase;
  }

  .notes {
    flex: 1;
    padding: 0 1em;
    overflow-y: auto;
    font-family: sans-serif;
    font-size: 2em;
    color: var(--interface-light);
    background: var(--interface-light-semitransparent);
    border-radius: 1px;
  }
</style>
