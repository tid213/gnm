import React, { useState, useEffect, Profiler } from "react";
import { Navigate } from 'react-router-dom';
import "./App.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NoteBook from "./pages/NoteBook";
import NotFoundPage from "./pages/NotFoundPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import { supabase } from './supabaseClient';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

function App() {
  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={!session ? <Home /> : <Dashboard session={session} />}/>
          <Route path="/notebook/:id" element={<NoteBook />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={ <ChangePassword session={session}/>} />
          <Route path='*' element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default React.memo(App);
