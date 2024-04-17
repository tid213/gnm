import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import tempImage from '../images/garden-plot.png';

function PlotView({plotID, session, closeButton, editButton}){

    const [plotData, setPlotData] = useState("");
    const [plantList, setPlantList] = useState();

    const fetchPlotData = async () =>{
        try{
            if(plotID){
                const { data, error } = await supabase
                .from('plots')
                .select('*')
                .eq('id', plotID)
                if (error) {
                    throw error;
                } else{

                }
                setPlotData(data);
            }
        }catch (error) {
            console.error('Error fetching data:', error.message);
          }
    }

    const createPlantList = async () => {
        if(plotData){
            const { data, error } = await supabase
                .from('plants')
                .select('id, plant_name')
                .eq('user_id', session.user.id)
                .eq('plant_plot', plotData[0].name)
            if (error) {
                throw error;
            }
            setPlantList(data);
        }
    }

    useEffect(()=>{
        fetchPlotData();
    }, [plotID])

    useEffect(() => {
        if (plotData) {
            createPlantList();
        }
    }, [plotData]);

    return(
        <div>
            {plotData ? 
                <div className='relative w-full inter mt-8 lg:max-w-3xl max-w-sm md:max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
                    <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
                    <div className='lg:grid grid-cols-4 lg:grid-cols-7 grid-flow-row gap-4'>
                        <div className='lg:col-span-7'><h1 className="text-2xl font-bold inter text-customBrown">{plotData[0].name}<b className="text-customOrange">.</b></h1></div>
                        <div className='lg:col-span-4 lg:flex items-center'>{plotData[0].plot_image ? 
                                                    <img src={plotData[0].plot_image}></img>:
                                                    <img src={tempImage}></img>}
                        </div>
                        <div className='lg:col-span-3 grid grid-cols-2 mt-4 '>
                            <div className='lg:col-span-1 lg:mt-0 lg:flex-none flex flex-col '>
                                <p className='text-lg font-bold text-black'>Sun: </p>
                                <p>{plotData[0].sun_type}</p>
                                <p className='text-lg lg:mt-4 font-bold text-black'>Soil Type: </p>
                                <p>{plotData[0].soil_type ? plotData[0].soil_type : "Edit to add"}</p>
                                <p className='text-lg lg:mt-4 font-bold text-black'>Soil pH: </p>
                                <p>{plotData[0].soil_ph ? plotData[0].soil_ph : "Edit to add"}</p>
                            </div>
                            <div className='lg:col-span-1'>
                              <h1 className="text-2xl mt-4 lg:mt-0 font-bold inter text-customBrown">Plants</h1>
                                {plantList ? (
                                    <p>
                                        {plantList.map((plant, index) => (
                                            <React.Fragment key={plant.id}>
                                                {plant.plant_name}
                                                {index !== plantList.length - 1 ? ', ' : ''}
                                            </React.Fragment>
                                        ))}
                                    </p>
                                ) : ''}
                            </div>
                        </div>
                        <div className='lg:col-span-7 lg:flex lg:justify-center lg:items-center lg:flex-nowrap  gap-4'>
                            <div onClick={()=>editButton("plot")}
                                className='lg:w-5/12 lg:mt-1 lg:p-0 p-4 mt-1 h-12 w-auto cursor-pointer flex bg-customMidGreen hover:bg-customDarkGreen rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Edit Plot</p>
                            </div>
                            <div className='lg:w-5/12 lg:p-0 p-4 mt-1 h-12 cursor-pointer flex bg-customOrange hover:bg-custom-red-500 rounded-lg justify-center items-center'>
                                <p className='text-lg font-normal text-white p-2'>Delete Plot</p>
                            </div>
                        </div>
                    </div>
                </div>
             : ""}
        </div>
    )
}

export default PlotView;