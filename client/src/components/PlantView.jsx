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
                <div className='relative w-full inter mt-12 max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
                <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
                <div className='grid grid-cols-4 grid-flow-row gap-4'>
                        <div className='col-span-4'><h1 className="text-2xl font-bold inter text-customBrown">{plantData[0].plant_name}<b className="text-customOrange">.</b><b className="text-customMidGreen text-xl font-normal">plot/{plantData[0].plant_plot}</b></h1></div>
                        <div className='col-span-4 '>{plantData[0].plant_image ? 
                                                    <img src={plantData[0].plant_image}></img>:
                                                    <img src={tempImage}></img>}
                        </div>
                        <div className='col-span-2'><p>{plantData[0].prune_date}<br/>{plantData[0].prune_freq}</p></div>
                        <div className='col-span-4'>EDIT DELETE</div>
                </div>
            </div>: ""}
        </div>
        )
}

export default PlantView;