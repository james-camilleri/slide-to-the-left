const fibonacci = (n: number) =>
  Array(n)
    .fill(0)
    .reduce((acc, val, i) => {
      return acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i)
    }, [] as number[])
