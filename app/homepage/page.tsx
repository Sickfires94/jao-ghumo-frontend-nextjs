"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHouse, faHotel, faCalendarDays, faUtensils } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FlightCard from '../cards/flight';
import HotelCard from '../cards/hotel';
import { Grid } from '@mui/material';
import AttractionCard from '../cards/attraction';
import hotelBg from '../img/hotel.jpg';
import attractionBg from '../img/attraction-bg.jpg';
import flightBg from '../img/flight-bg.jpg';
import restaurantBg from '../img/restaurant-bg.jpg';
import './homepage.css';

const Homepage = () => {
    const [headerText, setHeaderText] = useState<string>('Where to?');
    const [activeItem, setActiveItem] = useState<string>('all');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [searchAll, setSearchAll] = useState<string>('');
    const [hotels, setHotels] = useState({ name: '', checkIn: '', checkOut: '' });
    const [flights, setFlights] = useState({ from: '', to: '' });
    const [activities, setActivities] = useState({ location: '', priceRange: '', rating_min: '' });
    const [restaurants, setRestaurants] = useState({ location: '', priceRange: '', rating_min: '' });

    const handleHeaderText = (htext: string, item: string) => () => {
        setHeaderText(htext);
        setActiveItem(item);
        setSearchResults([]);
        setSearchAll('');
        setHotels({ name: '', checkIn: '', checkOut: '' });
        setFlights({ from: '', to: '' });
        setActivities({ location: '', priceRange: '', rating_min: '' });
        setRestaurants({ location: '', priceRange: '', rating_min: '' });
    };

    const searchHotels = async () => {
        try {
            const params = {
                hotel_name: hotels.name,
            };
            const queryString = new URLSearchParams(params).toString();
            const response = await axios.post(`http://localhost:3000/hotels/filter?${queryString}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching hotel search results:', error);
        }
    };

    const searchFlights = async () => {
        try {
            const body = {
                departure_airport: flights.from,
                arrival_airport: flights.to,
            };
            const response = await axios.post('http://localhost:3000/flights/search/route', body);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching flight search results:', error);
        }
    };

    const searchActivities = async () => {
        try {
            const params = {
                city: activities.location,
                priceRange: activities.priceRange,
                rating_min: activities.rating_min,
            };
            const response = await axios.post('http://localhost:3000/attractions/filter', { params });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching activity search results:', error);
        }
    };

    const searchRestaurants = async () => {
        try {
            const params = {
                city: restaurants.location,
                priceRange: restaurants.priceRange,
                rating_min: restaurants.rating_min,
                type: 'restaurant',
            };
            const response = await axios.post('http://localhost:3000/attractions/filter', { params });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching restaurant search results:', error);
        }
    };

    const handleSearch = async () => {
        if (activeItem === 'hotels') {
            await searchHotels();
        } else if (activeItem === 'flights') {
            await searchFlights();
        } else if (activeItem === 'activities') {
            await searchActivities();
        } else if (activeItem === 'restaurants') {
            await searchRestaurants();
        }
    };

    const getBackgroundImage = () => {
        if (activeItem === 'hotels') {
            return hotelBg.src;
        } else if (activeItem === 'flights') {
            return flightBg.src;
        } else if (activeItem === 'activities') {
            return attractionBg.src;
        } else if (activeItem === 'restaurants') {
            return restaurantBg.src;
        } else {
            return '';
        }
    };

    return (
        <div style={{ backgroundImage: `url(${getBackgroundImage()})`, backgroundSize: 'cover', height: '30rem', backgroundPosition: 'center'}}>
            <div className='header my-4'>{headerText}</div>
            <div className='items'>
                {/* <div className={`item mx-4 ${activeItem === 'all' ? 'active' : ''}`} onClick={handleHeaderText('Where to?', 'all')}>
                    <FontAwesomeIcon icon={faHouse} className="mx-2" />
                    Search All
                </div> */}
                <div className={`item mx-4 ${activeItem === 'hotels' ? 'active' : ''}`} onClick={handleHeaderText('Stay somewhere great', 'hotels')}>
                    <FontAwesomeIcon icon={faHotel} className="mx-2" />
                    Hotels
                </div>
                <div className={`item mx-4 ${activeItem === 'flights' ? 'active' : ''}`} onClick={handleHeaderText('Find a flight', 'flights')}>
                    <FontAwesomeIcon icon={faPlane} className="mx-2" />
                    Flights
                </div>
                <div className={`item mx-4 ${activeItem === 'activities' ? 'active' : ''}`} onClick={handleHeaderText('Do something fun', 'activities')}>
                    <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
                    Things to do
                </div>
                <div className={`item mx-4 ${activeItem === 'restaurants' ? 'active' : ''}`} onClick={handleHeaderText('Find places to eat', 'restaurants')}>
                    <FontAwesomeIcon icon={faUtensils} className="mx-2" />
                    Restaurants
                </div>
            </div>
            <div className='search-bar'>
                {/* {activeItem === 'all' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Places to go, things to do, hotels..."
                            value={searchAll}
                            onChange={(e) => setSearchAll(e.target.value)}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )} */}
                {activeItem === 'hotels' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Hotel name or destination"
                            value={hotels.name}
                            onChange={(e) => setHotels({ ...hotels, name: e.target.value })}
                        />
                        <label htmlFor="checkIn">Check-in date</label>
                        <input
                            id="checkIn"
                            type="date"
                            className="search-input"
                            placeholder="Check-in date"
                            value={hotels.checkIn}
                            onChange={(e) => setHotels({ ...hotels, checkIn: e.target.value })}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
                {activeItem === 'flights' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="From (airport or city)"
                            value={flights.from}
                            onChange={(e) => setFlights({ ...flights, from: e.target.value })}
                        />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="To (airport or city)"
                            value={flights.to}
                            onChange={(e) => setFlights({ ...flights, to: e.target.value })}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
                {activeItem === 'activities' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="City or Country"
                            value={activities.location}
                            onChange={(e) => setActivities({ ...activities, location: e.target.value })}
                        />
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Price Range"
                            value={activities.priceRange}
                            onChange={(e) => setActivities({ ...activities, priceRange: e.target.value })}
                        />
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Min Rating"
                            value={activities.rating_min}
                            onChange={(e) => setActivities({ ...activities, rating_min: e.target.value })}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
                {activeItem === 'restaurants' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="City or Country"
                            value={restaurants.location}
                            onChange={(e) => setRestaurants({ ...restaurants, location: e.target.value })}
                        />
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Price Range"
                            value={restaurants.priceRange}
                            onChange={(e) => setRestaurants({ ...restaurants, priceRange: e.target.value })}
                        />
                        <input
                            type="number"
                            className="search-input"
                            placeholder="Min Rating"
                            value={restaurants.rating_min}
                            onChange={(e) => setRestaurants({ ...restaurants, rating_min: e.target.value })}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
            </div>
            <div className="search-results">
                <Grid container spacing={2}>
                    {searchResults.map((result, index) => (
                        activeItem === 'flights' ? (
                            <FlightCard key={index} flight={result} />
                        ) : activeItem === 'hotels' ? (
                            <HotelCard key={index} hotel={result} />
                        ) : (activeItem === 'activities' && (result.type === 'amusement park' || result.type === 'attraction') || activeItem === 'restaurants' && result.type === 'restaurant') ? (
                            <AttractionCard key={index} attraction={result} />
                        ) : null
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Homepage;
