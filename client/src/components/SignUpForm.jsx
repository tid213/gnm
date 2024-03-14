import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      await supabase.from('users').insert([{ 
        id: user.id,
        email,
        username,
        zipcode
      }]);
      setMessage('Sign up successful. Please check your email for verification.');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error('Error signing up:', error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { user, error } = await supabase.auth.signIn({
        provider: 'google',
      });
      if (error) {
        throw error;
      }
      // Handle successful sign-in
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Zipcode:</label>
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;