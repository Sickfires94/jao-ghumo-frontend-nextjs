"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHotel, faCalendarDays, faUtensils, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Homepage.css';

const Homepage: React.FC = () => {
    const [headerText, setHeaderText] = useState<string>('Where to?');
    const [searchText, setSearchText] = useState<string>('Places to go, things to do, hotels...');

    const handleHeaderText = (htext: string, stext: string) => () => {
        setHeaderText(htext);
        setSearchText(stext);
    };

    return (
        <div>
            <div className='header my-4'>{headerText}</div>
            <div className='items'>
                <div className='item mx-4' onClick={handleHeaderText('Where to?', 'Places to go, things to do, hotels...')}>
                    <FontAwesomeIcon icon={faHouse} className="mx-2" />
                    Search All
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Stay somewhere great', 'Hotel name or destination')}>
                    <FontAwesomeIcon icon={faHotel} className="mx-2" />
                    Hotels
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Do something fun', 'Activity, attraction or destination')}>
                    <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
                    Things to do
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Find places to eat', 'Restaurant name or destination')}>
                    <FontAwesomeIcon icon={faUtensils} className="mx-2" />
                    Restaurants
                </div>
            </div>
            <div className='search-bar my-4'>
                <input type="text" className="search-input" placeholder={searchText} />
                <button className='search-button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
};

export default Homepage;
