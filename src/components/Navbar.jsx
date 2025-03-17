import React, { useState } from 'react';

import { Link, NavLink } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`sticky top-0 bg-white text-black shadow-md z-10 px-20 py-4`}>

            {/* Parent Flex Container */}
            <div className='flex justify-between items-center'>

                {/* Left Side: Logo */}
                <Link to='/' className='font-bold text-xl'>LOGO</Link>

                {/* Right Side: Mobile Menu Button (only on small screens) */}
                <button className='md:hidden text-2xl' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>

                {/* Navigation Links (Hidden in mobile, shown in desktop) */}
                <div className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 shadow-md md:shadow-none md:flex md:space-x-8 transition-all ${isOpen ? "block" : "hidden md:flex"}`}>
                    <NavLink to="/" end className={({ isActive }) => `block py-2 md:inline ${isActive ? `text-blue-400 font-bold` : ``}`}>Home</NavLink>
                    <NavLink to="/dashboard" end className={({ isActive }) => `block py-2 md:inline ${isActive ? `text-blue-400 font-bold` : ``}`}>DashBoard</NavLink>

                    {/* <NavLink to="/services" className={({ isActive }) => `block py-2 md:inline ${isActive ? `text-blue-400 font-bold` : ``}`}>Services</NavLink>
                    <NavLink to="/userstate" className={({ isActive }) => `block py-2 md:inline ${isActive ? `text-blue-400 font-bold` : ``}`}>Status</NavLink> */}
                </div>
            </div >
        </nav >
    )
}

export default Navbar;
