const axios = require('axios')
const github_base_url = 'https://api.github.com';

// TODO: 同构概念：客户端和服务端都会执行  又要适应服Nodejs执行环境 又要适应浏览器执行环境

async function requestGithub(method, url, data, headers) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers,
  })
}
// 服务端渲染和客户端请求的区别
// 判断是否是服务端
const isServer = typeof window === 'undefined';

async function request({method = 'GET', url, data = {}}, req, res) { // 参数是要传给axios的相关配置
  
  if (!url) {throw Error('url must provide')}

  // 如果是服务端
  if (isServer) {
    const session = req.session;
    const githubAuth = session.githubAuth || {};
    const headers = {};
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`;
    }
    return await requestGithub(method, url, data, headers);
    
  } else {
    // 如果是客户端
    // /search/respos
    return await axios({
      method,
      url: `/github${url}`,
      data,
    })
  }
}

module.exports = {
  request,
  requestGithub,
}
