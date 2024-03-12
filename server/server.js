const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

dotenv.config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Middleware to verify Supabase authentication token
const verifySupabaseToken = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }
  
    try {
      // Verify and decode the token using Supabase
      const { data, error } = await supabase.auth.api.getUser(token.replace('Bearer ', ''));
  
      if (error || !data) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
      }
  
      // Store user information in the request for further use if needed
      req.user = data;
      next();
    } catch (error) {
      console.error('Error verifying Supabase token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

/* Weather Functions and API */
const fetchJSON = async (url) => {
    const response = await fetch(url);
    return await response.json();
  };

const getCoordinates = (locationJson) => {
  for (let i = 0; i < locationJson.length; i++) {
    if (locationJson[i].display_name.includes("United States")) {
      return {
        latitude: Math.round(locationJson[i].lat * 10000) / 10000,
        longitude: Math.round(locationJson[i].lon * 10000) / 10000,
      };
    }
  }
  return null;
};

const getWeatherData = async (latitude, longitude) => {
  const weatherData = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  const weatherDataJson = await weatherData.json();
  const weatherForecast = await fetch(weatherDataJson.properties.forecast);
  const weatherForecastJson = await weatherForecast.json();
  return weatherForecastJson.properties.periods;
};

app.get('/weather/:zip', async (req, res) => {
    try {
        const zipCode = req.params.zip;
        const locationResponse = await fetchJSON(`https://geocode.maps.co/search?q=${zipCode}&api_key=658b4b5356c79640180577zjhde4e6a`);
        const coordinates = getCoordinates(locationResponse);
        const latitude = coordinates?.latitude;
        const longitude = coordinates?.longitude;
        const weatherRes = await getWeatherData(latitude, longitude);
    
        res.json({ weather: weatherRes });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });

/**
 * let zip_code = req.params.zip;
    let zip_code_location = await fetch("https://geocode.maps.co/search?q=" + zip_code +"&api_key=658b4b5356c79640180577zjhde4e6a")
    let zip_code_location_json = await zip_code_location.json();
    let latitude_cord = () => {
        for(let i=0; i<zip_code_location_json.length; i++){
            if(zip_code_location_json[i].display_name.includes("United States")){
                return(Math.round(zip_code_location_json[i].lat*10000)/10000)
            }
        }
    }
    let longitude_cord = () => {
        for(let i=0; i<zip_code_location_json.length; i++){
            if(zip_code_location_json[i].display_name.includes("United States")){
                return(Math.round(zip_code_location_json[i].lon*10000)/10000)
            }
        }
    }
    let get_weather_data = await fetch("https://api.weather.gov/points/" + latitude_cord() + "," + longitude_cord())
    let weather_data_json = await get_weather_data.json()
    let get_weather_forecast = await fetch(weather_data_json.properties.forecast)
    let weather_forecast_json = await get_weather_forecast.json()
    let weather_res = await weather_forecast_json.properties.periods;
       
    res.json({weather: weather_res})  
 */