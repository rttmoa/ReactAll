import { importAll } from './importAll'

  

export function createPageList(files, base) { 
  return importAll(files).reduce((acc, cur) => {
    let slug = cur.fileName.substr(2).replace(/\.mdx$/, '')
    return {
      ...acc,
      [slug]: { ...cur.module.default, href: `/${base}/${slug}` },
    }
  }, {})
}



export function t_createPageList(files, base) {
  const handleModule = files.keys().map(fileName => ({fileName, module: files(fileName)}))
  const PageList = handleModule.reduce((prev, curr) => {
    let slug = curr.fileName.substr(2).replace(/\.mdx$/, "")
    // console.log(curr)
    // console.log(slug)
    return {
      ...prev,
      [slug]: { ...curr.module.default, href: `/${base}/${slug}`}
    }
  }, {})
  return PageList
}

