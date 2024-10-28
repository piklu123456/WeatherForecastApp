import React, { useEffect, useState } from 'react';
import './CSS/style.css';
import clouds from '../Images/clouds.png'
import haze from '../Images/haze.png'
import rain from '../Images/rain.png'
import smoke from '../Images/smoke.jpeg'
import thunderstorm from '../Images/thunderstorm.png'
import clear from '../Images/clear.png'
import mist from '../Images/mist.png'
import snow from '../Images/snow.png'
import fog from '../Images/fog.jpeg'

const apiKey = "046c0a28564163c8b8c667d765076c8b";

const WeatherComponent = () => {
    const [city, setCity] = useState("Kolkata");
    const [search, setSearch] = useState("Mumbai");
    const [weather, setWeather] = useState("");
    const [condition, setCondition] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apiKey}`
            const response = await fetch(url);
            const responseJson = await response.json();
            console.log(responseJson)
            setCity(responseJson.main)
            setWeather(responseJson);
            setCondition(responseJson.weather[0]?.main);
            console.log(condition);
        }
        fetchAPI();
    }, [search])
    return (
        <div className='App'>
            <h1 style={{ color: "red", backgroundColor: "white" }}>Weather Forecast Application</h1>
            <div className='box'>
                <div className='inputData'>
                    <input type='search' className='inputField' value={search}
                        onChange={(event) => { setSearch(event.target.value) }} placeholder='Enter Location' />
                </div>
            </div>
            {
                !city ? <p className='errorMsg'>No Data Found</p> :
                    (<div className='info'>
                        <h2 className='location'>
                            <i className="fa-solid fa-street-view"></i>&nbsp;&nbsp;
                            {search}
                        </h2>
                        <h1 className="temp">{city.temp}&nbsp;<sup>o</sup>&nbsp;C</h1>
                        <h3 className='tempmin_max'>Min : {city.temp_min}&nbsp;<sup>o</sup>&nbsp;C <br /> Max : {city.temp_max} &nbsp;<sup>o</sup>&nbsp;C</h3>
                        <h3 className='pressure'>Pressure : {city?.pressure} &nbsp; millibars</h3>
                        <h3 className='wind'>Wind Speed : {weather?.wind?.speed} &nbsp; Km/h</h3>
                        {
                            (() => {
                                switch (condition) {
                                    case "Clouds": return <div><h3>Cloudy Weather</h3>
                                        <img src={clouds} alt="pic" /></div>
                                        break;
                                    case "Smoke": return <div><h3>Smoky Weather</h3>
                                        <img src={smoke} alt="pic" /></div>
                                        break;
                                    case "Rain": return <div><h3>Rainy Weather</h3>
                                        <img src={rain} alt="pic" /></div>
                                        break;
                                    case "Haze": return <div><h3>Hazy Weather</h3>
                                        <img src={haze} alt="pic" /></div>
                                        break;
                                    case "Thunderstorm": return <div><h3>Thunderstorm Weather</h3>
                                        <img src={thunderstorm} alt="pic" /></div>
                                        break;
                                    case "Clear": return <div><h3>Clear Weather</h3>
                                        <img src={clear} alt="pic" /></div>
                                        break;
                                    case "Mist": return <div><h3>Misty Weather</h3>
                                        <img src={mist} alt="pic" /></div>
                                        break;
                                    case "Snow": return <div><h3>Snowy Weather</h3>
                                        <img src={snow} alt="pic" /></div>
                                        break;
                                    case "Fog": return <div><h3>Foggy Weather</h3>
                                        <img src={fog} alt="pic" /></div>
                                        break;
                                    default: return <div><h3>Unknown Weather</h3></div>
                                        break;
                                }
                            })()
                        }
                    </div>)

            }
        </div>
    )
}
export default WeatherComponent;

