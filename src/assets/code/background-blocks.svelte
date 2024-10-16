<script lang="ts">
  import type { SeededRandom } from '$lib/random'

  import { T } from '@threlte/core'
  import { Instance, InstancedMesh, RoundedBoxGeometry } from '@threlte/extras'
  import { tweened } from 'svelte/motion'
  import { fromStore } from 'svelte/store'

  import { Block } from './reactive-block'

  const PADDING = 0
  const ASPECT_RATIO = 16 / 8.5

  interface Props {
    blockSize: number
    dark: boolean
    direction: number
    random: SeededRandom
    rows: number
  }

  let { direction, random, rows: blocksY, blockSize, dark }: Props = $props()

  let blocksX = Math.ceil(blocksY * ASPECT_RATIO)
  let offsetX = ((blocksX / 2) * blockSize - blockSize / 2) * -1
  let offsetY = ((blocksY / 2) * blockSize - blockSize / 2) * -1

  // Trusty Svelte tweened stores give us nice
  // animated changes in our animated properties.
  const lightIntensityTopRightTweened = tweened(800)
  const lightIntensityBottomLeftTweened = tweened(300)

  // Using the in-built `fromStore` helpers to wrap (unwrap?)
  // the stores to Svelte 5 derived state.
  const lightIntensityTopRight = $derived(fromStore(lightIntensityTopRightTweened))
  const lightIntensityBottomLeft = $derived(fromStore(lightIntensityBottomLeftTweened))

  // Adjust the lighting intensity for "dark" slides.
  $effect(() => {
    lightIntensityTopRightTweened.set(dark ? 400 : 800)
    lightIntensityBottomLeftTweened.set(dark ? 150 : 300)
  })

  // State storing all the parameters for the cubes in the background.
  let blocks: Block[] = $state(
    (() => {
      const blocks = []

      for (let _y = 0; _y < blocksY; _y++) {
        for (let _x = 0; _x < blocksX; _x++) {
          const x = _x * (blockSize + PADDING) + offsetX
          const y = _y * (blockSize + PADDING) + offsetY

          blocks.push(
            // Class encapsulating reactive state. Each instance keeps
            // track of the parameters for an individual cube.
            new Block({
              x,
              y,
              column: _x,
              row: _y,
              totalColumns: blocksX,
              // State getters to always return the latest value.
              getAnimationDirection: () => direction,
              getDarkMode: () => dark,
              getRandom: () => random,
            }),
          )
        }
      }

      return blocks
    })(),
    // 👆 This could have been extracted into a `generateBlocks`
    // function, but who doesn't like a little IIFE once in a while?
  )

  $effect(() => {
    // Pick three random cubes on the outer edges of the scene to highlight.
    const highlightedBlocks = random
      .shuffleArray([
        [
          // Top quarter.
          random.integerBetween(2, blocksX - 2),
          random.integerBetween(2, blocksY / 4)
        ].join(':'),
        [
          // Bottom quarter.
          random.integerBetween(2, blocksX - 2),
          random.integerBetween((blocksY / 4) * 3, blocksY - 2),
        ].join(':'),
        [
          // Left quarter.
          random.integerBetween(2, blocksX / 4),
          random.integerBetween(2, blocksY - 2)
        ].join(':'),
        [
          // Right quarter.
          random.integerBetween((blocksX / 4) * 3, blocksX - 2),
          random.integerBetween(2, blocksY - 2),
        ].join(':'),
      ])
      .slice(0, 3)

    // Rotate each cube and change the colours
    // from orange to black (or vice-versa).
    blocks.forEach((block) => {
      const index = [block.column, block.row].join(':')
      block.rotate()
      block.setColour(highlightedBlocks.includes(index))
    })
  })
</script>

<!-- Two lights, one at the top right and the other
 on the bottom left, give a nice overall gradient. -->
<T.PointLight position={[15, 8, 15]} intensity={lightIntensityTopRight.current} color="#fff" />
<T.PointLight position={[0, 8, 15]} intensity={lightIntensityBottomLeft.current} color="#eef" />

<!-- An InstancedMesh is a handy THREE.js tool for displaying large numbers
 of objects without too much of a performance hit. It uses a single instance
 of a geometry (the box) and replicates with while adjusting its properties. -->
<InstancedMesh limit={blocks.length}>
  <RoundedBoxGeometry args={[blockSize, blockSize, blockSize]} radius={0.02} />
  <T.MeshStandardMaterial />

  {#each blocks as block}
    <!-- Add each instance of the block to the scene
     with the correct position, rotation, and colour. -->
    <Instance
      position={block.position}
      rotation={[0, block.rotation, 0]}
      color={block.colour} 
    />
    <!-- If a cube has an associated light intensity (i.e. it's glowing),
     add a light at the same position. Selective addition of these lights
     is important, as more than a handful of lights immediately tanks
     the scene's performance. -->
    {#if block.lightIntensity}
      <T.PointLight
        position={block.position}
        intensity={block.lightIntensity}
        color="hsl(12, 95%, 62%)"
      />
    {/if}
  {/each}
</InstancedMesh>
