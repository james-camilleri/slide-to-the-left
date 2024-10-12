<script lang="ts">
  import type { PageData } from './$types'

  import { onMount } from 'svelte'

  import SlideView from '$internal/components/SlideView.svelte'
  import { remote } from '$internal/utils/remote.svelte'

  import { goto } from '$app/navigation'

  let { data }: { data: PageData } = $props()

  onMount(() => {
    remote.connect(data.presentation, undefined, (index) => goto(`./${index}`))
  })
</script>

<div class="view">
  <SlideView slideIndex={data.slideIndex} />
</div>

<style>
  .view {
    width: 100vw;
    height: 100vh;
  }
</style>
