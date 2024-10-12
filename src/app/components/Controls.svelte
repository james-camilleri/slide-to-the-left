<script lang="ts">
  interface ControlsProps {
    baseUrl: string
    currentSlide: number
    lastSlide: number
  }

  let { baseUrl, currentSlide, lastSlide }: ControlsProps = $props()

  let previousSlide = $derived(currentSlide !== 0 ? currentSlide - 1 : undefined)
  let nextSlide = $derived(currentSlide !== lastSlide ? currentSlide + 1 : undefined)
</script>

<!-- Icons by Font Awesome -->
<!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
<div class="controls">
  <a class="previous" aria-label="previous" href="{baseUrl}/{previousSlide ?? currentSlide}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
      ><path
        d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
      /></svg
    >
  </a>
  <a class="next" aria-label="next" href="{baseUrl}/{nextSlide ?? currentSlide}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path
        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
      />
    </svg>
  </a>
</div>

<style>
  a,
  a:visited {
    color: var(--grey);
    text-decoration: none;
  }

  a:first-child {
    padding: 3em 0 3em 1em;
  }

  a:last-child {
    padding: 3em 1em 3em 0;
  }

  svg {
    width: 3em;
    height: 3em;
  }
</style>
