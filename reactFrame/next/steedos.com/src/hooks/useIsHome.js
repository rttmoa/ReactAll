import { useRouter } from 'next/router'




// 是否 主页
export function useIsHome() {
  return useRouter().pathname === '/'
}
