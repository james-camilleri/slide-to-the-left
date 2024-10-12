<script lang="ts">
  let { startTime }: { startTime?: number } = $props()
  let currentTime = $state(0)

  const format = Intl.DateTimeFormat(undefined, { timeStyle: 'medium', timeZone: 'utc' }).format
  let time = $derived(startTime ? format(new Date(currentTime - startTime)) : '')

  $effect(() => {
    if (!startTime) {
      return
    }

    currentTime = Date.now()
    const interval = setInterval(() => {
      currentTime = Date.now()
    }, 1000)

    return () => clearInterval(interval)
  })
</script>

<span>{time}</span>

<style>
  span {
    font-family: var(--font-monospace);
    font-size: 0.8em;
    font-weight: 100;
    color: var(--grey);
  }
</style>
