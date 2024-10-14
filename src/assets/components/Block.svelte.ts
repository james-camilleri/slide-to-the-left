import { tweened } from 'svelte/motion'
import { fromStore } from 'svelte/store'

import { SeededRandom } from '$lib/random'

interface Props {
  row: number
  column: number
  totalColumns: number
  x: number
  y: number
  getRandom: () => SeededRandom
  animationDirection: { current: number }
}

export class Block {
  #tweenedValues = {
    z: tweened(0),
    rotation: tweened(0, { duration: 150 }),
    saturation: tweened(0),
    lightness: tweened(10),
    lightIntensity: tweened(0),
  }

  row = $state(0)
  column = $state(0)
  #totalColumns = $state(0)

  #x: number
  #y: number
  #z: { current: number }
  #rotation = fromStore(this.#tweenedValues.rotation)

  #saturation = fromStore(this.#tweenedValues.saturation)
  #lightness = fromStore(this.#tweenedValues.lightness)
  #colour = $derived(
    'hsl(12,' + [`${this.#saturation.current}%`, `${this.#lightness.current}%`].join(',') + ')',
  )
  #lightIntensity = fromStore(this.#tweenedValues.lightIntensity)

  #getRandom = () => new SeededRandom(0)
  #animationDirection = { current: -1 }
  #offset = $derived(
    this.#animationDirection.current > 0 ? this.#totalColumns - this.column : this.column,
  )
  #delay = $derived(this.#getRandom().numberBetween(0, 25) + 15 * this.#offset)

  constructor({ row, column, totalColumns, x, y, getRandom, animationDirection }: Props) {
    this.row = row
    this.column = column
    this.#totalColumns = totalColumns
    this.#x = x
    this.#y = y
    this.#z = fromStore(this.#tweenedValues.z)
    this.#getRandom = getRandom
    this.#animationDirection = animationDirection
  }

  get position() {
    return [this.#x, this.#y, this.#z.current] as [number, number, number]
  }

  get rotation() {
    return this.#rotation.current
  }

  get colour() {
    return this.#colour
  }

  get lightIntensity() {
    return this.#lightIntensity.current
  }

  extrude(value: number) {
    this.#tweenedValues.z.set(value, { delay: this.#delay })
  }

  setColour(orange: boolean) {
    // The random generator is basically a react hook (fml). If you call
    // it a different number of times you're going to going to get different
    // values. This is obvious when y ou think about it, but it is also annoying.
    const extrudeBy = this.#getRandom().numberBetween(0.03, 0.07)

    if (orange) {
      this.extrude(extrudeBy)
      this.#tweenedValues.saturation.set(95, { delay: this.#delay })
      this.#tweenedValues.lightness.set(62, { delay: this.#delay })
      this.#tweenedValues.lightIntensity.set(5, { delay: this.#delay })
    } else {
      this.extrude(0)
      this.#tweenedValues.saturation.set(0, { delay: this.#delay })
      this.#tweenedValues.lightness.set(10, { delay: this.#delay })
      this.#tweenedValues.lightIntensity.set(0, { delay: this.#delay })
    }
  }

  rotate() {
    this.#tweenedValues.rotation.update(
      (rotation) => rotation - 1.5708 * this.#animationDirection.current,
      {
        delay: this.#delay,
      },
    )
  }
}
