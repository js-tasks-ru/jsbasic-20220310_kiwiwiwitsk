function getMinMax(str) {
  const arr = str.split(' ').filter(item => isFinite(item))

  const result = {
    min: Math.min(...arr),
    max: Math.max(...arr)
  }
  return result
}
