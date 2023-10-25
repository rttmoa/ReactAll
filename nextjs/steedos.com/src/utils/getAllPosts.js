



function importAll(r) {
  // 属性名 & 开头包含. & 返回新数组 & 过滤 & 过滤 & 排序
  return r
    .keys() 
    .filter((filename) => filename.startsWith('.'))
    .map((filename) => ({
      slug: filename.substr(2).replace(/\/index\.mdx$/, ''),
      filename,
      module: r(filename),
    }))
    .filter(({ slug }) => !slug.includes('/snippets/'))
    .filter((p) => p.module.meta.private !== true)
    .sort((a, b) => dateSortDesc(a.module.meta.date, b.module.meta.date))
}

function dateSortDesc(a, b) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function getAllPostPreviews() {
  return importAll(require.context('../pages/blog/?preview', true, /\.mdx$/))
}

export function getAllPosts() {  
  return importAll(require.context('../pages/blog/?rss', true, /\.mdx$/))
}
