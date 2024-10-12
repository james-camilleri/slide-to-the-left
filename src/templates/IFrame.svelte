<script lang="ts">
  import type { Slide } from '$lib/slide'

  let { iframe }: Slide = $props()
</script>

<div class="slide">
  <iframe title={iframe} src={iframe}></iframe>
</div>

<style>
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
