import React, { useState } from 'react';
import { navbar_data } from './nav';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOffCanvas = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button - only show if sidebar is closed */}
            {!isOpen && (
                <button
                    onClick={toggleOffCanvas}
                    className="top-4 left-4 z-30 p-2 bg-blue-500 text-white rounded-md focus:outline-none" 
                >
                    Open Sidebar
                </button>
            )}
            {/* Sidebar Panel */}
            <div
                className={` fixed top-0 left-0 h-full w-96 bg-pink-50 text-black shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-30`}
            >
                <button
                    onClick={toggleOffCanvas}
                    className="absolute top-4 right-4 p-2 px-3 bg-red-300 rounded-sm"
                >
                    &times;
                </button>
                
                <nav className=" p-6 space-y-4 ">
                    <ul>
                        {navbar_data.map((nav) => (
                            <li key={nav.to} className="rounded-md p-1 text-start font-medium">
                                <NavLink to={nav.to} className="hover:bg-blue-300 p-2 rounded-md flex" >
                                    {nav.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>   
        </>
    );
};

export default Navbar;
