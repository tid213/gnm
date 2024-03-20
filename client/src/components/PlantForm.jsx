import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { redirect } from "react-router-dom";

const PlantForm = ({ plantId, session, closeButton }) => {
  const [plantName, setPlantName] = useState('');
  const [sunType, setSunType] = useState('Full Sun');
  const [waterFreq, setWaterFreq] = useState('');
  const [fertFreq, setFertFreq] = useState('');
  const [plantPlot, setPlantPlot] = useState('');
  const [pruneFreq, setPruneFreq] = useState('Monthly');
  const [fertilizerFreq, setFertilizerFreq] = useState('Two weeks');
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        // Fetch plant data if editing existing plant
        if (plantId) {
          const { data: plantData, error } = await supabase
            .from('plants')
            .select('*')
            .eq('id', plantId)
          if (error) {
            throw error;
          }
          const { plant_name, sun_type, water_freq, fert_freq, plant_plot, prune_freq, fertilizer_freq } = plantData;
          setPlantName(plant_name);
          setSunType(sun_type);
          setWaterFreq(water_freq);
          setFertFreq(fert_freq);
          setPlantPlot(plant_plot);
          setPruneFreq(prune_freq);
          setFertilizerFreq(fertilizer_freq);
        }

        // Fetch plots data for dropdown
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('id, name')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setPlots(plotsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchPlantData();
  }, [plantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert or update plant data
      const plantData = {
        plant_name: plantName,
        sun_type: sunType,
        water_freq: waterFreq,
        fert_freq: fertFreq,
        plant_plot: plantPlot,
        prune_freq: pruneFreq,
        fertilizer_freq: fertilizerFreq
      };
      let { error } = await supabase.from('plants').upsert(plantData, { returning: 'minimal' });
      if (error) {
        throw error;
      }
      console.log('Plant data saved successfully');
      // Reset form inputs after submission
      setPlantName('');
      setSunType('Full Sun');
      setWaterFreq('');
      setFertFreq('');
      setPlantPlot('');
      setPruneFreq('Monthly');
      setFertilizerFreq('Two weeks');
    } catch (error) {
      console.error('Error saving plant data:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div onClick={()=> closeButton(true)}><a>Close</a></div>
        <label>Plant Name:</label>
        <input type="text" value={plantName} onChange={(e) => setPlantName(e.target.value)} required />
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
        <label>Watering Frequency:</label>
        <input type="text" value={waterFreq} onChange={(e) => setWaterFreq(e.target.value)} required />
      </div>
      <div>
        <label>Fertilizing Frequency:</label>
        <select value={fertFreq} onChange={(e) => setFertFreq(e.target.value)}>
          <option value="Two weeks">Two weeks</option>
          <option value="One Month">One Month</option>
          <option value="Two Months">Two Months</option>
          <option value="Three Months">Three Months</option>
          <option value="Six Months">Six Months</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label>Plant Plot:</label>
        <select value={plantPlot} onChange={(e) => setPlantPlot(e.target.value)} required>
          <option value="">Select Plot</option>
          {plots.map((plot) => (
            <option key={plot.id} value={plot.id}>{plot.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Pruning Frequency:</label>
        <select value={pruneFreq} onChange={(e) => setPruneFreq(e.target.value)}>
          <option value="Monthly">Monthly</option>
          <option value="Two Months">Two Months</option>
          <option value="Three Months">Three Months</option>
          <option value="Six Months">Six Months</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div>
        <label>Fertilizer Frequency:</label>
        <select value={fertilizerFreq} onChange={(e) => setFertilizerFreq(e.target.value)}>
          <option value="Two weeks">Two weeks</option>
          <option value="One Month">One Month</option>
          <option value="Two Months">Two Months</option>
          <option value="Three Months">Three Months</option>
          <option value="Six Months">Six Months</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <button type="submit">Save Plant</button>
    </form>
  );
};

export default PlantForm;
