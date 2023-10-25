// import 'whatwg-fetch'
// import 'es6-promise'


// 格式： {key1: 'val1', key2: 'val2', key3: 'val3'}
// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {// 模拟
    var result = '';
    var item;
    for (item in obj) {
        // console.log(obj) //obj是每一项{ key1: 'val1', key2: 'val2', key3: 'val3' }
        // console.log(item)//item是每一项中的key
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    // console.log(result) //&key1=val1&key2=val2&key3=val3
    if (result) {
        result = result.slice(1);
    }
    // console.log(result) //key1=val1&key2=val2&key3=val3
    return result;
}
const obj = {key1: 'val1', key2: 'val2', key3: 'val3'}
const res = obj2params(obj)
console.log('返回的结果为', res) // key1=val1&key2=val2&key3=val3


// 发送 post 请求
// export function post(url, paramsObj) {
//     var result = fetch(url, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: obj2params(paramsObj)
//     });

//     return result;
// }
