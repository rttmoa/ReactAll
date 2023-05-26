import fetch from 'cross-fetch';
import packageJSON from '../../package.json';

export default async (resourceType, isProxy) => {
    let proxy = "";
    if (isProxy){
        proxy = packageJSON.proxy ? packageJSON.proxy : "";
    }
    let url = `${proxy}/api-v2/report/${resourceType}`;
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};