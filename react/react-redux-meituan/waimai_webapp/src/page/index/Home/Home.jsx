import React from 'react';
import Header from './Header/Header.jsx';
import Category from './Category/Category.jsx';
import ContentList from './ContentList/ContentList.jsx';


 
 
export default function Home () {
    return (
        <div>
            {/* 头部 */}
            <Header />
            {/* 外卖类别 */}
            <Category />
            {/* 附近商家列表 */}
            <ContentList />
        </div>
    );
}