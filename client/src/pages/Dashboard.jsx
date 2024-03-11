import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Dashboard ({session}) {

    const [weatherForecast, setWeatherForecast] = useState();

    useEffect(() => {
      fetch("http://localhost:8000/weather/85296")
        .then((res) => res.json())
        .then((data) => setWeatherForecast(data.weather));
    }, []);

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