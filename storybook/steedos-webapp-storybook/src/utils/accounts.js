import { getCookie } from '../utils';





export const getUserId = ()=>{
    if(window.Meteor){
        return window.Meteor.userId()   // 获取 userId
    }
    return getCookie("X-User-Id");
}

export const getAuthToken = ()=>{
    if(window.Meteor){
        return window.Accounts._storedLoginToken();   // 获取 Token
    }
    return getCookie("X-Auth-Token");
}

export const getSpaceId = ()=>{
    if(window.Meteor){
        return window.Steedos.spaceId();  // 获取 SpaceId
    }
    return getCookie("X-Space-Id");
}