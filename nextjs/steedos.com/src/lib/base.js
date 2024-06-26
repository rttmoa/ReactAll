export const ROOT_URL = process.env.NEXT_PUBLIC_STEEDOS_ROOT_URL; // https://console.steedos.cn
export const API_KEY = process.env.STEEDOS_SERVER_API_KEY; // -2IXhhWzbwkoE1uI_Jw1oPCAiOb-8RASgGw9W3y94_GY

const GRAPHQL_API = '/graphql';


export function getAuthHeaders() {
    if (!API_KEY) { throw new Error('Please configure the environment variable STEEDOS_SERVER_API_KEY'); }
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer apikey,${API_KEY}`
    }
    return headers;
}

export async function fetchGraphql(query) {
    const headers = getAuthHeaders();
    const res = await fetch(`${ROOT_URL}${GRAPHQL_API}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: query })
    })
    // console.log(res)
    const json = await res.json();
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    // console.log("base.js fetchGraphql 数据结果")
    // console.log(json)
    return json
}
