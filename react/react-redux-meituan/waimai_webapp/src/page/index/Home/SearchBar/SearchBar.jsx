import './SearchBar.scss';
import React from 'react';

 



export default function SearchBar() {
    return (
        <div className="search-bar"> 
            <div className="bar-location">
                <div className="location-icon"></div>
                <div className="location-text">上海市</div>
            </div>
            <div className="search-btn">
                <p className="place-holder">可乐鸡翅</p>
            </div>
        </div>
    );
}