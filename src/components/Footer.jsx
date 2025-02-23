import React from 'react'

const Footer = () => {
    return (
        <>

            <footer className="bg-gray-700  bottom-0 w-full text-white py-6  ">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">

                        {/* Logo / Brand Name */}
                        <div className="text-xl font-bold">MyWebsite</div>

                        {/* Navigation Links */}
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="/" className="hover:text-gray-400">Home</a>
                            <a href="/about" className="hover:text-gray-400">About</a>
                            <a href="/services" className="hover:text-gray-400">Services</a>
                            <a href="/contact" className="hover:text-gray-400">Contact</a>
                        </div>

                        {/* Copyright Text */}
                        <div className="mt-4 md:mt-0 text-sm text-gray-400">
                            © {new Date().getFullYear()} MyWebsite. All rights reserved.
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer