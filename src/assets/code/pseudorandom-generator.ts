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
