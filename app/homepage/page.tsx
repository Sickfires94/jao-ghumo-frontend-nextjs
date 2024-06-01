"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHouse, faHotel, faCalendarDays, faUtensils, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './homepage.css';
import axios from 'axios';

const Homepage = () => {
    const [headerText, setHeaderText] = useState<string>('Where to?');
    const [activeItem, setActiveItem] = useState<string>('all');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [searchAll, setSearchAll] = useState<string>('');
    const [hotels, setHotels] = useState({ name: '', checkIn: '', checkOut: '' });
    const [flights, setFlights] = useState({ from: '', to: '', departure: '' });
    const [activities, setActivities] = useState({ name: '', location: '', priceRange: '', rating: '' });
    const [restaurants, setRestaurants] = useState({ name: '', location: '', priceRange: '', rating: '' });

    const handleHeaderText = (htext: string, item: string) => () => {
        setHeaderText(htext);
        setActiveItem(item);
    };

    const searchHotels = async () => {
        try {
            const params = { country_name: hotels.name };
            const response = await axios.post('http://localhost:3001/hotels/filter', { params });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching hotel search results:', error);
        }
    };

    const searchFlights = async () => {
        try {
            const params = {
                departure_airport: flights.from,
                arrival_airport: flights.to,
                departure_date: flights.departure,
            };
            const response = await axios.post('http://localhost:3001/flights/search/route', { params });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching flight search results:', error);
        }
    };

    const searchActivities = async () => {
        try {
            const params = {
                name: activities.name,
                location: activities.location,
                priceRange: activities.priceRange,
                rating: activities.rating,
            };
            const response = await axios.post('http://localhost:3001/attractions/filter', { params });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching activity search results:', error);
        }
    };

    const searchRestaurants = async () => {
        try {
            const params = {
                name: restaurants.name,
                location: restaurants.location,
                priceRange: restaurants.priceRange,
                rating: restaurants.rating,
                type: 'restaurant',
            };
            const response = await axios.post('http://localhost:3001/attractions/filter', { params });
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

    return (
        <div>
            <div className='header my-4'>{headerText}</div>
            <div className='items'>
                <div className='item mx-4' onClick={handleHeaderText('Where to?', 'all')}>
                    <FontAwesomeIcon icon={faHouse} className="mx-2" />
                    Search All
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Stay somewhere great', 'hotels')}>
                    <FontAwesomeIcon icon={faHotel} className="mx-2" />
                    Hotels
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Find a flight', 'flights')}>
                    <FontAwesomeIcon icon={faPlane} className="mx-2" />
                    Flights
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Do something fun', 'activities')}>
                    <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
                    Things to do
                </div>
                <div className='item mx-4' onClick={handleHeaderText('Find places to eat', 'restaurants')}>
                    <FontAwesomeIcon icon={faUtensils} className="mx-2" />
                    Restaurants
                </div>
            </div>
            <div className='search-bar my-4'>
                {activeItem === 'all' && (
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
                )}
                {activeItem === 'hotels' && (
                    <div>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Hotel name or destination"
                            value={hotels.name}
                            onChange={(e) => setHotels({ ...hotels, name: e.target.value })}
                        />
                        <h1>Check-in date</h1>
                        <input
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
                        <h1>Departure date</h1>
                        <input
                            type="date"
                            className="search-input"
                            placeholder="Departure date"
                            value={flights.departure}
                            onChange={(e) => setFlights({ ...flights, departure: e.target.value })}
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
                            placeholder="Name"
                            value={activities.name}
                            onChange={(e) => setActivities({ ...activities, name: e.target.value })}
                        />
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
                            value={activities.rating}
                            onChange={(e) => setActivities({ ...activities, rating: e.target.value })}
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
                            placeholder="Restaurant name or destination"
                            value={restaurants.name}
                            onChange={(e) => setRestaurants({ ...restaurants, name: e.target.value })}
                        />
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
                            value={restaurants.rating}
                            onChange={(e) => setRestaurants({ ...restaurants, rating: e.target.value })}
                        />
                        <button className='search-button' onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                )}
                
            </div>
            <div className="search-results">
                {searchResults.map((result, index) => (
                    <div key={index} className="search-result-item">
                        <h3>{result.name}</h3>
                        <p>{result.city}, {result.country}</p>
                        <p>Rating: {result.rating}</p>
                        <p>Price: {result.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default Homepage