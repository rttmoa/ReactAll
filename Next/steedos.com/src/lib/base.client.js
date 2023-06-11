import { getAuthorization } from '@/lib/auth.client';


export const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL; // ROOT_URL:  https://console.steedos.cn



// TODO: 控制台中打印
export async function fetchAPI(api, options = { credentials: 'include' }) {
    const headers = { 'Content-Type': 'application/json' }
    const AUTHORIZATION = await getAuthorization();
    // console.log("Funtion fetchAPI() {} 获取权限")
    if (AUTHORIZATION) { headers['Authorization'] = AUTHORIZATION }
    else { throw new Error(401) }
    options.headers = Object.assign({}, headers, options.headers);


    // console.log("获取fetchAPI数据", await fetch(`${ROOT_URL}${api}`, options))
    const res = await fetch(`${ROOT_URL}${api}`, options)
    if(res.status === 401){ throw new Error(401) }
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API')
    }
    // console.log("base.client.js fetchAPI数据结果")
    return json
}

export function getFileSrc(fileId){
    return `${ROOT_URL}/api/files/files/${fileId}`;
}

export function getImageSrc(fileId){
    return `${ROOT_URL}/api/files/images/${fileId}`;
}
