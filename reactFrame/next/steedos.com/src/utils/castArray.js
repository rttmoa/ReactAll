





// 是数组返回数组 不是数组变成数组
export function castArray(value) {
  return Array.isArray(value) ? value : [value]
}
