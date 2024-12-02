import React from 'react';
import { Button } from './ui/button';
import { IoSearchSharp } from "react-icons/io5";

const PostJob = () => {
    return (
        <section className='bg-white group my-10 md:my-20'>
            <div className="w-full text-black-800 col-span-2 container mx-auto xl:px-32 my-10">
                <div className="flex lg:flex-row flex-col justify-around items-center gap-x-10">
                    <div className="p-8 flex flex-col gap-5 items-center md:items-start xl:w-[50%]">
                        <span className='space-y-5 flex flex-col items-center md:items-start'>
                            <span type="button" className="flex w-max items-center gap-x-3 text-accent-600 text-sm bg-black-50 border px-3 py-1.5 tracking-wide rounded-full">
                                <IoSearchSharp />
                                Looking for Top Talent?
                            </span>
                            <h3 className="text-2xl md:text-4xl font-bold ">Post Your Job <span className='text-accent-600'>Today!</span></h3>
                        </span>
                        <p className="text-sm sm:text-base md:text-lg text-center md:text-start lg:w-[80%] text-black-400">Easily connect with top talent and find your perfect hire — post jobs, reach qualified candidates, and fill full-time or freelance roles seamlessly.</p>
                        {/* <p className="text-sm sm:text-base md:text-lg text-center md:text-start lg:w-[80%] text-black-400">Whether you're hiring for full-time positions or freelance opportunities, our platform helps you connect with the best talent in the industry.</p> */}
                        <Button size="" type="button" >
                            Post a Job
                        </Button>
                    </div>
                    <img src="./recruit.png" className="w-full lg:w-[50%] max-h-[300px] lg:max-h-full object-cover" />
                </div>
            </div>
        </section >
    );
}

export default PostJob;
