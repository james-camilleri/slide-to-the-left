<script lang="ts">
  import type { PageData } from './$types'

  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import SvelteMarkdown from 'svelte-markdown'

  import SlideView from '$internal/components/SlideView.svelte'
  import Timer from '$internal/components/Timer.svelte'
  import { getNextSlide } from '$internal/utils/navigation'
  import { remote } from '$internal/utils/remote.svelte'
  import slides from '$slides'

  let { data }: { data: PageData } = $props()

  let slideIndex = $state(0)
  let { notes = [] } = $derived(slides[slideIndex])
  let timerStartTime: number | undefined = $state()

  onMount(() => {
    remote.connect(data.presentation, data.secret, (index) => {
      slideIndex = index
    })
  })

  function onKeyPress(e: KeyboardEvent) {
    const nextSlide = getNextSlide(e, slideIndex, slides.length)
    if (nextSlide != null) {
      remote.send(nextSlide)
    }

    if (e.key === 't' && !timerStartTime) {
      timerStartTime = Date.now()
    }
  }
</script>

<svelte:window onkeydown={onKeyPress} />

<div class="presenter">
  <div class="main-panel">
    <div class="timer-wrapper">
      <div class="preview">
        <SlideView {slideIndex} scale />
      </div>
      <div class="timer">
        <Timer startTime={timerStartTime} />
      </div>
    </div>
  </div>
  <div class="side-panel">
    <div class="preview next-slide">
      {#if slides[slideIndex + 1]}
        <SlideView slideIndex={slideIndex + 1} scale />
      {/if}
    </div>
    <div class="notes">
      {#each notes as note}
        <span transition:fade={{ duration: 200 }}>
          <SvelteMarkdown source={note} />
        </span>
      {/each}
    </div>
  </div>
</div>

<style>
  .presenter {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 5em;
    width: 100vw;
    height: 100vh;
    padding: 5em;
    background: var(--interface-dark);
  }

  .main-panel {
    z-index: 0;
    align-self: center;
  }

  .side-panel {
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 5em;
  }

  .preview {
    overflow: hidden;
    border-radius: 1px;
  }

  .next-slide {
    position: relative;
    width: 30vw;
  }

  .timer-wrapper {
    position: relative;
  }

  .timer {
    position: absolute;
    bottom: -2em;
    z-index: 1;
    width: 100%;
    font-size: 3em;
    text-align: end;
  }

  .notes {
    flex: 1;
    padding: 0 1em;
    overflow-y: auto;
    font-family: sans-serif;
    font-size: 2em;
    color: var(--interface-light);
    background: var(--interface-light-semitransparent);
  }
</style>
