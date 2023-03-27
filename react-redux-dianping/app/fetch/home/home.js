import { get } from '../get'

export function getAdData() {
    const result = get('/api/homead')
    return result
}

export function getListData(city, page) {
    // api请求地址： /api/homelist/%E5%A4%A9%E6%B4%A5/0
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page) // const result: Promise<Response>
    return result
}