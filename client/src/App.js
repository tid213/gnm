import React, { useState, useEffect, Profiler } from "react";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="App">
      {!session ? <Home /> : <Dashboard session={session} />}
    </div>
  );
}

export default React.memo(App);
