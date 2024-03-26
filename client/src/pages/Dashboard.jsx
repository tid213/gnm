import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'
import AccountForm from "../components/AccountForm";
import PlantForm from "../components/PlantForm";
import PlotForm from "../components/PlotForm";
import NoteForm from "../components/NoteForm";
import loadingImg from '../images/bouncing-circles.svg';

function Dashboard ({session}) {

    const [loading, setLoading] = useState(true);
    const [fullyRegistered, setFullyRegistered] = useState(false);
    const [regCheck, setRegCheck] = useState(true);
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
        console.log(session)
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
            if(data[0].username != null){
                setTimeout(function(){
                    setFullyRegistered(true)
                    setRegCheck(false)
                }, 1000)
                
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

    const closeButton = (data) => {
        if(data === true){
            setFormView("")
        }
    }

    const editButton = (data) => {
        if(data){
            setFormView("edit " + data)
        }
    }

    const viewContainer = () => {
        if(formView === "add plant" || formView === "edit plant"){
            return(<PlantForm session={session} closeButton={closeButton} />)
        } else if(formView === "add note"){
            return(<NoteForm session={session} closeButton={closeButton} />)
        } else if(formView === "add plot"){
            return(<PlotForm session={session} closeButton={closeButton} />)
        }
    }

    if(fullyRegistered===false){
        return(
            <div className="bg-lime-100">
                {regCheck ? (<img src={loadingImg}></img>):(<AccountForm session={session}/>)}
            </div>
        )
    } else{
        return(
            <div className="bg-lime-100">
                <h1>Signed In as:</h1>
                {loadingUserInfo ? (<p>Loading...</p>):(<p>{userInfo[0].username}</p>)}
                {viewContainer()}
                <div onClick={()=> setFormView("add plant")}><p>Add Plant</p></div>
                <div onClick={()=> setFormView("add plot")}><p>Add Plot</p></div>
                <div onClick={()=> setFormView("add note")}><p>Add Note</p></div>
                <div onClick={() => supabase.auth.signOut()}><p>Sign out</p></div>
            </div>
        )
    }
}

export default React.memo(Dashboard);