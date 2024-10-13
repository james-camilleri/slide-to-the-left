<script lang="ts">
  import type { SeededRandom } from '$lib/random'

  import { T } from '@threlte/core'
  import { Instance, InstancedMesh, RoundedBoxGeometry } from '@threlte/extras'
  import { Block } from './Block.svelte'
  import { tweened } from 'svelte/motion'
  import { fromStore } from 'svelte/store'

  const PADDING = 0
  const ASPECT_RATIO = 16 / 8.5

  interface Props {
    blockSize: number
    dark: boolean
    direction: { current: number }
    random: SeededRandom
    rows: number
  }

  let { direction, random, rows: blocksY, blockSize, dark }: Props = $props()

  let blocksX = Math.ceil(blocksY * ASPECT_RATIO)
  let offsetX = ((blocksX / 2) * blockSize - blockSize / 2) * -1
  let offsetY = ((blocksY / 2) * blockSize - blockSize / 2) * -1

  const lightIntensityTopRightTweened = tweened(800)
  const lightIntensityBottomLeftTweened = tweened(300)
  let lightIntensityTopRight = $derived(fromStore(lightIntensityTopRightTweened))
  let lightIntensityBottomLeft = $derived(fromStore(lightIntensityBottomLeftTweened))

  $effect(() => {
    lightIntensityTopRightTweened.set(dark ? 400 : 800)
    lightIntensityBottomLeftTweened.set(dark ? 150 : 300)
  })

  let blocks: Block[] = $state(
    (() => {
      const blocks = []

      for (let _y = 0; _y < blocksY; _y++) {
        for (let _x = 0; _x < blocksX; _x++) {
          const x = _x * (blockSize + PADDING) + offsetX
          const y = _y * (blockSize + PADDING) + offsetY

          blocks.push(
            new Block({
              x,
              y,
              column: _x,
              row: _y,
              totalColumns: blocksX,
              getRandom: () => random,
              animationDirection: direction,
            }),
          )
        }
      }

      return blocks
    })(),
  )

  $effect(() => {
    const orangeBlocks = random
      .shuffleArray([
        // Top quarter.
        [random.integerBetween(2, blocksX - 2), random.integerBetween(2, blocksY / 4)].join(':'),
        // Bottom quarter.
        [
          random.integerBetween(2, blocksX - 2),
          random.integerBetween((blocksY / 4) * 3, blocksY - 2),
        ].join(':'),
        // Left quarter.
        [random.integerBetween(2, blocksX / 4), random.integerBetween(2, blocksY - 2)].join(':'),
        // Right quarter.
        [
          random.integerBetween((blocksX / 4) * 3, blocksX - 2),
          random.integerBetween(2, blocksY - 2),
        ].join(':'),
      ])
      .slice(0, 3)

    blocks.forEach((block) => {
      const index = [block.column, block.row].join(':')
      block.rotate()
      block.setColour(!dark && orangeBlocks.includes(index))
    })
  })
</script>

<T.PointLight position={[15, 8, 15]} intensity={lightIntensityTopRight.current} color="#fff" />
<T.PointLight position={[0, 8, 15]} intensity={lightIntensityBottomLeft.current} color="#eef" />

<InstancedMesh limit={blocks.length}>
  <RoundedBoxGeometry args={[blockSize, blockSize, blockSize]} radius={0.02} />
  <T.MeshStandardMaterial />

  {#each blocks as block}
    <Instance position={block.position} rotation={[0, block.rotation, 0]} color={block.colour} />
    {#if block.lightIntensity}
      <T.PointLight
        position={block.position}
        intensity={block.lightIntensity}
        color="hsl(12, 95%, 62%)"
      />
    {/if}
  {/each}
</InstancedMesh>
