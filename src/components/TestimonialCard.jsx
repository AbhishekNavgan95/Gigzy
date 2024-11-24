import React from 'react'

const TestimonialCard = ({ data }) => {
    return (
        <div className="max-w-[350px] h-auto py-5 px-5 bg-white mb-10 rounded-md select-none shadow-md">
            <div className='flex items-center gap-3'>
                <img src={data?.image} alt={data.name} className="w-14 h-14 rounded-full bottom-0 my-auto border-2 border-gray-300" />
                <div>
                    <h4 className="text-gray-800 text-base font-bold">{data?.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">{data.designation}</p>
                    <div className="flex space-x-1 mt-2">
                        {
                            Array.from({ length: data.rating }).map((_, index) => (
                                <svg key={index} className="w-4 fill-accent-600" viewBox="0 0 14 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            ))
                        }
                        {
                            Array.from({ length: 5 - data.rating }).map((_, index) => (
                                <svg key={index} className="w-4 fill-[#53535374]" viewBox="0 0 14 13" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                </svg>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-gray-800 text-sm leading-relaxed">"{data.testimonial}"</p>
            </div>
        </div>
    )
}

export default TestimonialCard