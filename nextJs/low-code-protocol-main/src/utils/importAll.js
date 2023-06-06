


export function importAll(r) {

  // console.log(r)  //-->  ƒ webpackContext(req) { var id = webpackContextResolve(req); return __webpack_require__(id); }

  // 打印出  154个  .mdx 后缀名的文件
  // console.log(r.keys()) //-->  (154) ['./api-metadata.mdx', './api-process.mdx', './api-records-filters.mdx', .....]


  // const test = r.keys().map((fileName) => ({ fileName }))
  // console.log(test) //--> 新数组为对象格式的数组： (154) [{fileName: './api-metadata.mdx'},{fileName: './api-process.mdx'}, ......]

  // const test2 = r.keys().map((fileName) => ({ fileName, module: r(fileName) }))
  // console.log(test2) //--> (154) [{fileName: './api-metadata.mdx', module: Module:{default:{title:'流程API', __esModule:true}}}]


  return r.keys().map((fileName) => ({
    fileName,
    module: r(fileName),
  }))
}
