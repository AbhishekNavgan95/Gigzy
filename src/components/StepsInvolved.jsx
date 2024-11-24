import React from 'react'
import { steps } from '@/data/staticData'

const StepsInvolved = () => {
    return (
        <section className='container mx-auto my-5 space-y-10'>
            <div>
                <h1 className='text-center text-4xl font-bold'>How To Get <span className='text-accent-500'>Started?</span></h1>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-x-10 justify-center place-items-center px-3">
                {
                    steps.map((step) => (
                        <div key={step.id} className='relative border bg-white borer-accent-500 shadow-md flex max-w-[350px] md:aspect-square p-10 flex-col items-start justify-center gap-5 my-2 md:my-5'>
                            <p className='flex items-end gap-3'>step <span className='text-5xl text-accent-500 font-bold'>{step.id}</span></p>
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-2xl font-bold'>{step.title}</h3>
                                <p className='text-base text-black-600'>{step.description}</p>
                            </div>
                            <div className='absolute w-[20%] h-[5px] bg-accent-600 top-0 right-0'></div>
                            <div className='absolute w-[20%] h-[5px] bg-accent-600 bottom-0 left-0'></div>
                            <div className='absolute w-[5px] h-[20%] bg-accent-600 bottom-0 left-0'></div>
                            <div className='absolute w-[5px] h-[20%] bg-accent-600 top-0 right-0'></div>
                        </div>
                    )
                    )
                }
            </div>
        </section>
    )
}

export default StepsInvolved