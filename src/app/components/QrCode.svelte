<script lang="ts">
  import { qr } from '@svelte-put/qr/svg'

  interface Props {
    title: string
    connectionUrl: string
  }

  let { title, connectionUrl }: Props = $props()
</script>

<div class="overlay">
  <span class="title">{title}</span>
  <div class="qr-background">
    <svg
      use:qr={{
        data: connectionUrl,
        shape: 'circle',
      }}
    />
  </div>
  <span class="connect-url">{connectionUrl}</span>
</div>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    font-size: 2em;
    color: var(--interface-light);
    background: var(--interface-dark-semitransparent);
  }

  .title {
    font-size: 2em;
  }

  .qr-background {
    padding: 1rem;
    background: var(--interface-light);
    border-radius: 1rem;
  }

  svg {
    width: 33vh;
    height: 33vh;
    color: var(--interface-dark);
  }

  .connect-url {
    font-family: monospace;
  }
</style>
