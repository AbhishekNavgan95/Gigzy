import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { TestimonialsData } from '@/data/staticData'
import TestimonialCard from './TestimonialCard'

const Testimonials = () => {

    return (
        <div className="mb-12 md:mb-24">
            <div className="container mx-auto">
                <div >
                    <div className="flex flex-col justify-center w-full items-center px-3">
                        <h2 className="text-gray-800 text-center text-4xl font-bold">What our <span className='text-accent-600'> happy client say</span></h2>
                        <p className="text-base text-black-600 text-center mt-3 leading-relaxed">Hear from our satisfied clients who share their experiences and success stories about working with us.</p>
                    </div>
                </div>

                <div className='mt-10 relative cursor-grab active:cursor-grabbing'> 
                    <span className='absolute pointer-events-none top-0 left-0 w-[100px] h-[100%] z-[2] bg-gradient-to-r  from-backgroundColor-default to-transparent '></span>
                    <span className='absolute pointer-events-none top-0 right-0 w-[100px] h-[100%] z-[2] bg-gradient-to-l  from-backgroundColor-default to-transparent '></span>

                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 2500,
                                stopOnInteraction: false
                            }),
                        ]}
                        className="mx-auto w-full"
                        opts={{
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {
                                TestimonialsData.map((e, index) => (
                                    <CarouselItem key={index} className="basis-1/1 sm:basis-1/2 xl:basis-1/4 flex justify-center">
                                        <TestimonialCard data={e} />
                                    </CarouselItem>
                                ))
                            }
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}

export default Testimonials