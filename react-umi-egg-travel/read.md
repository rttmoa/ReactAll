# 旅游电商项目

##### 前端技术

###### teck: `hooks、umijs、think-react-store`

npm: `project-libs`

##### 后端技术

`eggJs、Sequelize、mysql、redis`

**启动**： `前端：npm start &&  后端：npm run dev`

标题 + 模板字符串 +  粗体

##### quanestion:

###### 一、滚动加载： [http://localhost:8000/#/search?code=10001&amp;endTime=%202023-06-16&amp;startTime=2023-06-16%20](http://localhost:8000/#/search?code=10001&endTime=%202023-06-16&startTime=2023-06-16%20)

`/Search/indexjs -> useObserverHook && useHttpHook && useEffect`

###### 二、地址栏参数发请求：`history.push({ pathname: '/search', query: {code: selectedCity,startTime: times.split('~')[0],endTime: times.split('~')[1]}});`

const { query } = useLocation();   获取地址栏数据:  query.code || query.endTime
