import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

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
            {plantData ? <p>{plantData[0].plant_name}</p> : ""}
        </div>
        )
}

export default PlantView;