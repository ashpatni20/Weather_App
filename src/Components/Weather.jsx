import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

const Weather = () => {
    const [tempData, setTempData] = useState(null);
    const [weatherEntries, setWeatherEntries] = useState([]);
    const [currentCityIndex, setCurrentCityIndex] = useState(0);
    const cities = ['Las Vegas', 'London', 'Los Angeles', 'New York'];
    const [searchedCity, setSearchedCity] = useState('');
    const [searchHighlightedIndex, setSearchHighlightedIndex] = useState(null);

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`);
            const data = await response.json();

            const dataDateTime = new Date(data.date_and_time);
            const hourIn24Format = dataDateTime.getHours();
            const formattedTime = `${hourIn24Format.toString().padStart(2, '0')}`;
            
            setTempData(data);
            setWeatherEntries((prevEntries) => [
                ...prevEntries,
                {
                    city: city,
                    description: data.description || 'No data',
                    temp: data.temp_in_celsius || 'No data',
                    pressure: data.pressure_in_hPa || 'No data',
                    data_age: `${formattedTime}`
                }
            ]);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleButtonClick = () => {
        fetchWeatherData(cities[currentCityIndex]);
        setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    };

    const handleDescriptionChange = (index, value) => {
        const updatedEntries = [...weatherEntries];
        updatedEntries[index].description = value;
        setWeatherEntries(updatedEntries);
    };

    const handleDeleteEntry = (index) => {
        setWeatherEntries((prevEntries) => {
            const updatedEntries = prevEntries.filter((_, i) => i !== index);
            return updatedEntries;
        });
    };

    const handleSearch = () => {
        let index = -1;
        let i = 0;

        // Find index using a while loop
        while (i < weatherEntries.length) {
            if (weatherEntries[i].city.toLowerCase() === searchedCity.toLowerCase()) {
                index = i;
                break;
            }
            i++;
        }

        if (index !== -1) {
            // Highlight the found city
            setSearchHighlightedIndex(index);
            setTimeout(() => setSearchHighlightedIndex(null), 3000);
        } else {
            // Reset input to the default placeholder if city not found
            setSearchedCity('');
        }
    };

    const isCityHighlighted = (city) => {
        // Check if the city exists in weatherEntries
        return weatherEntries.some(entry => entry.city === city);
    };

    return (
        <div>
            <div className="header">
                <h2>Aishwarya Patni Weather App</h2>
            </div>
            <div className="container">
                <div className="left-container">
                    <button className='get-weather-button' onClick={handleButtonClick}>Get Weather</button>
                    <table>
                        <thead>
                            <tr>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.map((city) => (
                                <tr 
                                    key={city} 
                                    style={{ 
                                        backgroundColor: isCityHighlighted(city) ? 'lightgreen' : 'transparent',
                                    }}
                                >
                                    <td>{city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="right-container">
                    <div className="Search-input">
                        <input 
                            type="search" 
                            placeholder="Search city..." 
                            value={searchedCity} 
                            onChange={(e) => setSearchedCity(e.target.value)} 
                        />
                        <button onClick={handleSearch}><FaSearch /></button>
                    </div>
                    <div className="form-data">
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Description</th>
                                        <th>Temperature </th>
                                        <th>Pressure </th>
                                        <th>Data Age</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weatherEntries.length > 0 ? (
                                        weatherEntries.map((entry, index) => (
                                            <tr 
                                                key={index} 
                                                style={{ backgroundColor: searchHighlightedIndex === index ? 'yellow' : 'transparent' }}
                                            >
                                                <td>{entry.city}</td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        value={entry.description} 
                                                        onChange={(e) => handleDescriptionChange(index, e.target.value)} 
                                                    />
                                                </td>
                                                <td>{entry.temp}</td>
                                                <td>{entry.pressure}</td>
                                                <td>{entry.data_age}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteEntry(index)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className='noData'>No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
