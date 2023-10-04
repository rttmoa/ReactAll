

// 可能需要将此文件名改成  config.sample.js -> config.js



// 需要在github中配置 Authorization callback URL
// https://github.com/settings/developers   注册名字，开发URL，授权后跳转的生产URL

const client_id = "b545a2ba1f9f58b9815e"
const SCOPE = 'user'
const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize'

module.exports = {
  github: {
    request_token_url: 'https://github.com/login/oauth/access_token',
    client_id,
    client_secret: 'c0e60857ff92c895e9340b5f5654d20367f87c5b',
  },
  GITHUB_OAUTH_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`,
}

// token 8de99c7accd48c7476c264e6a1971b38f26183fc
