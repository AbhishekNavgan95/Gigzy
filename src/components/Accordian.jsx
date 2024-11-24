import React, { useState } from 'react';
import { accordionData } from "../data/staticData"

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Close the panel if it's already open
        } else {
            setActiveIndex(index); // Open the clicked panel
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto mt-4 px-3">
            {accordionData.map((item, index) => (
                <button key={item.id} onClick={() => toggleAccordion(index)} className="shadow-md p-6 w-full bg-white rounded-lg">
                    <div
                        type="button"
                        className="w-full text-base text-left font-semibold bg-white flex items-center transition-all"
                    >
                        <span className="mr-4">{item.question}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-4 fill-current ml-auto transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>

                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out max-h-0 ${activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <p className="text-sm text-gray-800 leading-relaxed mt-4 p-6 bg-accent-50">{item.answer}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default Accordion;
