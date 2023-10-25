import { useState, useEffect } from 'react'
import { useRect } from '@reach/rect'



// ? 传递的 ref 挂载在 DOM 上 ；useRect获取每个 DOM 距离顶部的高度；返回给调用者
export function useTop(ref) {
  let [top, setTop] = useState()
  let rect = useRect(ref)
  let rectTop = rect ? rect.top : undefined
  // console.log(window.pageYOffset) /// 111.11112213134766
  // console.log(parseInt(rectTop)) // 初始值； 288 > 4998    滚动后； -4423 > -533
  // console.log(parseInt(top))

  useEffect(() => {
    if (typeof rectTop === 'undefined') return
    let newTop = rectTop + window.pageYOffset
    if (newTop !== top) {
      // console.log(newTop)
      setTop(newTop)
    }
  }, [rectTop, top])

  return top
}
