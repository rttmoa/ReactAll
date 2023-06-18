### **options请求的解释**

简单请求

    1. 只能是get和post请求 head

    2. 不能由自定义请求头

    3. 如果 是post请求，请求content-type 必须是 www/

  复杂请求

    复杂请求

    put delete patch

  预检请求

  复杂请求  ---> 空请求

### json-server的使用

// json-server 的使用

// 安装  yarn global add json-server

// 启动  npx json-server data.json --port 8888
