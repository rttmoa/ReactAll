const domain = 'https://enigmatic-island-47099.herokuapp.com'; 

const interfaces = {
  // 返回的首页请求的json数据
  homepage: domain + '/api/profiles/homepage',
  
  // 返回的商品的json数据
  productions: domain + '/api/profiles/productions',
  
  // 返回的商品列表的json数据
  productionsList: domain + '/api/profiles/productionsList',

  // 返回的商品详情的json数据
  productionDetail: domain + '/api/profiles/productionDetail'
}

module.exports = interfaces;