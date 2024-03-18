import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AccountForm = ({session}) => {
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [zone, setZone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { user } = session
      setLoading(true);
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
        if (error) {
          throw error;
        }
        if (data) {
          setUsername(data.username || '');
          setWebsite(data.website || '');
          setAvatarUrl(data.avatar_url || '');
          setZone(data.zone || '');
          setZipCode(data.zip_code || '');
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      setMessage('Error fetching profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const { user } = session;
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            username,
            website,
            avatar_url: avatarUrl,
            zone,
            zip_code: zipCode,
          });
        if (error) {
          throw error;
        }
        setMessage('Profile updated successfully.');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar URL:</label>
          <input
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Zone:</label>
          <input
            type="text"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AccountForm;
