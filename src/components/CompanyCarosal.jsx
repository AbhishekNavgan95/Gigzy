import React from 'react'
import { companies } from '../data/staticData'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const CompanyCarosal = () => {

    return (
        <section className='mx-auto relative container py-10 my-5 md:my-10 lg:my-20 select-none cursor-grab'>
            <span className='absolute pointer-events-none top-0 left-0 w-[150px] h-[100%] z-[2] bg-gradient-to-r  from-backgroundColor-default to-transparent '></span>
            <span className='absolute pointer-events-none top-0 right-0 w-[150px] h-[100%] z-[2] bg-gradient-to-l  from-backgroundColor-default to-transparent '></span>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 1500,
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
                        companies.map((e) => (
                            <CarouselItem key={e.name} className="basis-1/3 sm:basis-1/5 xl:basis-1/6">
                                <div className="p-1 flex items-center justify-center">
                                    <img src={e.path} className="h-[60px] w-fit mix-blend-multiply sm:w-[70px] md:w-[100px]" alt={e.name} />
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default CompanyCarosal