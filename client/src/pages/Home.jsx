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

      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-lime-100">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome to GardenNotes.me</h1>
          <div className="flex space-x-4">
            <Link to="/signin" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
            <Link to="/signup" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
          </div>
        </div>
      );


}

export default React.memo(Home);