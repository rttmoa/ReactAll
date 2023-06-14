import { useEffect } from 'react';




// http://localhost:8000/#/search?code=10001&endTime=%202023-06-30&startTime=2023-06-30%20
let observer;
export default function useObserverHook(ele, callback, watch = []) {
  useEffect(() => {
    const node = document.querySelector(ele);
    if (node) {
      observer = new IntersectionObserver(entries => {
        callback && callback(entries);
      });
      observer.observe(node);
    }

    return () => {
      if (observer && node) {
        // console.log("解绑元素") // TODO: 每次监听完会卸载 observer
        // 解绑元素
        observer.unobserve(node);

        // 停止监听
        observer.disconnect();
      }
    }
  }, watch);
}
