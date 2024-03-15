import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Dashboard ({session}) {

    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState();
    const [loadingUserInfo, setLoadingUserInfo] = useState(true);
    const [plantData, setPlantData] = useState();
    const [loadingPlantData, setLoadingPlantData] = useState(true);
    const [plotData, setPlotData] = useState();
    const [loadingPlotData, setLoadingPlotData] = useState(true);
    const [noteData, setNoteData] = useState();
    const [loadingNoteData, setLoadingNoteData] = useState(true);
    const [formView, setFormView] = useState(false);

    useEffect(()=>{
        fetchUserInfo();
    }, [])

    const fetchUserInfo = async () => {
        try {
            setLoadingUserInfo(true);
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id);
    
            if (error) {
              throw error;
            }
            
            setUserInfo(data || []);
            setLoadingUserInfo(false);
          } catch (error) {
            console.error('Error fetching plants:', error.message);
            setLoadingUserInfo(false);
          }
    };

    const fetchPlantData = async () => {
        try {
            setLoadingPlantData(true);
            const { data, error } = await supabase
              .from('plants')
              .select('*')
              .eq('user_id', session.user.id);
    
            if (error) {
              throw error;
            }

            setPlantData(data || []);
            setLoadingPlantData(false);
          } catch (error) {
            console.error('Error fetching plants:', error.message);
            setLoadingPlantData(false);
          }
    };

    const fetchPlotData = async () => {
        try {
            setLoadingPlotData(true);
            const { data, error } = await supabase
              .from('plots')
              .select('*')
              .eq('user_id', session.user.id);
    
            if (error) {
              throw error;
            }

            setPlotData(data || []);
            setLoadingPlotData(false);
          } catch (error) {
            console.error('Error fetching plants:', error.message);
            setLoadingPlotData(false);
          }
    };

    const fetchNoteData = async () => {
        try {
            setLoadingNoteData(true);
            const { data, error } = await supabase
              .from('notes')
              .select('*')
              .eq('user_id', session.user.id);
    
            if (error) {
              throw error;
            }

            setNoteData(data || []);
            setLoadingNoteData(false);
          } catch (error) {
            console.error('Error fetching plants:', error.message);
            setLoadingNoteData(false);
          }
    };

    return(
        <div>
            <h1>Signed In as:</h1>
            {loadingUserInfo ? (<p>Loading...</p>):(<p>{userInfo[0].username}</p>)}
            <div onClick={() => supabase.auth.signOut()}><p>Sign out</p></div>
        </div>
    )
}

export default React.memo(Dashboard);