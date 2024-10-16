<script lang="ts">
  import type { PageData } from './$types'

  import { onMount } from 'svelte'

  import Controls from '$internal/components/Controls.svelte'
  import QrCode from '$internal/components/QrCode.svelte'
  import SlideView from '$internal/components/SlideView.svelte'
  import Timer from '$internal/components/Timer.svelte'
  import { getNextSlide } from '$internal/utils/navigation'
  import { remote } from '$internal/utils/remote.svelte'
  import slides from '$slides'

  import { beforeNavigate, goto } from '$app/navigation'
  import { page } from '$app/stores'

  onMount(() => {
    // Initialise host immediately, to reconnect if the app is refreshed.
    remote.host(data.slideIndex, slides.length, updateSlideUrl)

    // Prefetch image URLs for caching.
    const imageUrls = slides.reduce((imageUrls, slide) => {
      const { image, images } = slide
      if (image) {
        imageUrls.push(image)
      }

      if (images) {
        imageUrls.push(...(Array.isArray(images) ? images : [images]))
      }

      return imageUrls
    }, [] as string[])
    imageUrls.map((url) => fetch(url))
  })

  let { data }: { data: PageData } = $props()
  let currentIndex = $derived(data.slideIndex)

  let remoteConnectUrl = $state('')
  let showRemoteQrCode = $state(false)
  let shareUrl = $state('')
  let showShareQrCode = $state(false)
  let timerStartTime: number | undefined = $state()

  function updateSlideUrl(index: number) {
    goto(`/slides/${index}`)
  }

  function goToSlide(index: number) {
    const nextSlide = Math.max(0, Math.min(slides.length - 1, index))

    if (remote.active) {
      remote.send(nextSlide)
      return
    }

    updateSlideUrl(nextSlide)
  }

  function onKeyPress(e: KeyboardEvent) {
    const nextSlide = getNextSlide(e, data.slideIndex, slides.length)
    if (nextSlide != null) {
      goToSlide(nextSlide)
      return
    }

    switch (e.key) {
      // Remote control.
      case 'r': {
        if (remoteConnectUrl) {
          // Update remote URL with current slide every time this is triggered.
          remoteConnectUrl = remoteConnectUrl.replace(/\/\d+(\?.*)/, `/${currentIndex}$1`)

          showRemoteQrCode = !showRemoteQrCode
          return
        }

        const { presentationId, secret } = remote.host(
          data.slideIndex,
          slides.length,
          updateSlideUrl,
        )

        remote.onStatusUpdate((status) => {
          if (status === 'new-connection') {
            showRemoteQrCode = false
          }
        })

        remoteConnectUrl = `https://${$page.url.host}/remote/${presentationId}/${currentIndex}?secret=${secret}`
        showRemoteQrCode = true

        break
      }

      // Show notes.
      case 'n': {
        const { presentationId } = remote.host(data.slideIndex, slides.length, updateSlideUrl)

        window.open(`https://${$page.url.host}/notes/${presentationId}/${currentIndex}`)
        break
      }

      // Presenter view.
      case 'p': {
        const { presentationId, secret } = remote.host(
          data.slideIndex,
          slides.length,
          updateSlideUrl,
        )

        window.open(
          `https://${$page.url.host}/present/${presentationId}/${currentIndex}?secret=${secret}`,
        )
        break
      }

      // Share slides.
      case 's': {
        if (!shareUrl) {
          const { presentationId } = remote.host(data.slideIndex, slides.length, updateSlideUrl)

          shareUrl = `https://${$page.url.host}/slides/${presentationId}/${currentIndex}`
          showShareQrCode = true

          return
        }

        // Update share URL with current slide every time this is triggered.
        shareUrl = shareUrl.split('/').slice(0, -1).join('/') + `/${currentIndex}`
        showShareQrCode = !showShareQrCode

        break
      }

      case 'Escape': {
        showRemoteQrCode = false
        showShareQrCode = false
        break
      }

      // Timer.
      case 't': {
        if (!timerStartTime) {
          timerStartTime = Date.now()
        }

        break
      }
    }
  }

  // Capture nav link clicks and re-route to remote if active.
  beforeNavigate(({ cancel, to, type }) => {
    const slideIndex = to?.params?.slideIndex
    if (remote.active && slideIndex && type === 'link') {
      remote.send(Number(slideIndex))
      cancel()
    }
  })
</script>

<svelte:window onkeydown={onKeyPress} />

{#if showRemoteQrCode}
  <QrCode title="Pair remote" connectionUrl={remoteConnectUrl} />
{/if}
{#if showShareQrCode}
  <QrCode title="Follow slides" connectionUrl={shareUrl} />
{/if}

<div class="timer">
  <Timer startTime={timerStartTime} />
</div>

<div class="controls">
  <Controls baseUrl="/slides" currentSlide={currentIndex} lastSlide={slides.length - 1} />
</div>

<div class="view">
  <SlideView slideIndex={currentIndex} />
</div>

<div class="iframe-preload">
  {#each slides as slide}
    {#if slide.iframe}
      <iframe title="preload: {slide.iframe}" src={slide.iframe}></iframe>
    {/if}
  {/each}
</div>

<style>
  .view {
    width: 100vw;
    height: 100vh;
  }

  .timer {
    position: fixed;
    bottom: 1em;
    left: 1.5em;
    z-index: 10;
  }

  .controls {
    position: fixed;
    right: 2em;
    bottom: 2em;
    z-index: 10;
    opacity: 0.7;
  }

  .iframe-preload {
    display: none;
  }
</style>
