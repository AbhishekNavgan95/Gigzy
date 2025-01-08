import React, { useState } from 'react';
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    // State to track which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null);

    // Toggle the dropdown visibility
    const toggleDropdown = (dropdownName) => {
        setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
    };
    return (
        <footer className="bg-black-950 px-8 py-12">
            <div className='container mx-auto'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
                    <div>
                        <a href=''><h4 className='text-black-50 font-extrabold text-4xl px-2 font-space'>Gigzy</h4></a>

                        <ul className="mt-10 flex gap-2 space-x-5">
                            <li>
                                <a href='' className='text-2xl text-black-50 hover:text-black-200 '>
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a href='' className='text-2xl text-black-50 hover:text-black-200 '>
                                    <FaLinkedinIn />
                                </a>
                            </li>
                            <li>
                                <a href='' className='text-2xl text-black-50 hover:text-black-200 '>
                                    <FaFacebookSquare />
                                </a>
                            </li>
                            <li>
                                <a href='' className='text-2xl text-black-50 hover:text-black-200 '>
                                    <FaXTwitter />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 onClick={() => toggleDropdown('services')} className="text-white font-semibold text-lg relative max-sm:cursor-pointer">Services <svg
                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
                            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
                            <path
                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                data-name="16" data-original="#000000"></path>
                        </svg>
                        </h4>

                        <ul
                            className={`mt-6 space-y-5 ${openDropdown === 'services' ? 'block' : 'hidden'
                                } sm:block`} >
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Web Development</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Pricing</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Support</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Client Portal</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Resources</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 onClick={() => toggleDropdown('platforms')} className="text-white font-semibold text-lg relative max-sm:cursor-pointer">Platforms <svg
                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
                            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
                            <path
                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                data-name="16" data-original="#000000"></path>
                        </svg>
                        </h4>
                        <ul 
                            className={`space-y-5 mt-6 ${openDropdown === 'platforms' ? 'block' : 'hidden'
                                } sm:block`}>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Hubspot</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Integration Services</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Marketing Glossar</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>UIPath</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 onClick={() => toggleDropdown('company')} className="text-white font-semibold text-lg relative max-sm:cursor-pointer">Company <svg
                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
                            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
                            <path
                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                data-name="16" data-original="#000000"></path>
                        </svg>
                        </h4>

                        <ul
                            className={`space-y-5 mt-6 ${openDropdown === 'company' ? 'block' : 'hidden'
                                } sm:block`}>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>About us</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Careers</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Blog</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Portfolio</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Events</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 onClick={() => toggleDropdown('additional')} className="text-white font-semibold text-lg relative max-sm:cursor-pointer">Additional <svg
                            xmlns="http://www.w3.org/2000/svg" width="16px" height="16px"
                            className="sm:hidden absolute right-0 top-1 fill-[#d6d6d6]" viewBox="0 0 24 24">
                            <path
                                d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                                data-name="16" data-original="#000000"></path>
                        </svg>
                        </h4>

                        <ul
                            className={`space-y-5 mt-6 ${openDropdown === 'additional' ? 'block' : 'hidden'
                                } sm:block`}>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>FAQ</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Partners</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Sitemap</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>Contact</a>
                            </li>
                            <li>
                                <a href='' className='hover:text-white text-gray-300 text-sm'>News</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-10 border-gray-400 container mx-auto " />

                <div className="flex flex-wrap max-md:flex-col  gap-4">
                    <ul className="md:flex md:space-x-6 max-md:space-y-2">
                        <li>
                            <a href='' className='hover:text-white text-gray-300 text-sm'>Terms of Service</a>
                        </li>
                        <li>
                            <a href='' className='hover:text-white text-gray-300 text-sm'>Privacy Policy</a>
                        </li>
                        <li>
                            <a href='' className='hover:text-white text-gray-300 text-sm'>Security</a>
                        </li>
                    </ul>

                    <p className='text-gray-300 text-sm md:ml-auto'>© ReadymadeUI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer