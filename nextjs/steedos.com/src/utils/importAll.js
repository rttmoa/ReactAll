



// 处理 mdx 文件
export function importAll(r) {
  const handleFile = r.keys().map((fileName) => ({
    fileName,
    module: r(fileName),
  }))
  // console.log(handleFile) // [{fileName: './api.mdx', module: Module}, {fileName: './metadata.mdx', module: Module}, ........]
  return handleFile
}
