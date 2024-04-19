import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import tempImage from '../images/temp-image.png';
import DateSelect from './DateSelect';
import ImageForm from './ImageForm';

function PlantView({session, plantID, closeButton, editButton}){

    const [plantData, setPlantData] = useState();
    const [dateAndImageView, setDateAndImageView] = useState("image");

    useEffect(()=>{
        const fetchPlantData = async () =>{
            try{
                if(plantID){
                    const { data, error } = await supabase
                    .from('plants')
                    .select('*')
                    .eq('id', plantID)
                    if (error) {
                        throw error;
                    }
                    setPlantData(data)
                }
            }catch (error) {
                console.error('Error fetching data:', error.message);
              }
        }
        fetchPlantData();
    }, [])

    const dateAndImage = (data) => {
        if(data === "fertilize"){
            setDateAndImageView("fertilize")
        } else if(data === "prune"){
            setDateAndImageView("prune")
        } else if(data === "close"){
            setDateAndImageView("image")
        } else if(data === "upload"){
            setDateAndImageView("upload")
        }
    }

    const imageDisplay = () => {
        if(plantData[0].plant_image){
            return(<img src={plantData[0].plant_image}></img>)
        } else{
            return(<img src={tempImage}></img>)
        }
    }

    const dateOrUpload = () => {
        if(dateAndImageView === "prune" || dateAndImageView === "fertilize"){
            return(<DateSelect plantId={plantID}  pruneOrFert={dateAndImageView} close={dateAndImage} />)
        } else if(dateAndImageView === "upload"){
            return(<ImageForm closeButton={dateAndImage} imageForId={plantID} imageFor={"plant"} />)
        }
    }

    return(
        <div>
            {plantData ? 
                <div className='relative w-full inter mt-8 lg:max-w-3xl max-w-sm md:max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
                <div className='lg:grid grid-cols-4 lg:grid-cols-7 grid-flow-row gap-4'>
                        <div className='lg:col-span-7'>
                            <h1 className="text-2xl font-bold inter text-customBrown">
                                {plantData[0].plant_name}<b className="text-customOrange">.</b>
                                <b className="text-customMidGreen text-xl font-normal">
                                    plot/{plantData[0].plant_plot}
                                </b>
                            </h1>
                        </div>
                        <div className='lg:col-span-4 lg:w-96 lg:h-96 bg-white lg:flex bg-cover bg-center overflow-hidden flex justify-center items-center'>
                            {dateAndImageView != "image" ? 
                                dateOrUpload() : imageDisplay()}
                        </div>
                        <div className='lg:col-span-3'>
                            <div className='grid grid-cols-2 lg:grid-cols-none mt-4'>
                                <div>
                                <p className='font-bold lg:block hidden'>Plot location:</p><p className='lg:mb-4 mb-2 hidden lg:block'>{plantData[0].plant_plot}</p>
                                    <p className='font-bold'>Water frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].water_freq}</p>
                                    <p className='font-bold'>Last fertilized:</p><p className='lg:mb-4 mb-2'>{plantData[0].fertilize_date ? plantData[0].fertilize_date : "Edit plant to add" }</p>
                                    <p className='font-bold'>Last pruned:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_date ? plantData[0].prune_date : "Edit plant to add" }</p>
                                </div>
                                <div>
                                    <p className='font-bold lg:hidden'>Plot location:</p><p className='lg:mb-4 mb-2 lg:hidden'>{plantData[0].plant_plot}</p>
                                    <p className='font-bold'>Fertilize frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].fert_freq ? plantData[0].fert_freq : "Edit plant to add"}</p>
                                    <p className='font-bold'>Prune frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_freq ? plantData[0].prune_freq : "Edit plant to add"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-7  lg:flex-nowrap flex-wrap lg:flex gap-4'>
                            <div onClick={()=>editButton("plant")}
                                className='lg:w-5/12 lg:mt-1 lg:p-0 p-4 mt-1 h-12 w-auto cursor-pointer flex bg-customMidGreen hover:bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Edit</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("prune")} className='lg:w-5/12 lg:p-0 p-4 mt-1 h-12 cursor-pointer flex bg-customMidGreen border-2 border-customLightGreen hover:bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Prune</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("fertilize")} className='lg:w-5/12 lg:p-0 p-4 mt-1 h-12 cursor-pointer flex bg-customMidGreen hover:bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Fertilize</p>
                            </div>
                            <div onClick={()=>setDateAndImageView("upload")} className='lg:w-5/12 lg:p-0 p-4 mt-1 h-12 cursor-pointer flex bg-customMidGreen hover:bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Add image</p>
                            </div>
                        </div>
                </div>
            </div>: ""}
        </div>
        )
}

export default PlantView;