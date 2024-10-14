<script lang="ts">
  import Background from '$assets/components/Background.svelte'
  import { transition } from '$lib/transition'
  import slides from '$slides'

  import { resolveTemplate } from '../../templates'

  // Global slide-specific styles,
  // for easy styling of the whole deck.
  import '../../styles/slides.css'

  let { slideIndex }: Props = $props()
  let currentSlide = $derived(slides[slideIndex])
  let Slide = $derived(resolveTemplate(currentSlide))

  let direction = $state(1)
  let { in: inTransition, out: outTransition } = $derived(transition(direction))

  // ...
  // Some more stuff for calculating automatic scaling on presenter/remote mode here.
</script>

<div class="slide-view">
  <!-- Key the slide to the slide index, so that a
   new slide is animated in whenever it changes. -->
  {#key slideIndex}
    <!-- Apply the configured transitions. -->
    <div in:inTransition out:outTransition>
      <!-- New Svelte 5 <svelte:component> syntax. -->
      <Slide {...currentSlide} />
    </div>
  {/key}

  <Background currentSlideIndex={slideIndex} {...currentSlide} />
</div>
