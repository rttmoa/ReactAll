import { useEffect, useLayoutEffect } from 'react'



// 是开发环境 还是生产环境
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
