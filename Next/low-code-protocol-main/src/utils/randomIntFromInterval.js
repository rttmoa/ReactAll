// https://stackoverflow.com/a/7228322
export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 4, 16
// Math.floor(Math.random() * (max - min + 1) + min)
// Math.floor( (0,1] * 13 + 4 )
