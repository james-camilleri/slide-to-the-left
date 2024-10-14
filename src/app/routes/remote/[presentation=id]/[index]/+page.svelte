<script lang="ts">
  import type { PageData } from './$types'

  import { onMount } from 'svelte'
  import SvelteMarkdown from 'svelte-markdown'

  import SlideView from '$internal/components/SlideView.svelte'
  import { remote } from '$internal/utils/remote.svelte'
  import slides from '$slides'

  import { goto } from '$app/navigation'

  let { data }: { data: PageData } = $props()

  let slideIndex = $derived(data.slideIndex)
  let currentSlide = $derived(slides[slideIndex])

  onMount(() => {
    if (!data.secret) {
      console.error('Connection secret missing')
      return
    }

    remote.connect(data.presentation, data.secret, (index) => {
      goto(`./${index}`)
    })
  })

  function nextSlide() {
    remote.send(slideIndex + 1)
    navigator.vibrate(50)
  }

  function previousSlide() {
    remote.send(slideIndex - 1)
    navigator.vibrate(50)
  }
</script>

<div class="remote">
  <div class="notes">
    {#each currentSlide.notes ?? [] as note}
      <SvelteMarkdown source={note} />
    {/each}
  </div>
  <div class="buttons">
    <button class="previous" onclick={previousSlide}>&lt; Previous</button>
    <button class="next" onclick={nextSlide}>Next &gt;</button>
  </div>
  <SlideView {slideIndex} scale />
</div>

<style>
  .remote {
    display: grid;
    grid-template-rows: 1fr auto auto;
    width: 100vw;
    height: 100vh;
  }

  .notes {
    padding: 1rem 2rem;
    overflow-y: auto;
    font-family: sans-serif;
    font-size: 2rem;
    color: var(--interface-light);
    background: var(--interface-dark);
  }

  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 20vh;

    button {
      font-size: 1.5rem;
      background: var(--interface-neutral);
      border: 1px solid var(--interface-dark);
      border-radius: 0;
    }
  }
</style>
