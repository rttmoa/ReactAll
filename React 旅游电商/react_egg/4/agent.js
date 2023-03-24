module.exports = agent => {
  // 这里我们使用 messenger 对象来收发消息
  // 并且是在 egg 启动之后才能收发消息
  agent.messenger.on('egg-ready', () => {
    const data = {info: 'agent send msg!'};
    agent.messenger.sendToApp('agentAction', data);
  });
}