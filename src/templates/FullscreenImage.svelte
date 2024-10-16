<script lang="ts">
  import type { Slide } from '$lib/slide'

  let { image }: Slide = $props()
</script>

<div class="slide">
  {#if image}
    <div class="img-wrapper">
      <img src={image} />
    </div>
  {/if}
</div>

<style>
  .img-wrapper {
    margin: calc(var(--padding) * -1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
