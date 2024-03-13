import React, { useState, useEffect, Profiler } from "react";
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NoteBook from "./pages/NoteBook";
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  const [session, setSession] = useState();

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
      <Router>
        <Routes>
          <Route path="/" exact element={!session ? <Home /> : <Dashboard session={session} />}/>
          <Route path="/notebook/:id" element={<NoteBook />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default React.memo(App);