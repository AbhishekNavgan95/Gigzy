import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { IoNavigateOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {

    const [role, setRole] = useState('candidate');
    const { user, isLoaded, isSignedIn } = useUser();
    const navigate = useNavigate();

    const handleRoleChange = async () => {
        await user.update({
            unsafeMetadata: {
                role: role
            }
        }).then(() => {
            navigate(role === "recruiter" ? '/post-job' : '/jobs')
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate(`/?sign-in=true`)
        }

        if (user?.unsafeMetadata?.role) {
            navigate(user?.unsafeMetadata?.role === "recruiter" ? '/post-job' : '/jobs')
        }
    }, [user, isSignedIn])

    return (
        <section className='w-full min-h-screen bg-backgroundColor-default'>
            <div className='container  w-full h-screen mx-auto pt-20 pb-10'>
                <div className='h-full p-4 rounded-xl flex gap-x-10 items-stretch justify-center'>
                    <span className='w-[40%] hidden lg:block'>
                        <img
                            src={'https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHdlbGNvbWUlMjBwcm9mZXNzaW9uYWx8ZW58MHx8MHx8fDI%3D'}
                            alt=""
                            className='h-full w-full object-cover rounded-lg border-black-50'
                        />
                    </span>
                    <div className='flex flex-col items-start justify-center gap-y-5 w-full lg:w-[60%] py-20'>

                        <span className='xl:px-10 w-full'>
                            <h4 className='text-5xl lg:text-7xl text-center lg:text-start text-accent-600 font-bold font-space'>Welcome</h4>
                            <p className='font-extralight text-2xl flex justify-center items-center lg:justify-start gap-x-3 lg:text-5xl text-center lg:text-start'>On Board <IoNavigateOutline /></p>
                        </span>

                        <span className='w-[90%] sm:w-[70%] mx-auto my-10 xl:px-10'>
                            <div className="flex flex-col max-w-2xl mx-auto mt-4">
                                <div className="flex justify-between items-start text-center gap-4">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="bg-accent-600 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center">1</div>
                                        <p className="text-accent-600 text-sm mt-1.5 font-semibold">Create Account</p>
                                    </div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="bg-accent-600 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center">3</div>
                                        <p className="text-accent-600 text-sm mt-1.5 font-semibold">Set Preferences</p>
                                    </div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="bg-gray-300 w-8 h-8 text-white font-bold text-sm rounded-full flex items-center justify-center">4</div>
                                        <p className="text-gray-300 text-sm mt-1.5">Explore Jobs / Talent</p>
                                    </div>
                                </div>

                                <div className="bg-gray-300 rounded-full w-full h-2.5 mt-4">
                                    <div className="w-2/4 h-full rounded-full bg-accent-600 shadow-md flex items-center relative transition-all duration-300">
                                        <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                                    </div>
                                </div>
                            </div>
                        </span>

                        <span className='xl:px-10 space-y-5 w-full flex flex-col items-center'>
                            <h4 className='text-base md:text-xl text-center lg:text-start font-semibold '>Are you joining as a Candidate or a Recruiter?</h4>
                            <div className='mx-auto lg:mx-0 flex w-max justify-center items-center md:justify-start bg-accent-100 border-2 rounded-xl overflow-hidden relative'>
                                <span className={`absolute inset-0 bg-accent-600 rounded-xl transition-all duration-500 ${role === 'candidate' ? 'translate-x-[-50%]' : 'translate-x-[50%]'}`}></span>
                                <button onClick={() => setRole('candidate')} className={`px-8 lg:px-14 py-2 md:py-3 cursor-pointer relative z-[4] font-semibold transition-all duration-300 ${role === 'candidate' ? 'text-black-50' : 'text-black-900'}`}>
                                    Candidate
                                </button>
                                <button onClick={() => setRole('recruiter')} className={`px-8 lg:px-14 py-2 md:py-3 cursor-pointer relative z-[4] font-semibold transition-all duration-300 ${role === 'recruiter' ? 'text-black-50' : 'text-black-900'}`}>
                                    Recruiter
                                </button>
                            </div>
                        </span>

                        <div className='self-center xl:px-10 mt-10'>
                            <Button disabled={!isLoaded} size="lg" onClick={handleRoleChange}>
                                Finish
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default OnboardingPage