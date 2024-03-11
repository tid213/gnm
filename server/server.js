const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const bodyParser = require("body-parser");

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get('/weather/:zip', async (req, res) => {
    let zip_code = req.params.zip;
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
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });