



export function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}

// console.log(loadImage("https://devpress.csdnimg.cn/766cf9e7ab8b485cae0a88f7dbe1a86f.jpg"))