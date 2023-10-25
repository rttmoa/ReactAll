import React, { useState, useEffect } from 'react';
import { List, Button } from 'antd-mobile';
import { history } from 'umi';
import { useStoreHook } from 'think-react-store';
import { ErrorBoundary } from '@/components';
import './index.less';




// 路由跳转带参数 history
// 错误边界组件 ErrorBoundary
export default function (props) {
  const { user: { username, avatar, phone, sign, getUserAsync, logoutAsync }, } = useStoreHook();



  /***--- 初始 - 获取用户信息 ---**/
  useEffect(() => {
    getUserAsync({ id: 10 });
  }, []);

  // 编辑用户 + history 跳转地址
  const handleClick = () => { // http://localhost:8000/#/user/edit?id=10
    history.push({
      pathname: '/user/edit',
      query: {
        id: 10
      },
    });
  };

  /***--- 退出 ---**/
  const handleLogout = () => {
    logoutAsync();
  };

  return (
    <ErrorBoundary>
      <div className="user-page">
        {/**用户信息 */}
        <div className="info">
          <div className="set" onClick={handleClick}>设置</div>
          <div className="user">
            <img
              alt="user"
              src={avatar || require('../../assets/yay.jpg')}
              // onError="javascript:alert('xss')"
            />
            <div className="tel">{phone}</div>
            <div className="sign">{sign}</div>
          </div>
        </div>

        {/**列表 */}
        <div className="lists">
          <List>
            <List.Item arrow="horizontal" onClick={() => alert("<List.Item /> 待实现")}>用户协议</List.Item>
            <List.Item arrow="horizontal" onClick={() => alert("<List.Item /> 待实现")}>常见问题</List.Item>
            <List.Item arrow="horizontal" onClick={() => alert("<List.Item /> 待实现")}>联系客服</List.Item>
          </List>
        </div>

        <Button style={{ marginTop: '100px' }} onClick={handleLogout}>
          退出登录
        </Button>
      </div>
    </ErrorBoundary>
  );
}
