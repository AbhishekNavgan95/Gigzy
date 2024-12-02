import React from 'react'
import { steps } from '@/data/staticData'

const StepsInvolved = () => {
    return (
        <section className='container mx-auto my-5 space-y-10 pt-5'>
            <h1 className='text-center text-2xl md:text-4xl font-space font-bold'>How To Get <span className='text-accent-500'>Started?</span></h1>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-x-12 justify-center place-items-center px-3">
                {
                    steps.map((step) => (
                        <div key={step.id} className='relative border bg-white borer-accent-500 shadow-md flex max-w-[350px] md:aspect-square p-5 sm:p-10 flex-col items-center sm:items-start justify-center gap-3 md:gap-5'>
                            <p className='flex items-end gap-3'>step <span className='text-3xl md:text-5xl text-accent-500 font-bold'>{step.id}</span></p>
                            <div className='flex flex-col items-center sm:items-start gap-3'>
                                <h3 className='text-xl text-center sm:text-start md:text-2xl font-bold'>{step.title}</h3>
                                <p className='text-sm sm:text-base text-black-600 text-center sm:text-start w-[80%] md:w-full'>{step.description}</p>
                            </div>
                            <div className='absolute w-[20%] h-[3px] md:h-[5px] bg-accent-600 top-0 right-0'></div>
                            <div className='absolute w-[20%] h-[3px] md:h-[5px] bg-accent-600 bottom-0 left-0'></div>
                            <div className='absolute w-[3px] md:w-[5px] h-[20%] bg-accent-600 bottom-0 left-0'></div>
                            <div className='absolute w-[3px] md:w-[5px] h-[20%] bg-accent-600 top-0 right-0'></div>
                        </div>
                    )
                    )
                }
            </div>
        </section>
    )
}

export default StepsInvolved