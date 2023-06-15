# 旅游电商项目-H5

## 前端技术

##### Skill:  `hooks、umijs、think-react-store、rc-form、project-libs、react-icons`

## 后端技术

##### Skill:  `eggJs、Sequelize、mysql、redis`


## Issue:

###### /components 复用组件下封装可复用组件

###### 一、滚动加载： [http://localhost:8000/#/search?code=10001&amp;endTime=%202023-06-16&amp;startTime=2023-06-16%20](http://localhost:8000/#/search?code=10001&endTime=%202023-06-16&startTime=2023-06-16%20)

`/Search/indexjs -> useObserverHook && useHttpHook && useEffect`

###### 二、地址栏参数发请求：

`history.push({ pathname: '/search', query: {code: selectedCity,startTime: times.split('~')[0],endTime: times.split('~')[1]}});`

`const { query } = useLocation();   获取地址栏数据:  query.code || query.endTime`
