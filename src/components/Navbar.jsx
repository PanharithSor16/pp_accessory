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
                    // className="top-4 left-4 z-30 p-2 bg-blue-500 text-white rounded-md focus:outline-none"
                >
                    <div className="relative flex overflow-hidden items-center justify-center rounded-2xl w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                        <div className="flex flex-col justify-between w-[16px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden group-focus:translate-x-1.5">
                            <div className="bg-white h-[2px] w-6 transform transition-all duration-300 origin-left group-focus:rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                            <div className="bg-white h-[2px] w-6 rounded transform transition-all duration-300 group-focus:translate-x-10"></div>
                            <div className="bg-white h-[2px] w-6 transform transition-all duration-300 origin-left group-focus:-rotate-[42deg] group-focus:w-2/3 delay-150"></div>
                        </div>
                    </div>

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
                <nav className=" mt-10 p-6 space-y-4 ">
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
