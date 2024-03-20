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
    <div>
      <div onClick={()=> closeButton(true)}><a>Close</a></div>
      <h2>Add/Edit Plot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Sun Type:</label>
          <select value={sunType} onChange={(e) => setSunType(e.target.value)}>
            <option value="Full Sun">Full Sun</option>
            <option value="Part Sun">Part Sun</option>
            <option value="Part Shade">Part Shade</option>
            <option value="Full Shade">Full Shade</option>
          </select>
        </div>
        <div>
          <label>Soil Type:</label>
          <input type="text" value={soilType} onChange={(e) => setSoilType(e.target.value)} />
        </div>
        <div>
          <label>Soil pH:</label>
          <input type="number" value={soilPh} onChange={(e) => setSoilPh(e.target.value)} />
        </div>
        <button type="submit">Save Plot</button>
      </form>

      <hr />

      <h2>Your Plots</h2>
      <ul>
        {userPlots.map((plot) => (
          <li key={plot.id}>
            <strong>Name:</strong> {plot.name}, <strong>Sun Type:</strong> {plot.sun_type}, <strong>Soil Type:</strong> {plot.soil_type}, <strong>Soil pH:</strong> {plot.soil_ph}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlotForm;
