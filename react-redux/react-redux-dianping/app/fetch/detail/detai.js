import { get } from '../get'






export function getInfoData(id) {
   const result = get('/api/detail/info/' + id)    //-->    /api/detail/info/5934707649654805
   return result
}


export function getCommentData(page, id) {
    // console.log('/api/detail/comment/' + page + '/' + id)
    const result = get('/api/detail/comment/' + page + '/' + id)   //-->    /api/detail/comment/1/5889520870693865
    return result
}