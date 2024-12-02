import React from 'react'
import { highLights, Icons } from '../data/staticData'
import { FaLocationArrow } from "react-icons/fa";

const HighLights = () => {

    return (
        <section className='container px-10 py-10 my-10 mx-auto flex items-center justify-between lg:flex-row flex-col gap-10'>
            <div className='space-y-5 lg:w-[50%] flex flex-col items-center lg:items-start'>
                <span type="button" className="flex w-max items-center gap-x-3 text-accent-600 text-sm bg-white border px-3 py-1.5 tracking-wide rounded-full">
                    <FaLocationArrow />
                    Get Started Now
                </span>
                <p className='text-lg sm:text-xl md:text-2xl text-center lg:text-start'>Find your dream job effortlessly with tailored recommendations, verified listings, and a seamless application process. Take the first step toward success—your future starts here!</p>
            </div>
            <div className='grid grid-cols-2 gap-x-5'>
                {
                    highLights.map((h) => {
                        const Icon = Icons[h.id - 1]
                        return <span key={h?.id} className='p-10  flex flex-col justify-center items-center gap-3'>
                            <Icon className='text-accent-500 text-4xl' />
                            <p className='text-accent-500 text-center font-bold text-2xl md:text-4xl w-max'>{h.count}</p>
                            <h3 className='text-center text-sm md:text-base'>{h.description}</h3>
                        </span>
                    })
                }
            </div>
        </section>
    )
}

export default HighLights