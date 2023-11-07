







// 16. 使用 CDN

// 谷歌、亚马逊和微软等公司提供了许多内容分发网络。

// 这些 CDN 是可在你的应用中使用的外部资源。我们甚至可以创建私有 CDN 并托管我们的文件和资源。

// 使用 CDN 有以下好处：

//     1、不同的域名。浏览器限制了单个域名的并发连接数量，具体取决于浏览器设置。假设允许的并发连接数为 10。如果要从单个域名中检索 11 个资源，那么同时完成的只有 10 个，还有 1 个需要再等一会儿。CDN 托管在不同的域名/服务器上。因此资源文件可以分布在不同的域名中，提升了并发能力。

//     2、文件可能已被缓存。有很多网站使用这些 CDN，因此你尝试访问的资源很可能已在浏览器中缓存好了。这时应用将访问文件的已缓存版本，从而减少脚本和文件执行的网络调用和延迟，提升应用性能。

//     3、高容量基础设施。这些 CDN 由大公司托管，因此可用的基础设施非常庞大。他们的数据中心遍布全球。向 CDN 发出请求时，它们将通过最近的数据中心提供服务，从而减少延迟。这些公司会对服务器做负载平衡，以确保请求到达最近的服务器并减少网络延迟，提升应用性能。

// 如果担心安全性，可以使用私有 CDN。