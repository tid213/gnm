import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const NoteForm = ({session, closeButton}) => {
  const [noteType, setNoteType] = useState('General');
  const [noteFor, setNoteFor] = useState('');
  const [note, setNote] = useState('');
  const [noteLink, setNoteLink] = useState('');
  const [userPlants, setUserPlants] = useState([]);
  const [userPlots, setUserPlots] = useState([]);

  const generateRandomNoteLink = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  

  useEffect(() => {
    const fetchUserPlantsAndPlots = async () => {
      try {
        // Fetch user's plants
        const { data: plantsData, error: plantsError } = await supabase
          .from('plants')
          .select('plant_name')
          .eq('user_id', session.user.id);
        if (plantsError) {
          throw plantsError;
        }
        setUserPlants(plantsData);

        // Fetch user's plots
        const { data: plotsData, error: plotsError } = await supabase
          .from('plots')
          .select('name')
          .eq('user_id', session.user.id);
        if (plotsError) {
          throw plotsError;
        }
        setUserPlots(plotsData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserPlantsAndPlots();
    setNoteLink(generateRandomNoteLink().toString());
  }, []);

  const handleNoteTypeChange = (value) => {
    setNoteType(value);
    setNoteFor('');
  };

  const handleNoteForChange = (value) => {
    setNoteFor(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert data into the "notes" table
      const { data, error } = await supabase.from('notes').insert([{ note_type: noteType, note_for: noteFor, note: note, note_link: noteLink }]);
      if (error) {
        throw error;
      }
      console.log('Note data saved successfully:', data);
      // Reset form inputs after submission
      setNoteType('General');
      setNoteFor('');
      setNote('');
      setNoteLink('');
    } catch (error) {
      console.error('Error saving note data:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div onClick={()=> closeButton(true)}><a>Close</a></div>
      <div>
        <label>Note Type:</label>
        <select value={noteType} onChange={(e) => handleNoteTypeChange(e.target.value)} required>
          <option value="General">General</option>
          <option value="Plant">Plant</option>
          <option value="Plot">Plot</option>
        </select>
      </div>
      {noteType === 'Plant' && (
        <div>
          <label>Note For:</label>
          <select value={noteFor} onChange={(e) => handleNoteForChange(e.target.value)} required>
            <option value="">Select Plant</option>
            {userPlants.map((plant, index) => (
              <option key={index} value={plant.plant_name}>{plant.plant_name}</option>
            ))}
          </select>
        </div>
      )}
      {noteType === 'Plot' && (
        <div>
          <label>Note For:</label>
          <select value={noteFor} onChange={(e) => handleNoteForChange(e.target.value)} required>
            <option value="">Select Plot</option>
            {userPlots.map((plot, index) => (
              <option key={index} value={plot.name}>{plot.name}</option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label>Note:</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} required />
      </div>
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;

