

// 函数声明
function add(x: number, y: number, z: number = 10): number {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}

let result = add(2, 3, 5)




const addFn = function(x: number, y: number, z: number = 10): number { // 指定传参类型； 指定返回值类型
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}

const add2: (x: number, y: number, z?: number) => number = addFn
