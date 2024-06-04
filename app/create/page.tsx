"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHouse, faHotel, faCalendarDays, faUtensils, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './create.css';
import ButtonAppBar from '../components/Navbar'
import axios from 'axios';
import { getCookie } from 'typescript-cookie'; // Ensure you have installed 'typescript-cookie'


const Create = () => {
    const [headerText, setHeaderText] = useState<string>('What would you like to create?');
    const [activeItem, setActiveItem] = useState<string>('all');
    const [createResults, setCreateResults] = useState<any[]>([]);

    const [hotels, setHotels] = useState({ hotel_name: '', continent: '', country_name: '', city_name: '', no_rooms: '', price: '', facilities: '', days_available: '' });
    const [flights, setFlights] = useState({ plane_id: '', departure_airport: '', arrival_airport: '', departure_time: '', arrival_time: '', seats_total: '', ticket_price: '' });
    const [activities, setActivities] = useState({ name: '', city: '', state: '', type: '', country: '', description: '', phone: '', address: '', website: '', position: '', features: '', timeOpen: '', priceRange: '' });
    const [airports, setAirports] = useState({ id: '', country: '', city: '' });

    const handleHeaderText = (htext: string, item: string) => () => {
        setHeaderText(htext);
        setActiveItem(item);
    };

    const createHotel = async () => {
        try {
            const token = getCookie('token');
            const body = {
                ...hotels,
            };
            const response = await axios.post('http://localhost:3000/hotels/create', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCreateResults([response.data]);
        } catch (error) {
            console.error('Error creating hotel:', error);
        }
    };
    

    const createFlight = async () => {
        try {
            const token = getCookie('token');
            const body = {
                ...flights,
            };
            const response = await axios.post('http://localhost:3000/flights/create', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCreateResults([response.data]);
        } catch (error) {
            console.error('Error creating flight:', error);
        }
    };
    

    const createActivity = async () => {
        try {
            const token = getCookie('token');
            const body = {
                ...activities,
            };
            const response = await axios.post('http://localhost:3000/attractions/create', body, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCreateResults([response.data]);
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

const createAirport = async () => {
    try {
        const token = getCookie('token');
        const body = {
            ...airports,
        };
        const response = await axios.post('http://localhost:3000/airports/create', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCreateResults([response.data]);
    } catch (error) {
        console.error('Error creating airport:', error);
    }
};

    const handleCreate = async () => {
        if (activeItem === 'hotels') {
            await createHotel();
        } else if (activeItem === 'flights') {
            await createFlight();
        } else if (activeItem === 'activities') {
            await createActivity();
        } else if (activeItem === 'airports') {
            await createAirport();
        }
    };

    return (
        
        <>
        <ButtonAppBar/>
        <div>
            <div className='header my-4'>{headerText}</div>
            <div className='items'>
                <div className={`item mx-4 ${activeItem === 'hotels' ? 'active' : ''}`} onClick={handleHeaderText('Create a hotel', 'hotels')}>
                    <FontAwesomeIcon icon={faHotel} className="mx-2" />
                    Hotels
                </div>
                <div className={`item mx-4 ${activeItem === 'flights' ? 'active' : ''}`} onClick={handleHeaderText('Create a flight', 'flights')}>
                    <FontAwesomeIcon icon={faPlane} className="mx-2" />
                    Flights
                </div>
                <div className={`item mx-4 ${activeItem === 'activities' ? 'active' : ''}`} onClick={handleHeaderText('Create an activity', 'activities')}>
                    <FontAwesomeIcon icon={faCalendarDays} className="mx-2" />
                    Activities
                </div>
                <div className={`item mx-4 ${activeItem === 'airports' ? 'active' : ''}`} onClick={handleHeaderText('Create an airport', 'airports')}>
                    <FontAwesomeIcon icon={faHouse} className="mx-2" />
                    Airports
                </div>
            </div>
            <div className='creation-form'>
                {activeItem === 'hotels' && (
                    <div>
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Hotel name"
                            value={hotels.hotel_name}
                            onChange={(e) => setHotels({ ...hotels, hotel_name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Continent"
                            value={hotels.continent}
                            onChange={(e) => setHotels({ ...hotels, continent: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Country"
                            value={hotels.country_name}
                            onChange={(e) => setHotels({ ...hotels, country_name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="City"
                            value={hotels.city_name}
                            onChange={(e) => setHotels({ ...hotels, city_name: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Number of rooms"
                            value={hotels.no_rooms}
                            onChange={(e) => setHotels({ ...hotels, no_rooms: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Price per night"
                            value={hotels.price}
                            onChange={(e) => setHotels({ ...hotels, price: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Facilities"
                            value={hotels.facilities}
                            onChange={(e) => setHotels({ ...hotels, facilities: e.target.value })}
                        />
                        <input
                            type="date"
                            className="creation-input"
                            placeholder="Days available"
                            value={hotels.days_available}
                            onChange={(e) => setHotels({ ...hotels, days_available: e.target.value })}
                        />
                        <button className='creation-button' onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                )}
                {activeItem === 'flights' && (
                    <div>
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Plane ID"
                            value={flights.plane_id}
                            onChange={(e) => setFlights({ ...flights, plane_id: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Departure airport"
                            value={flights.departure_airport}
                            onChange={(e) => setFlights({ ...flights, departure_airport: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Arrival airport"
                            value={flights.arrival_airport}
                            onChange={(e) => setFlights({ ...flights, arrival_airport: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            className="creation-input"
                            placeholder="Departure time"
                            value={flights.departure_time}
                            onChange={(e) => setFlights({ ...flights, departure_time: e.target.value })}
                        />
                        <input
                            type="datetime-local"
                            className="creation-input"
                            placeholder="Arrival time"
                            value={flights.arrival_time}
                            onChange={(e) => setFlights({ ...flights, arrival_time: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Total seats"
                            value={flights.seats_total}
                            onChange={(e) => setFlights({ ...flights, seats_total: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Ticket price"
                            value={flights.ticket_price}
                            onChange={(e) => setFlights({ ...flights, ticket_price: e.target.value })}
                        />
                        <button className='creation-button' onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                )}
                {activeItem === 'activities' && (
                    <div>
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Name"
                            value={activities.name}
                            onChange={(e) => setActivities({ ...activities, name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="City"
                            value={activities.city}
                            onChange={(e) => setActivities({ ...activities, city: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="State"
                            value={activities.state}
                            onChange={(e) => setActivities({ ...activities, state: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Type"
                            value={activities.type}
                            onChange={(e) => setActivities({ ...activities, type: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Country"
                            value={activities.country}
                            onChange={(e) => setActivities({ ...activities, country: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Description"
                            value={activities.description}
                            onChange={(e) => setActivities({ ...activities, description: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Phone"
                            value={activities.phone}
                            onChange={(e) => setActivities({ ...activities, phone: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Address"
                            value={activities.address}
                            onChange={(e) => setActivities({ ...activities, address: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Website"
                            value={activities.website}
                            onChange={(e) => setActivities({ ...activities, website: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Position"
                            value={activities.position}
                            onChange={(e) => setActivities({ ...activities, position: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Features"
                            value={activities.features}
                            onChange={(e) => setActivities({ ...activities, features: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Time open"
                            value={activities.timeOpen}
                            onChange={(e) => setActivities({ ...activities, timeOpen: e.target.value })}
                        />
                        <input
                            type="number"
                            className="creation-input"
                            placeholder="Price range"
                            value={activities.priceRange}
                            onChange={(e) => setActivities({ ...activities, priceRange: e.target.value })}
                        />
                        <button className='creation-button' onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                )}
                {activeItem === 'airports' && (
                    <div>
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Airport ID"
                            value={airports.id}
                            onChange={(e) => setAirports({ ...airports, id: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="Country"
                            value={airports.country}
                            onChange={(e) => setAirports({ ...airports, country: e.target.value })}
                        />
                        <input
                            type="text"
                            className="creation-input"
                            placeholder="City"
                            value={airports.city}
                            onChange={(e) => setAirports({ ...airports, city: e.target.value })}
                        />
                        <button className='creation-button' onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                )}
            </div>
            <div className="creation-results">
                {createResults.map((result, index) => (
                    <div key={index} className="creation-result-item">
                        <h3>{result.name || result.hotel_name || result.flight_id || result.id}</h3>
                        {result.city && <p>{result.city}, {result.country}</p>}
                        {result.rating && <p>Rating: {result.rating}</p>}
                        {result.price && <p>Price: {result.price}</p>}
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Create;
