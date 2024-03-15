import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      setMessage('Sign in successful.');
    } catch (error) {
      setMessage('Error signing in. Please try again.');
      console.error('Error signing in:', error.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
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
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Sign In</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignInForm;