import React from 'react'

interface Airport {
    id: number;
    country: string;
    city: string;
}


const AirportCard = async () => {
    const res = await fetch('http://localhost:3000/airports/get/all',
        { method: 'POST' }
    )
    const airports: Airport[] = await res.json();

    return (
        <main>
            <>
                <h1>Airports</h1>
                <ul>
                    {airports.map(airport => <li key={airport.id}> {airport.city}</li>)}
                </ul>
            </>
        </main>
    )
}

export default AirportCard  