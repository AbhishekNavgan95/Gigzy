import React, { useEffect } from 'react'
import successImage from '../assets/vectors/applySuccess.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { FaArrowRight } from "react-icons/fa6";

const ApplySuccess = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!searchParams.get('job') || !searchParams.get('company')) {
            navigate('/')            
        }
        
        return () => {
            setSearchParams({})
        }
    }, [])

    return (
        <section className='container mx-auto flex flex-col md:flex-row gap-3 items-center justify-center min-h-screen'>
            <img src={successImage} alt='success' className='max-w-[200px] md:max-w-[400px]' />
            <div className='flex flex-col items-center md:items-start'>
                <h2 className='text-center md:text-start text-3xl md:text-6xl text-accent-600 font-bold font-space mb-2'>Success!!!</h2>
                <p className='text-center md:text-start w-[90%] text-base md:text-xl font-semibold'>Your application has been submitted successfully.</p>
                <div className='text-center md:text-start text-sm md:text-base text-gray-700 mt-2'>
                    <p>Role -  {searchParams.get('job')}</p>
                    <p>Company -  {searchParams.get('company')}</p>
                </div>
                <Button onClick={() => navigate(-1)} className='mt-4' to='/'><FaArrowRight className='rotate-180' /> Back</Button>
            </div>
        </section >
    )
}

export default ApplySuccess