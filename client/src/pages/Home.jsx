import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Home () {

    const googleSignIn = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        })
      }

    return(
        <div onClick={googleSignIn}><p>Sign in</p></div>
    )


}

export default React.memo(Home);