<script lang="ts">
  import type { Snippet } from 'svelte'

  import 'sanitize.css'
  import '../../styles/interface.css'
  import '../../styles/fonts.css'

  let { children }: { children: Snippet } = $props()
</script>

{@render children()}
