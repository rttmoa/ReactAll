const fetch = require('node-fetch');
const data = {};
const etags = {};



export default (url: any = null, options: any = { headers: {} }) => {
    url = url || options.url;  

    if (options.method === 'GET' || !options.method) {
        const etag = etags[url];
        const cachedResponse = data[`${url}${etag}`]; // ensure etag is for url
        if (etag) {
            options.headers['If-None-Match'] = etag;
        }

        return fetch(url, options).then((response) => {
            if (response.status === 304) {
                return cachedResponse.clone();
            }

            if (response.status === 200) {
                const responseEtag = response.headers.get('Etag');

                if (responseEtag) {
                    data[`${url}${responseEtag}`] = response.clone();
                    etags[url] = responseEtag;
                }
            }

            return response;
        });
    }

    // 所有其他请求都直接获取
    return Reflect.apply(fetch, undefined, [url, options]);  
};
