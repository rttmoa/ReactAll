import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
  // console.log('GET', url) // 在这里看URL地址
  var result = fetch(url, {
      credentials: 'include',
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  });

  return result;
}
