import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'
import AccountForm from "../components/AccountForm";
import PlantForm from "../components/PlantForm";
import PlotForm from "../components/PlotForm";
import NoteForm from "../components/NoteForm";
import loadingImg from '../images/bouncing-circles.svg';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import PlantList from "../components/PlantList";
import weatherIcon from '../images/weather-image.svg';

function Dashboard ({session}) {

    const navigate = useNavigate();
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
    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(()=>{
        fetchUserInfo();
        fetchPlantData();
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 0) {
              setIsTransparent(false);
            } else {
              setIsTransparent(true);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                }, 2000)
                
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
        } else if(formView === "edit account"){
            return(<AccountForm session={session} closeButton={closeButton} />)
        }
    }

    const handleSignOut = async () => {
        // Sign out the user
        await supabase.auth.signOut();
    
        // Redirect to the home page
        navigate('/');
      };

    if(fullyRegistered===false){
        return(
            <div className="min-h-screen flex flex-col justify-center items-center bg-customLightBrown">
                {regCheck ? (<img src={loadingImg} className="w-16 h-16"></img>):(<AccountForm session={session}/>)}
            </div>
        )
    } else{
        return(
            <div className="min-h-screen flex flex-col items-center bg-customLightBrown">
                <header className={`fixed top-0 w-full ${isTransparent ? 'bg-white' : 'bg-opacity-90 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        {/* Logo */}
                        <h1 className="text-base font-normal inter text-customBrown">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">{userInfo[0].username}</b></h1>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
                        {/* Navigation Links */}
                        <nav className="flex space-x-4">
                        <span onClick={()=> setFormView("add note")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add Note</span>
                        <span onClick={()=> setFormView("add plant")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add Plant</span>
                        <span onClick={()=> setFormView("add plot")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add Plot</span>
                        <span onClick={()=> setFormView("edit account")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Account</span>
                        <span onClick={() => handleSignOut()} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Out</span>                        
                        </nav>
                    </div>
                    {/* Hamburger Menu for Mobile */}
                    <div className="flex lg:hidden">
                        <button onClick={toggleMenu} className="bg-white p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md">
                        <span onClick={()=> {setFormView("add plant"); setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Add Plant</span>
                        <span onClick={()=> {setFormView("add plot");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Add Plot</span>
                        <span onClick={()=> {setFormView("add note");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Write Note</span>
                        <span onClick={()=> {setFormView("edit account");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Account</span>
                        <span onClick={() => handleSignOut()} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign Out</span>
                    </div>
                    </div>
                )}
                </header>
                <div className="absolute top-12 max-w-full">{viewContainer()} </div>
                <div>
                    
                </div>
                <div className="mt-36">{plantData ? <PlantList plantData={plantData} /> : ""} </div> 
            </div>
        )
    }
}

export default React.memo(Dashboard);