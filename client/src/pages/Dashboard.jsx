import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Dashboard ({session}) {

    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
    
      fetch("http://localhost:8000/message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);

    console.log(session)
    return(
        <div>
            <h1>Signed In</h1>
            <p>{message}</p>
            <div onClick={() => supabase.auth.signOut()}><p>Sign out</p></div>
        </div>
    )
}

export default Dashboard;