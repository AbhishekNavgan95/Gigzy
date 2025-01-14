import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { LuHeartHandshake } from "react-icons/lu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaLocationArrow } from "react-icons/fa";
import { cities, jobTitles, jobTypes } from '@/data/staticData'
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {

    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');

    const searchAccordingToFilters = () => {
        if (!type && !location) {
            toast({
                title: 'Please select atleast one option!'
            });
            return
        }

        let route = ''
        if (type) {
            route += `&type=${type}`
        }
        if (location) {
            route += `&location=${location}`
        }
        navigate(`/jobs/1?${route}`)
    }

    return (
        <section className='grid-background pt-24 pb-5 lg:pt-36 flex flex-col gap-y-12 px-3'>
            <div className='flex flex-col items-center justify-center gap-y-10 gap-x-6 lg:gap-14 xl:gap-x-24 container mx-auto'>
                <div className='text-black-800 flex flex-col items-start w-10/12 gap-y-5 md:gap-4'>
                    <div className='flex flex-col lg:flex-row justify-between items-center w-full gap-6 mt-10'>

                        <span className='w-full flex flex-col items-center lg:items-start font-space gap-y-3 '>
                            <div className="w-max mb-3 flex items-center bg-gray-900 shadow-lg rounded-full">
                                <span className="bg-accent-600 text-black-100 font-semibold rounded-full w-8 md:w-10 h-8 md:h-10 flex items-center text-xs sm:text-base justify-center"><FaLocationArrow /></span>
                                <h3 className="text-white text-xs uppercase mx-2 mr-4">Try for Free</h3>
                            </div>
                            <span className='space-y-3 capitalize text-3xl md:text-4xl xl:text-5xl text-center lg:text-start'>
                                <h1 className='font-bold'>Find careers that </h1>
                                <h1 className='font-bold'>
                                    match your
                                    <span className='bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-accent-700  to-accent-400'>
                                        {" "}passion.
                                    </span>
                                </h1>
                            </span>
                            <Link to={"/jobs/1"} className='flex items-start mt-3'>
                                <Button size="" variant="default">Find Jobs</Button>
                            </Link>
                        </span>

                        <span className='flex flex-col justify-between items-center lg:items-end gap-y-5 '>

                            <span type="button" className="flex w-max max-w-[90%] md:max-w-full items-center gap-x-3 text-accent-600 text-sm bg-white border px-3 py-1.5 tracking-wide rounded-full text-wrap">
                                <LuHeartHandshake className='hidden md:block' />
                                <p className='text-wrap text-center md:text-start'>
                                    Trusted by Thousands of Emoployees & Recruiters
                                </p>
                            </span>

                            <p className='max-w-[700px] w-[90%] font-semibold text-center text-black-600 lg:text-end text-base lg:text-xl'>Discover your dream job effortlessly with Gigzy - the platform that connects you to opportunities tailored to your interests.</p>
                        </span>
                    </div>
                </div>

                <div className='border-[6px] shadow-lg border-white md:w-10/12 grid place-items-center rounded-xl overflow-hidden'>
                    {/* <img src={'https://plus.unsplash.com/premium_photo-1671247953201-2fdc17af6692?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxhcHRvcCUyMGRlc2t8ZW58MHwwfDB8fHww'} className='object-cover w-full max-h-[350px]' alt="hero-image" /> */}
                    <video className='object-cover w-full max-h-[350px] object-bottom' autoPlay loop muted src="/hero1.mp4"></video>
                </div>
            </div>

            <div className='p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-5 rounded-lg bg-white shadow-md w-[90%] sm:w-max mx-auto'>
                <div className='flex gap-3'>
                    <Select value={type} onValueChange={(val) => setType(val)}>
                        <SelectTrigger className="w-full sm:w-[150px] lg:w-[200px] bg-black-100 h-8 md:h-12 text-black-800 text-xs md:text-sm sm:text-base">
                            <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                jobTypes.map((jobType, index) => (
                                    <SelectItem key={index + jobType} value={jobType}>{jobType}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <Select value={location} onValueChange={(val) => setLocation(val)}>
                        <SelectTrigger className="w-full sm:w-[150px] lg:w-[200px] bg-black-100 h-8 md:h-12 text-black-800 text-xs md:text-sm sm:text-base">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                cities.map((city, index) => (
                                    <SelectItem key={index + city} value={city}>{city}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={searchAccordingToFilters} className="h-8 md:h-12 w-full sm:w-max lg:w-[200px] text-xs md:text-sm" size="lg" variant="default">
                    Search
                </Button>
            </div>

            {/* <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-5 container mx-auto capitalize md:pb-5'>
                <p className='font-semibold capitalize text-black-400'>
                    trusted by Millions of Emoployees
                </p>
                <div className="flex -space-x-4 justify-center">
                    <img className="h-8 sm:h-12 w-8 sm:w-12 rounded-full shadow-md  ring-2 ring-white inline-block" src="https://readymadeui.com/team-1.webp" alt="avatar" />
                    <img className="h-8 sm:h-12 w-8 sm:w-12 rounded-full shadow-md  ring-2 ring-white inline-block" src="https://readymadeui.com/team-2.webp" alt="avatar" />
                    <img className="h-8 sm:h-12 w-8 sm:w-12 rounded-full  shadow-md ring-2 ring-white inline-block" src="https://readymadeui.com/team-3.webp" alt="avatar" />
                    <img className="h-8 sm:h-12 w-8 sm:w-12 rounded-full  shadow-md ring-2 ring-white inline-block" src="https://readymadeui.com/team-4.webp" alt="avatar" />
                </div>
            </div> */}

        </section >
    )
}

export default HeroSection