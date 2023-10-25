

function getRedisSessionId(sid) {
  return `ssid:${sid}`
}

/** #### TODO: 使用Redis去操作session的存，取，删除  */
class RedisSessionStore {
  constructor(client) {
    this.client = client; // 接收client对象，client对象就是； Redis实例
  }

  // 获取Redis中存储的session数据
  async get(sid) {
    console.log('getSessionSid', sid)
    const id = getRedisSessionId(sid)
    const data = await this.client.get(id)
    if (!data) { return null }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error("getSessionSid-Error", err)
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    console.log('setSessionSid', sid)
    const id = getRedisSessionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000) //　传入的是秒，而不是毫秒
    }
    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error("setSessionSid-Error", err)
    }
  }

  // 从reids当中删除某个session
  async destroy(sid) {
    console.log('destroySessionSid', sid)
    const id = getRedisSessionId(sid)
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;
