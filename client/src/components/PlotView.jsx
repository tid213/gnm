import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import tempImage from '../images/garden-plot.png';
import ImageForm from './ImageForm';
import editImage from '../images/edit.svg'
import AddImageIcon from '../images/add-image.png';
import closeSquare from '../images/close-square.svg';

function PlotView({plotID, session, closeButton, editButton}){

    const [plotData, setPlotData] = useState("");
    const [plantList, setPlantList] = useState();
    const [imageView, setImageView] = useState("image");

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

    const showImage = () => {
        if(plotData[0].plot_image){
            return(<img src={plotData[0].plot_image}></img>);
        } else{
            return(<img src={tempImage}></img>);
        }
    };

    const close = (data) => {
        if(data === 'close'){
            setImageView("image")
        }
    }

    return(
        <div>
            {plotData ? 
                <div className='relative w-full inter mt-8 lg:max-w-4xl max-w-sm md:max-w-md mx-auto p-6 bg-lime-50 border border-gray-200 rounded-lg shadow-md'>
                    <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><a>X</a></div>
                    <div className='lg:grid grid-cols-4 lg:grid-cols-9 grid-flow-row gap-4'>
                        <div className='lg:col-span-9'>
                            <h1 className="text-2xl font-normal inter text-customBrown">
                                {plotData[0].name}
                                <b className="text-customOrange">.</b>
                            </h1>
                        </div>
                        <div className='lg:col-span-4  lg:w-96 lg:h-96'>
                            {imageView === "upload" ? 
                                <ImageForm imageFor={"plot"} imageForId={plotID} close={close} /> 
                                : showImage()}
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
                        <div className='lg:col-span-2 lg:flex lg:justify-start h-fit lg:items-center lg:flex-nowrap lg:flex-col  gap-4 lg:border-l-2 lg:border-gray-100'>
                            <div onClick={()=>editButton("plot")}
                                className='lg:w-5/12 lg:mt-1 lg:p-0 p-4 mt-1 h-12 w-auto cursor-pointer flex justify-center items-center lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={editImage} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Edit</p>
                            </div>
                            <div onClick={()=>setImageView("upload")}
                                className='lg:w-5/12 lg:mt-1 lg:p-0 p-4 mt-1 h-12 w-auto cursor-pointer flex justify-center items-center lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <img src={AddImageIcon} className='w-4 h-4'></img>
                                <p className='text-normal font-normal text-black p-2'>Image</p>
                            </div>
                            <div className='lg:w-5/12 lg:p-0 p-4 mt-1 h-12 cursor-pointer flex justify-center items-center lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                                <p className='text-normal font-normal text-black p-2'>Delete</p>
                            </div>
                        </div>
                    </div>
                </div>
             : ""}
        </div>
    )
}

export default PlotView;