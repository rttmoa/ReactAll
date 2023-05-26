import { useEffect, useRef } from "react"



/***--- 查看某个页面渲染了多少次 ---**/
function useRenderCount() {
  const count = useRef(1)
  useEffect(() => count.current++)
  return count.current
}


export default function RenderComp() {
    const renderCount = useRenderCount()

    return <div>
        123
    </div>
}