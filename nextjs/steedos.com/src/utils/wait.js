



// 等待 x 秒后；返回 Promise 对象
export function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve("waitValue"), ms)
  })
}

// console.log(wait(1000).then(res => console.log(res))) // 1s后打印 waitValue
