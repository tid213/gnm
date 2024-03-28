import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PlotForm = ({ plotId, session, closeButton }) => {
  const [name, setName] = useState('');
  const [sunType, setSunType] = useState('Full Sun');
  const [soilType, setSoilType] = useState('');
  const [soilPh, setSoilPh] = useState('');
  const [userPlots, setUserPlots] = useState([]);

  useEffect(() => {
    const fetchPlotData = async () => {
      try {
        // Fetch plot data if editing existing plot
        if (plotId) {
          const { data, error } = await supabase
            .from('plots')
            .select('*')
            .eq('id', plotId)
          if (error) {
            throw error;
          }
          const { name, sun_type, soil_type, soil_ph } = data;
          setName(name);
          setSunType(sun_type);
          setSoilType(soil_type);
          setSoilPh(soil_ph);
        }

        // Fetch user's plots from Supabase
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('*')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setUserPlots(plotsData);
      } catch (error) {
        console.error('Error fetching plot data:', error.message);
      }
    };

    fetchPlotData();
  }, [plotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert or update plot data
      const plotData = {
        name,
        sun_type: sunType,
        soil_type: soilType,
        soil_ph: parseInt(soilPh),
        user_id: session.user.id
      };
      const { error } = await supabase.from('plots').upsert(plotData, { returning: 'minimal' });
      if (error) {
        throw error;
      }
      console.log('Plot data saved successfully');
      // Reset form inputs after submission
      setName('');
      setSunType('Full Sun');
      setSoilType('');
      setSoilPh('');
    } catch (error) {
      console.error('Error saving plot data:', error.message);
    }
  };

  return (
    <div className='w-full max-w-sm md:max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <div onClick={()=> closeButton(true)}><a>Close</a></div>
      <h2 className='text-2xl font-semibold mb-4'>
        {plotId ? "Edit Plot" : "Add Plot"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name:</label>
          <input type="text" value={name} 
          className="w-full px-4 py-2 border rounded-md bg-lime-50 focus:outline-none focus:border-lime-500"
          onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Sun Type:</label>
          <select value={sunType} 
          className="w-full px-4 py-2 border rounded-md bg-lime-50 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSunType(e.target.value)}>
            <option value="Full Sun">Full Sun</option>
            <option value="Part Sun">Part Sun</option>
            <option value="Part Shade">Part Shade</option>
            <option value="Full Shade">Full Shade</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Soil Type:</label>
          <input type="text" value={soilType} 
          className="w-full px-4 py-2 border rounded-md bg-lime-50 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSoilType(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Soil pH:</label>
          <input type="number" value={soilPh} 
          className="w-full px-4 py-2 border rounded-md bg-lime-50 focus:outline-none focus:border-lime-500"
          onChange={(e) => setSoilPh(e.target.value)} />
        </div>
        <button className="mt-4 w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        type="submit">Save Plot</button>
      </form>
    </div>
  );
};

export default PlotForm;
