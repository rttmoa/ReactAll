import { useEffect, useLayoutEffect } from 'react'



// 是 生产环境还是 开发环境
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
