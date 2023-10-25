

// TODO: 处理 图片懒加载
export function createInViewPromise(element, options = {}) {
  let observer
  console.log("/utils/createInViewPromise.js 图片懒加载")

  const promise = new Promise((resolve) => {
    const threshold = typeof options.threshold === 'undefined' ? 1 : options.threshold
    observer = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const inView = entries[i].isIntersecting && entries[i].intersectionRatio >= threshold
        if (inView) return resolve()
      }
    }, options)
    observer.observe(element)
  })

  return {
    promise,
    disconnect: () => {
      if (observer) {
        observer.disconnect()
      }
    },
  }
}
