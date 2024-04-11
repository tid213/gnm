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
        <div className='relative w-full inter mt-12 max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
            <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
            {plantData ? 
                <div className='grid grid-cols-4 grid-flow-row gap-4'>
                    <div className='col-span-4'><p>{plantData[0].plant_name}</p></div>
                    <div className='col-span-4'><p>{plantData[0].plant_plot}</p></div>
                    <div className='col-span-4'>{plantData[0].plant_image ? 
                                                <img src={plantData[0].plant_image}></img>:
                                                <img src={tempImage}></img>}
                    </div>
                    <div className='col-span-4'>EDIT DELETE</div>
                </div> 
            : ""}
        </div>
        )
}

export default PlantView;