import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
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
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
  <form onSubmit={handleSignIn}>
    <div className="mb-4">
      <label className="block text-gray-700">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-lime-200 focus:outline-none focus:border-lime-500"
        required
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-md bg-lime-200 focus:outline-none focus:border-lime-500"
        required
      />
    </div>
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    >
      {loading ? 'Signing In...' : 'Sign In'}
    </button>
  </form>
  <button
    onClick={handleGoogleSignIn}
    className="mt-4 w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
  >
    Sign in with Google
  </button>
  {message && <p className="mt-4 text-red-500">{message}</p>}
  <div className="mt-4 text-center">
        <Link to="/forgotpassword" className="text-green-800 hover:text-green-600">Forgot password</Link>
      </div>
  <div className="mt-4 text-center">
        <Link to="/signup" className="text-green-800 hover:text-green-600">Not already registered? Sign up</Link>
      </div>
      <div className="mt-2 text-center">
        <Link to="/" className="text-green-800 hover:text-green-600">Go back to Home</Link>
      </div>
</div>

  );
};

export default SignInForm;