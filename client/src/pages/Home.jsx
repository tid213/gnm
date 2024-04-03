import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import plantHouse from '../images/plant-house.svg';
import landingImage from '../images/landing-image.svg';
import headerImage from '../images/note-with-pencil.svg'

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
        <main className="min-h-screen flex flex-col bg-customLightBrown">
            <header className={`fixed top-0 w-full ${isTransparent ? 'bg-white' : 'bg-opacity-90 bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                    {/* Logo */}
                    <h1 className="text-base font-normal inter text-customBrown">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
                    {/* Navigation Links */}
                    <nav className="flex space-x-4">
                    <Link to="/home" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link to="/signup" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                    <Link to="/signin" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
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
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md">
                    <Link to="/home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Home</Link>
                    <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign Up</Link>
                    <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign In</Link>
                </div>
                </div>
            )}
            </header>
            <section className=" min-h-screen flex flex-col mt-16">
                <div className="lg:flex lg:items-center items-center">
                    {/* Image */}
                    <div className="lg:w-6/12">
                        <img className="mb-4 lg:mt-4 lg:mb-0 lg:mr-8  max-w-sm mx-auto lg:max-w-lg" src={landingImage} alt="Landing Image" />
                    </div>
                    {/* Text content */}
                    <div className="lg:w-6/12">
                    {/* Heading */}
                    <p className="inter font-normal mb-4 max-w-prose px-8 text-2xl text-customDarkGreen text-center ">Welcome to</p>
                    <h1 className="text-5xl text-customDarkGreen inter font-bold mb-4 lg:mb-8 text-center">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                    
                    {/* Paragraph */}
                    <p className="inter font-light max-w-prose px-8 text-lg text-black text-center ">
                    Your all-in-one solution for plant lovers. Whether you're a seasoned gardener or just starting out, GardenNotes.me helps you keep track of all your plants effortlessly.
                    </p>
                    {/* Buttons */}
                    <div className="flex flex-col w-full lg:justify-center items-center mt-6 lg:flex-row">
                        <Link to="/signin" className="inline-block inter bg-customMidGreen w-8/12 lg:w-3/12 hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        <Link to="/signup" className="inline-block inter mt-2 lg:mt-0 lg:ml-4 bg-customOrange w-8/12 lg:w-3/12 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                    </div>
                    </div>
                </div>
            </section>
            <section className="flex space-x-4">
            <p className="inter font-light max-w-prose px-8 text-lg text-black text-center ">
                <b className="font-bold">Take Notes:</b> Capture your plant care routines, growth milestones, and observations in one convenient place. With GreenNotes, you'll never forget a watering schedule or pruning tip again
            </p>
            </section>
        </main>
      );


}

export default React.memo(Home);