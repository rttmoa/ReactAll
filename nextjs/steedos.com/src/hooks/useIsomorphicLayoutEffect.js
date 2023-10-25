import { useEffect, useLayoutEffect } from 'react'





// 是开发环境 还是生产环境
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;


// useEffect useLoyoutEffect 区别
  // useEffect 是异步执行的，而useLayoutEffect是同步执行的。
  // useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价。