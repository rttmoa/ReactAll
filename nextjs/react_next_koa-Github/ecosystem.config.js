

// 服务器
// pm2的配置文件
module.exports = {
  apps: [
    {
      // 要启动的nodejs实例
      name: 'next-project',
      // 启动的脚本
      script: './server.js',
      // 启动的实例个数
      instances: 1,
      // 是否自动重启
      autorestart: true,
      watch: false,
      // 使用多少内存，它要强制被重启 - 最大使用的内存
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}