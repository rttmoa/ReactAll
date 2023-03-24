import React from 'react';
import Header from './Header/Header.jsx';
import Category from './Category/Category.jsx';
import ContentList from './ContentList/ContentList.jsx';


 
 
export default function Home () {
    return (
        <div>
            <Header />
            <Category />
            <ContentList />
        </div>
    );
}