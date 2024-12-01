import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaLocationArrow } from "react-icons/fa";
import {cities, jobTitles, jobTypes} from '@/data/staticData'
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {

    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    console.log("location : ", location)

    const searchAccordingToFilters = () => {
        if(!type && !location) {
            toast({
                title: 'Please select atleast one option!'
            });
            return
        }

        let route = ''
        if(type) {
            route += `&type=${type}`
        }
        if(location) {
            route += `&location=${location}`
        }
        navigate(`/jobs?${route}`)
    }

    return (
        <section className='grid-background pt-12 pb-5 lg:pt-36 flex flex-col gap-y-12 lg:gap-y-20 px-3'>
            <div className='px-3 flex flex-col lg:flex-row items-center justify-center gap-y-10 gap-x-6 lg:gap-14 xl:gap-x-24'>
                <div className='text-black-800 flex flex-col items-center lg:items-end gap-y-5 gap-x-2 md:gap-4'>
                    <span className='font-space text-5xl xl:text-6xl flex flex-col justify-center items-center lg:items-end gap-2 md:gap-4 text-center lg:text-right capitalize'>
                        <div className="w-max mb-3  flex items-center bg-gray-900 shadow-lg rounded-full">
                            <span className="bg-accent-600 text-black-100 font-semibold rounded-full w-10 h-10 flex items-center text-base justify-center"><FaLocationArrow /></span>
                            <h3 className="text-white text-xs uppercase mx-2 mr-4">Try for Free</h3>
                        </div>
                        <h1 className='font-bold'>Your Dream Job</h1>
                        <h1 className='font-bold'> Awaits, </h1>
                        <h1
                            className='font-extrabold bg-gradient-to-r from-accent-700  to-accent-400 bg-clip-text text-transparent'
                        >
                            Start Now!
                        </h1>
                    </span>
                    <p className='max-w-[400px] lg:max-w-[500px] text-center text-black-600 lg:text-end text-base md:text-lg'>Discover your dream job effortlessly with Gigzy - the platform that connects you to opportunities tailored to your interests.</p>
                    <Link to={"/jobs/1"} className='flex items-start'>
                        <Button size="lg" variant="default">Find Jobs</Button>
                    </Link>
                </div>
                <div className='hero-crop'>
                    <img src={'./hero.png'} className='border-8 aspect-square border-accent-600 w-[400px] lg:w-[500px] hero-crop object-cover' alt="hero-image" />
                </div>
            </div>

            <div className='p-3 flex flex-col sm:flex-row sm:items-center gap-5 rounded-lg bg-white shadow-md w-max mx-auto'>
                <div className='flex gap-3'>
                    <Select value={type} onValueChange={(val) => setType(val)}>
                        <SelectTrigger className="w-[150px] lg:w-[200px] bg-black-100 h-10 md:h-12 text-black-800">
                            <SelectValue placeholder="Job Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                jobTypes.map((jobType, index) => (
                                    <SelectItem key={index+jobType} value={jobType}>{jobType}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>

                    <Select value={location} onValueChange={(val) => setLocation(val)}>
                        <SelectTrigger className="w-[150px] lg:w-[200px] bg-black-100 h-10 md:h-12 text-black-800">
                            <SelectValue placeholder="City" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                cities.map((city, index) => (
                                    <SelectItem key={index+city} value={city}>{city}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={searchAccordingToFilters} className="md:h-12 w-full sm:w-max lg:w-[200px]" size="lg" variant="default">
                    Search
                </Button>
            </div>

            <div className='flex items-center justify-center gap-5 container mx-auto capitalize pb-5'>
                <p className='font-semibold capitalize text-black-800'>
                    trusted by Millions of Emoployees
                </p>
                <div className="flex -space-x-4 justify-center">
                    <img className="h-12 w-12 rounded-full shadow-md  ring-2 ring-white inline-block" src="https://readymadeui.com/team-1.webp" alt="avatar" />
                    <img className="h-12 w-12 rounded-full shadow-md  ring-2 ring-white inline-block" src="https://readymadeui.com/team-2.webp" alt="avatar" />
                    <img className="h-12 w-12 rounded-full  shadow-md ring-2 ring-white inline-block" src="https://readymadeui.com/team-3.webp" alt="avatar" />
                    <img className="h-12 w-12 rounded-full  shadow-md ring-2 ring-white inline-block" src="https://readymadeui.com/team-4.webp" alt="avatar" />
                </div>
            </div>

        </section>
    )
}

export default HeroSection