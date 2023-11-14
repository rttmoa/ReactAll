import { getObject, SteedosError } from '@steedos/objectql';

const HEADER_AUTH = 'Authorization';
const AUTH_TYPE = 'Bearer';

export function isAPIKey(token) {
    return token.startsWith('apikey,')
}
// ? 操作表 api_keys 更新last_use_time字段
export async function verifyAPIKey(token) {
    if (isAPIKey(token)) {
        const apikey = token.replace('apikey,', '');
        const records = await getObject('api_keys').find({ filters: [['api_key', '=', apikey], ['active', '=', true]] });
        if (records.length > 0) {
            const record = records[0];
            await getObject('api_keys').update(record._id, { last_use_time: new Date() });
            return { userId: record.owner, spaceId: record.space };
        }
    }
}

// 获取 spaceId获取 api_key；DllZOUhBN3MvBNNWNyW647uKwVcWvEpRHLc3Jj97Ape
export async function getAPIKey(spaceId) {
    const space = await getObject('spaces').findOne(spaceId, {}); 
    if (space) {
        return space.api_key;
    }
}

// ? 表spaces | 获取 api 密钥身份验证标头; {Authorization: Bearer apikey,DllZOUhBN3MvBNNWNyW647uKwVcWvEpRHLc3Jj97Ape}
export async function getAPIKeyAuthHeader(spaceId) {
    const api_key = await getAPIKey(spaceId);
    if (!api_key) {
        throw new SteedosError('space_apikey_notfind');
    }else{
        return {[HEADER_AUTH]: `${AUTH_TYPE} apikey,${api_key}`};
    }
}