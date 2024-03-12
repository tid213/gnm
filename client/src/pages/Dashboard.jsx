import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Dashboard ({session}) {

    const [weatherForecast, setWeatherForecast] = useState();

    useEffect(() => {
      fetchData()
    }, []);
    
    const fetchData = async () => {
        try {
          const token = session.access_token; // Replace with your actual Supabase authentication token
      
          const response = await fetch('http://localhost:8000/weather/85296', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            setWeatherForecast(data.weather)
            console.log('Data from protected route:', data);
          } else {
            console.error('Request failed:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      // Call the function to fetch data with the Supabase authentication token
      //fetchData();
      

    console.log(session)
    return(
        <div>
            <h1>Signed In</h1>
            {weatherForecast?.map(function(weather){
                return(
                    <div key={weather.number}>
                        <p>{weather.name}</p>
                        <p>{weather.temperature}</p>
                    </div>
                )
            })}
            <div onClick={() => supabase.auth.signOut()}><p>Sign out</p></div>
        </div>
    )
}

export default React.memo(Dashboard);