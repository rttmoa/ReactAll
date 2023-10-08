/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-20 16:29:22
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-11-19 16:02:57
 * @Description:
 */

import NextAuth from 'next-auth'
import KeycloakProvider from '@/lib/auth/KeycloakProvider'
import CredentialsProvider from '@/lib/auth/CredentialsProvider'
const axios = require('axios')
const querystring = require('querystring')
const STEEDOS_ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL // https://console.steedos.cn
const OIDC_API = '/api/global/auth/oidc/login'
const VALIDATE_API = '/api/setup/validate'


// TODO: 此文件定义一些 auth； OAuth、Session、SteedosiD

const loginSteedosByOIDC = async (accessToken) => {
  const projectRootUrl = STEEDOS_ROOT_URL
  const rest = await axios({
    url: `${projectRootUrl}${OIDC_API}`,
    method: 'post',
    data: { accessToken },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  })
  return rest.data
}

const validateSteedosToken = async (space, token) => {
  const rest = await axios({
    url: `${STEEDOS_ROOT_URL}${VALIDATE_API}`,
    method: 'post',
    data: {
      utcOffset: 8,
    },
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${space},${token}` },
  })
  return rest.data
}

/**
 * todo 刷新访问令牌
 * 获取一个令牌，并返回一个更新后的新令牌
 * `accessToken` 和 `accessTokenExpires`。如果发生错误，
 * 返回旧令牌和错误属性
 */
async function refreshAccessToken(token) {
  try {
    // https://id.steedos.cn/realms/master
    // https://id.steedos.cn/realms/master/protocol/openid-connect/token
    const url = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token` 

    const response = await axios.post(
      url,
      querystring.stringify({
        client_id: process.env.KEYCLOAK_ID, // www.steedos.cn
        client_secret: process.env.KEYCLOAK_SECRET, // none
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })
    )

    const refreshedTokens = response.data

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // 回退到旧的刷新令牌
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}
// todo Nextjs 使用next-auth配置JWT token：https://www.cnblogs.com/eddyz/p/17622721.html
export const authOptions = {
  // 9kOEcyNC4qfhClzm2FFnyR3xzI2DuE7/F6BWqdYTlko=
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [KeycloakProvider],
  callbacks: {
    async jwt(props) {
      const { token, account, user } = props

      // Persist the OAuth access_token to the token right after signin
      if (account && user) {
        const token = {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          provider: account.provider,
          user,
        }

        if (account.provider === 'keycloak') {
          const loginResult = await loginSteedosByOIDC(account.access_token)

          user.space = loginResult.space
          user.token = loginResult.token
        }

        if (user.space && user.token) {
          const steedosSession = await validateSteedosToken(user.space, user.token)
          token.steedos = Object.assign(steedosSession, { token: steedosSession.authToken })
        }

        return token
      }

      if (token.provider != 'keycloak') return token

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },

    async session({ session, token, user }) {
      session.user = token.user
      session.steedos = token.steedos
      session.accessToken = token.accessToken
      session.error = token.error

      session.publicEnv = {
        STEEDOS_ROOT_URL: process.env.STEEDOS_ROOT_URL,
        STEEDOS_EXPERIENCE_ASSETURLS: process.env.STEEDOS_EXPERIENCE_ASSETURLS,
      }

      return session
    },
  },
  events: {
    async signOut(token, session) {},
  },
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
