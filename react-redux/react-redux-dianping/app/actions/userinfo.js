import * as actionTypes from '../constants/userinfo'
// console.log(actionTypes) // {USERINFO_UPDATE: 'USERINFO_UPDATE', USERINFO: '测试这个USERINFO', __esModule: true}




/**--- redux更新 ---**/
export function update(data) {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}


export function User(data){
    return {
        type: actionTypes.USERINFO,
        data 
    }
}