import DataNotFound from '@/components/DataNotFound'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <section className='container mx-auto'>
            <div className='flex flex-col lg:flex-row justify-center items-center gap-5 min-h-screen max-w-[1200px] mx-auto'>
                <div className=''>
                    <img src="/noDataFound.png" className='mix-blend-multiply w-[500px]' alt="Data not found" />
                </div>
                <div className='flex flex-col gap-3 items-center md:items-start '>
                    <h2 className='text-4xl text-center md:text-start font-semibold'>Page Not Found</h2>
                    <span className='text-center md:text-start'>
                        <p>Looks like you followed a broken Link</p>
                        <p> Let us guide you back home</p>
                    </span>
                    <Button onClick={() => navigate('/')}>
                        Home
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound