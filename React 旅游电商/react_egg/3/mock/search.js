export default {
  'GET /api/getLists': {
    lists: ['a', 'b', 'c']
  },
  'GET /api/getListsAsync': (req, res)=>{
    console.log(req)
    setTimeout(() => {
      res.json({
        status: 200,
        data: Array(10).fill(req.query.value)
        // status: 500,
        // errMsg: 'test err'
      })
    }, 1000);
    
  }
}