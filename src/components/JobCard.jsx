import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import { LuDot } from "react-icons/lu";
import { IoLocationSharp } from "react-icons/io5";
import useFetch from '@/hooks/use-fetch';
import { saveJob } from '@/api/saveJobApi';
import { useUser } from '@clerk/clerk-react';
// import { CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa";
import { FaRegStar, FaStar } from "react-icons/fa6";


const JobCard = ({ job, saved = false }) => {

    const [jobSaved, setJobSaved] = useState(saved);
    console.log("saved : " ,saved)
    console.log("job : ", job);

    const { fn: fnSaveJob, data, loading } = useFetch(saveJob, { alreadySaved: jobSaved });
    const { user } = useUser();

    const handleSaveJob = async () => {
        const res = await fnSaveJob({ job_id: job.id, user_id: user.id })
        setJobSaved(res? true : false)
    }

    return (
        <div className='p-5 w-full bg-white border-2 rounded-md shadow-md'>
            <div className='flex items-center gap-3 justify-between'>
                <div className='flex gap-3 items-center'>
                    <span className='bg-white p-1 rounded-md border'>
                        <img src={job?.company?.logo_url} className='w-[50px]' alt="logo" />
                    </span>
                    <span>
                        <span className='flex items-center gap-3'>
                            <h2 className='text-lg font-semibold'>{job?.title}</h2>
                            <p className="flex items-center text-green-600 text-sm font-semibold bg-green-100 px-3 py-1.5 tracking-wide rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 mr-2 fill-current" viewBox="0 0 32 32">
                                    <path d="M18.12 27.76H7.7a2.653 2.653 0 0 1-2.65-2.65V5.55A2.653 2.653 0 0 1 7.7 2.9h15.25a2.653 2.653 0 0 1 2.65 2.65v14.71a.9.9 0 0 0 1.8 0V5.55a4.455 4.455 0 0 0-4.45-4.45H7.7a4.455 4.455 0 0 0-4.45 4.45v19.56a4.455 4.455 0 0 0 4.45 4.45h10.42a.9.9 0 0 0 0-1.8z" data-original="#000000" />
                                    <path d="M21.992 6.431H8.664a.9.9 0 0 0 0 1.8h13.328a.9.9 0 0 0 0-1.8zm.9 6.231a.9.9 0 0 0-.9-.9H8.664a.9.9 0 0 0 0 1.8h13.328a.9.9 0 0 0 .9-.9zM8.66 18.89h4.18a.9.9 0 0 0 0-1.8H8.66a.9.9 0 0 0 0 1.8zm0 5.33h4.54a.9.9 0 0 0 0-1.8H8.66a.9.9 0 0 0 0 1.8zm19.009.882-7.029-7.029a1.589 1.589 0 0 0-1.031-.463l-2.624-.153a1.593 1.593 0 0 0-1.68 1.679l.153 2.625c.022.389.187.755.463 1.031l7.029 7.029c.65.651 1.505.976 2.359.976s1.709-.325 2.359-.976a3.338 3.338 0 0 0 .001-4.719zm-10.553-5.834 2.309.135 5.316 5.315-2.174 2.174-5.316-5.316zm9.281 9.28a1.54 1.54 0 0 1-2.174 0l-.384-.384 2.174-2.174.384.384a1.54 1.54 0 0 1 0 2.174z" data-original="#000000" />
                                </svg>
                                {job?.employment_type}
                            </p>
                        </span>
                        <span className='flex gap-1 items-center'>
                            <p className='font-semibold'>{job?.company?.name}</p>
                            <LuDot />
                            <p>{job?.salary_range}</p>
                        </span>
                    </span>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='flex flex-col justify-start items-end'>
                        <span className='flex gap-1 items-center font-semibold'>
                            <IoLocationSharp />
                            <h5>{job?.city},</h5>
                            <h5>{job?.state},</h5>
                            <h5>{job?.country}</h5>
                        </span>
                        <span>
                            <p className='text-black-600'>{format(new Date(job?.created_at))}</p>
                        </span>
                    </div>
                    <button onClick={handleSaveJob} disabled={loading} className='text-2xl ml-3'>
                        {
                            jobSaved ? <FaStar className='text-yellow-500' /> : <FaRegStar />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JobCard