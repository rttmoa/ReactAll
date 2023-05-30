import { useRouter } from 'next/router'


/***--- @param null,    @returns Boolean ---**/
export function useIsHome() {
  return useRouter().pathname === '/'
}
