import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
      setMessage('Sign up successful. Please check your email for verification.');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
      console.error('Error signing up:', error.message);
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
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-customDarkGreen hover:bg-customBrown text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <button
        className="mt-4 w-full bg-customDarkGreen hover:bg-customBrown text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        onClick={handleGoogleSignIn}
      >
        Sign in with Google
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <div className="mt-4 text-center">
        <Link to="/signin" className="text-blue-500 hover:text-blue-700">Already signed up? Sign in</Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700">Go back to Home</Link>
      </div>
    </div>
  );
};

export default SignUpForm;