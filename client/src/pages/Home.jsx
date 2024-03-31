import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import logo from '../images/landing-logo.png';
import plantHouse from '../images/plant-house.svg';

function Home () {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 0) {
            setIsTransparent(false);
          } else {
            setIsTransparent(true);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

      return (
        <main className="min-h-screen flex flex-col items-center bg-green-600">
            <header className={`fixed top-0 w-full ${isTransparent ? 'bg-white' : 'bg-opacity-90 bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                    {/* Logo */}
                    <img className="block lg:hidden h-8 w-auto" src={plantHouse} alt="Logo" />
                    <img className="hidden lg:block h-8 w-auto" src={plantHouse} alt="Logo" />
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
                    {/* Navigation Links */}
                    <nav className="flex space-x-4">
                    <Link to="/home" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link to="/signup" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                    <Link to="/signin" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
                    <Link to="/forgotpassword" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Forgot Password</Link>
                    </nav>
                </div>
                {/* Hamburger Menu for Mobile */}
                <div className="flex lg:hidden">
                    <button onClick={toggleMenu} className="bg-white p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                    <span className="sr-only">Open main menu</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Home</Link>
                    <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign Up</Link>
                    <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign In</Link>
                    <Link to="/forgotpassword" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Forgot Password</Link>
                </div>
                </div>
            )}
            </header>
            <section className="flex flex-col justify-center items-center mt-16">
                <img src={logo}></img>
                <h1 className="text-4xl text-white font-inter font-light mb-8 text-center">Garden Notes</h1>
                <p className="font-inter max-w-prose text-xl text-white">GreenNotes is your all-in-one solution for plant lovers. Whether you're a seasoned gardener or just starting out, GreenNotes helps you keep track of all your plants effortlessly.</p>
            </section>
            <section className="flex space-x-4">
                <Link to="/signin" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
                Sign In
                </Link>
                <Link to="/signup" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
                </Link>
            </section>
        </main>
      );


}

export default React.memo(Home);