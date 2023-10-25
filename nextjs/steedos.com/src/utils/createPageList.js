import { importAll } from './importAll'

  
// ? 处理 docs 下 mdx 文件；返回文件名对应的对象信息
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
  // console.log(PageList) 
    // {
    //   deploy-windows: {title: 'Windows 部署', href: '/docs/deploy/deploy-windows'}
    //   getting-started: {title: '快速向导', href: '/docs/deploy/getting-started'}
    //   upgrade: {title: '版本升级', href: '/docs/deploy/upgrade'}
    //   .... 
    // } 
  return PageList
}

