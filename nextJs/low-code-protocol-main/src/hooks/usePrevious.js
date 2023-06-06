// https://usehooks.com/usePrevious/
import { useRef, useEffect } from 'react'






export function usePrevious(value) {

  // ref 对象是一个通用容器，其当前属性是可变的...
  // ... 并且可以保存任何值，类似于类的实例属性
  const ref = useRef()

  // 将当前值存储在 ref 中
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes

  // 返回之前的值（在上面的 useEffect 更新之前发生）
  return ref.current
}
