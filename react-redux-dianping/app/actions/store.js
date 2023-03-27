import * as actionTypes from '../constants/store'
// console.log(actionTypes) // {STORE_UPDATE: 'STORE_UPDATE', STORE_ADD: 'STORE_ADD', STORE_RM: 'STORE_RM', __esModule: true}





/**--- redux更新 ---**/
export function update(data) {
    return {
        type: actionTypes.STORE_UPDATE,
        data
    }
}
/**--- redux添加 ---**/
export function add(item) {
    return {
        type: actionTypes.STORE_ADD,
        data: item
    }
}
/**--- redux移除 ---**/
export function rm(item) {
    return {
        type: actionTypes.STORE_RM,
        data: item
    }
}