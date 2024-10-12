<script lang="ts">
  import type { Slide } from '$lib/slide'

  // We're not using any of the props for this template.
  let props: Slide = $props()
</script>

<div class="slide">
  <span>The End.</span>
</div>

<style>
  .slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: var(--dark);
  }

  span {
    font-size: 1.5em;
    font-weight: 700;
    color: var(--primary);
  }
</style>
