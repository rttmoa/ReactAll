import './Header.scss';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import HeadImg from './header.png'



export default function Header() {
    return (
        <div className="header">
            <SearchBar />
            {/* <img className="banner-img" src="//xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg"/> */}
            <img className="banner-img" src={HeadImg} />
        </div>
    );
}