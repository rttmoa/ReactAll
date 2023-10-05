const axios = require('axios')
const github_base_url = 'https://api.github.com';


async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers,
  })
}

// TODO: 同构概念：客户端和服务端都会执行  又要适应服Nodejs执行环境 又要适应浏览器执行环境
// todo 判断是 开发环境(development) | 生产环境(production)
// 服务端渲染和客户端请求的区别 | 判断是否是服务端  
const isServer = typeof window === 'undefined';
// console.log('isServer', isServer)

async function request({method = 'GET', url, data = {}}, req, res) { 
  
  if (!url) {throw Error('url must provide')}
  // console.log(url)
  
  // 如果是服务端  (url: https://api.github.com/repos/facebook/react/issues)
  if (isServer) {
    const headers = {};
    const session = req.session;
    const githubAuth = session.githubAuth || {};
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
    }
    return await requestGithub(method, url, data, headers);
    
  } else {
    // 如果是客户端  (url: "/github/repos/facebook/react/issues?state=closed&labels=Browser: IE,Browser: Safari")
    return await axios({ method, url: `/github${url}`, data })
  }
}

module.exports = {
  request,
  requestGithub,
}
