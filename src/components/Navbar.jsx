import React from 'react'
import { Link, NavLink } from 'react-router'

const Navbar = () => {
    return (
        <>
            <nav className='sticky top-0 bg-white text-black shadow-md z-10  p-4'>

                <div className='container mx-auto flex justify-between items-center'>
                    <Link to='/'>LOGO</Link>
                    <div className='flex items-center space-x-16 mx-24'>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/services">Services</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar
