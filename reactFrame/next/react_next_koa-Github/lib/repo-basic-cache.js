import LRU from 'lru-cache'





/** #### TODO: 数据缓存工具类  */
const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60, // 60分钟
})
// @params: Object
export function cache(repo) {
  const full_name = repo.full_name 
  REPO_CACHE.set(full_name, repo)
}

// facebook/react
export function get(full_name) {
  return REPO_CACHE.get(full_name)
}

export function cacheArray(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach(repo => cache(repo))
  }
}
