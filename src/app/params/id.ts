export function match(param: string) {
  return /([0-9a-f]+-){4}[0-9a-f]+/.test(param)
}
