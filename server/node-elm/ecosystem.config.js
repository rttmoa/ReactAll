
// PM2 配置文件（ecosystem.config.js 字段详细介绍）    https://blog.csdn.net/zz00008888/article/details/113738025
module.exports = {
  // apps是一个json结构的数组 ，每一个数组成员对应一个pm2中运行的应用
  apps : [{
    name: 'node-elm',
    script: 'index.js',
    instances: 1 ,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: 'logs/out.log',
    error: 'logs/error.log',
    log: 'logs/combined.outerr.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: 8001,
    }
  }],
  // 环境部署
  deploy: {
    // 生成环境
    // 1、上传代码到云端仓库
    // 2、部署命令预览：
    // 首次部署: $ pm2 deploy ecosystem.json production setup 
    // 更新版本: $ pm2 deploy ecosystem.json production update 
    // 返回上一个版本: $ pm2 deploy ecosystem.json production revert 1 
    // 3、执行首次部署：$ pm2 deploy ecosystem.json production setup
    // 4、执行部署运行：$ pm2 deploy ecosystem.json production
    // 5、看到 success 成功，报错看错误自行百度 
    production: {
      user: 'root',
      host: ['139.224.234.213'],
      port: '22',
      ref : 'origin/master',
      repo: 'git@github.com:bailicangdu/node-elm.git',
      path: '/root/mygit/node-elm',
      'ssh_options': 'StrictHostKeyChecking=no',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
    }
  }
};
