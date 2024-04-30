import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import closeImage from '../images/x.svg';
import editImage from '../images/edit.svg'
import trashImage from '../images/trash.svg';

function NoteView({noteID, closeButton, editButton}){

    const [noteData, setNoteData] = useState();
    useEffect(()=>{
        const fetchNoteData = async () =>{
            try{
                if(noteID){
                    const { data, error } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('id', noteID)
                    if (error) {
                        throw error;
                    }
                    setNoteData(data)
                }
            }catch (error) {
                console.error('Error fetching data:', error.message);
              }
        }
        fetchNoteData();
    }, [])

    const handleDelete = () => {

    }

    console.log(noteData)

    return(
        <div>
            {noteData ? 
            <div className='relative w-full inter mt-8 lg:mt-8 lg:w-96 max-w-sm md:max-w-md mx-auto p-6 border border-gray-200 rounded-lg shadow-md bg-white'>
            <div onClick={()=> closeButton(true)} className='absolute text-xl font-bold right-4 top-2 cursor-pointer'><img src={closeImage} className='h-4 w-4 '></img></div>
            <div className='lg:grid lg:grid-col-2 gap-4'>
                <div className='col-span-2 text-xl font-semibold'>
                    <h3>{noteData[0].note_type === "Garden" ? noteData[0].note_type : noteData[0].note_for}</h3>
                </div>
                <div className='col-span-2'>
                    <p>{noteData[0].note}</p>
                </div>
            </div>
            <div onClick={()=>editButton("plant")}
                className='lg:w-fit col-span-1 w-full m-auto lg:mt-4 lg:p-0 p-1 mt-1 bg-white lg:bg-transparent w-auto cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                <img src={editImage} className='w-4 h-4'></img>
                <p className='text-normal font-normal text-black p-2'>Edit</p>
            </div>
            <div onClick={()=>editButton("plant")}
                className='lg:w-fit col-span-1 w-full m-auto lg:mt-1 lg:p-0 p-1 mt-1 bg-white lg:bg-transparent w-auto cursor-pointer flex justify-center items-center border lg:border-0 hover:border-b-2 lg:shadow-none shadow-md'>
                <img src={trashImage} className='w-4 h-4'></img>
                <p className='text-normal font-normal text-black p-2'>Delete</p>
            </div>
            </div> : ""}
        </div>
    )
}

export default NoteView;