import { ApplyCode } from './index';
const EventEmitter = require('events');
const signUpEvent = new EventEmitter();

let lastOnError = null;

// 使用场景：
// 1、手机号登陆时Button提交：http://localhost:3000/#/signup
signUpEvent.on('inputNext', async (tenant, history, location, spaceId, name, action)=>{
    try {
        if(tenant.enable_bind_mobile || tenant.enable_bind_email){
            // console.log("进入了 请求体")
            const data = await ApplyCode({
                name: name,
                action: action,
                spaceId: spaceId
            });
            console.log("ApplyCode data", data)
            // if (data.token) {
            //     history.push({
            //         pathname: `/verify/${data.token}`,
            //         search: location.search,
            //         state: { email: name.trim() }
            //     })
            // }
        }else{
            history.push({
                pathname: `/signup-password`,
                search: location.search,
                state: { email: name.trim() }
            })
        }
    } catch (error) {
        signUpEvent.emit('error', error); // emit error后，具体：error
    }
}) 

function signUpEventOnError(Func){
    if(lastOnError){
        signUpEvent.off("error", lastOnError);
    }
    signUpEvent.on("error", Func);
    lastOnError = Func;
}

export {
    signUpEvent,
    signUpEventOnError
};