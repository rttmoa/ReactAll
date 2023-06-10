import React from 'react';
import styled from 'styled-components'
import { Provider } from 'react-redux';
import store from '../stores/configureStore';
import Bootstrap from '../components/bootstrap'
import { HeaderProfile } from '../components';

export default {
    title: 'HeaderProfile__Test',
};
const Container = styled.div`
  float: right;
  margin: 2rem;
  margin-right: 200px;
  clear: both;
`;

const avatarURL = "https://lmg.jj20.com/up/allimg/tx19/51031931172071.jpg";
const logoutAccountClick = ()=>{
    console.log('logoutAccount click...');
}
const settingsAccountClick= ()=>{
    console.log('settingsAccount click...');
}
const footerClick = (url)=>{
    console.log(url) // https://www.steedos.com/help/download
    console.log(!!window.Steedos) // false
    // return
    if(window.Steedos){
        window.Steedos.openWindow(url);
    }else{
        const target = "_blank";
        const options = 'scrollbars=yes,EnableViewPortScale=yes,toolbarposition=top,transitionstyle=fliphorizontal,menubar=yes,closebuttoncaption=  x  '
        window.open(url, target, options);   //  TODO: 跳转另一个窗口
    }
}
const footers = [
    {label: "帮助文档", onClick: function(){return footerClick("https://www.steedos.com/help")}},
    {label: "下载客户端", onClick: function(){return footerClick("https://www.steedos.com/help/download")}},
    {label: "关于", onClick: function(){footerClick("https://www.steedos.com")}},
    {label: "test", onClick: function(){footerClick("https://baidu.com")}},
]

export const MyHeaderProfile = () => (
    <Provider store={store}>
        <Bootstrap>
            <Container>
                <HeaderProfile avatarURL={avatarURL} logoutAccountClick={logoutAccountClick} settingsAccountClick={settingsAccountClick} footers={footers}/>
            </Container>
        </Bootstrap>
    </Provider>
);