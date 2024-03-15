import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'

function Home () {

    const handleGoogleSignIn = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
      }

    return(
        <div>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
        
    )


}

export default React.memo(Home);