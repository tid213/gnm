import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import tempImage from '../images/temp-image.png';

function PlantView({session, plantID, closeButton}){

    const [plantData, setPlantData] = useState();

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

    return(
        <div>
            {plantData ? 
                <div className='relative w-full inter mt-8 lg:max-w-3xl max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
                <div className='lg:grid grid-cols-4 lg:grid-cols-7 grid-flow-row gap-4'>
                        <div className='lg:col-span-7'><h1 className="text-2xl font-bold inter text-customBrown">{plantData[0].plant_name}<b className="text-customOrange">.</b><b className="text-customMidGreen text-xl font-normal">plot/{plantData[0].plant_plot}</b></h1></div>
                        <div className='lg:col-span-4 lg:flex items-center'>{plantData[0].plant_image ? 
                                                    <img src={plantData[0].plant_image}></img>:
                                                    <img src={tempImage}></img>}
                        </div>
                        <div className='lg:col-span-3'>
                            <h3 className='mb-4 text-2xl font-bold text-customDarkGreen mt-4 lg:mt-0'>Plant details</h3>
                            <div className='grid grid-cols-2 lg:grid-cols-none'>
                                <div>
                                    <p className='font-bold'>Water frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].water_freq}</p>
                                    <p className='font-bold'>Last fertilized:</p><p className='lg:mb-4 mb-2'>{plantData[0].fert_date ? plantData[0].fert_date : "Edit plant to add" }</p>
                                    <p className='font-bold'>Last pruned:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_date ? plantData[0].prune_date : "Edit plant to add" }</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Fertilize frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].fert_freq ? plantData[0].fert_freq : "Edit plant to add"}</p>
                                    <p className='font-bold'>Prune frequency:</p><p className='lg:mb-4 mb-2'>{plantData[0].prune_freq ? plantData[0].prune_freq : "Edit plant to add"}</p>
                                </div>
                            </div>
                        </div>
                        <div className='lg:col-span-7 lg:flex gap-4'>
                            <div className='lg:w-5/12 lg:mt-1 mt-4 w-auto cursor-pointer flex bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-xl font-bold text-white p-2'>Edit</p>
                            </div>
                            <div className='lg:w-5/12 mt-1 cursor-pointer flex bg-customMidGreen rounded-lg justify-center items-center'>
                                <p className='text-xl font-bold text-white p-2'>Prune</p>
                            </div>
                            <div className='lg:w-5/12 mt-1 cursor-pointer flex bg-customMidGreen rounded-lg justify-center items-center'>
                                <p className='text-xl font-bold text-white p-2'>Fertilize</p>
                            </div>
                            <div className='lg:w-5/12 mt-1 cursor-pointer flex bg-customMidGreen rounded-lg justify-center items-center'>
                                <p className='text-xl font-bold text-white p-2'>Add image</p>
                            </div>
                            <div className='w-auto mt-1 cursor-pointer flex bg-customOrange rounded-lg justify-center items-center'>
                                <p className='text-xl font-bold text-white p-4'>Delete</p>
                            </div>
                        </div>
                </div>
            </div>: ""}
        </div>
        )
}

export default PlantView;