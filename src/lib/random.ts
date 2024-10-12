type RandomNumberGenerator = () => number

/**
 * Pseudo-random number generator. Returns a `random()` function which
 * always returns the same series of random numbers for a given seed.
 *
 * https://github.com/bryc/code/blob/master/jshash/PRNGs.md#splitmix32
 */
function splitmix32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x9e3779b9) | 0

    let t = seed ^ (seed >>> 16)
    t = Math.imul(t, 0x21f0aaad)
    t = t ^ (t >>> 15)
    t = Math.imul(t, 0x735a2d97)

    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296
  }
}

/**
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * License: Public domain. Attribution appreciated.
 * A fast and simple 53-bit string hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.

 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 */
function cyrb53(str: string, seed = 0) {
  let h1 = 0xdeadbeef ^ seed
  let h2 = 0x41c6ce57 ^ seed

  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

  return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

export class SeededRandom {
  private random: RandomNumberGenerator

  constructor(seed: number | string) {
    this.random =
      typeof seed === 'string' ? splitmix32(cyrb53(seed)) : splitmix32(seed * 10000000000)
  }

  generate() {
    return this.random()
  }

  numberBetween(min: number, max: number) {
    return this.random() * (max - min) + min
  }

  integerBetween(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(this.random() * (max - min) + min)
  }

  shuffleArray<T>(array: T[]) {
    let currentIndex = array.length
    let randomIndex: number

    while (currentIndex != 0) {
      randomIndex = Math.floor(this.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  }
}

export function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}
