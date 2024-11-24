import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { Button } from './ui/button';
import { IoLocationSharp } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities } from '@/data/staticData';
import { IoMdClose } from "react-icons/io";

const SearchFilter = ({ searchQuery, setSearchQuery, location, setLocation }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(text);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [text, setSearchQuery]);

    const handleCityChange = (selectedCity) => {
        console.log("selected city : ", selectedCity);
        setLocation(selectedCity);
    };

    return (
        <div className="px-3 py-3 bg-white rounded-md border shadow-md flex gap-5 h-max">
            {/* Search Input */}
            <span className="flex gap-1 items-center w-full">
                <IoMdSearch className="text-2xl ml-1" />
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    className="w-full text-lg outline-none px-2 bg-transparent"
                    placeholder="Search for jobs or keywords."
                    aria-label="Search for jobs or keywords"
                />
                <button className='pl-1' onClick={() => {setSearchQuery(''); setText('')}}>
                    <IoMdClose />
                </button>
            </span>

            <span className="flex gap-1 items-center w-full">
                <IoLocationSharp className="text-2xl ml-1" />
                <Select
                    className="w-full shadow-none"
                    onValueChange={handleCityChange}
                    value={location}
                >
                    <SelectTrigger className="w-full shadow-none outline-none">
                        <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                        {cities.map((city, index) => (
                            <SelectItem key={index} value={city}>
                                {city}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button className='pl-1' onClick={() => setLocation('')}>
                    <IoMdClose />
                </button>
            </span>

            {/* Search Button */}
            <Button size="lg">
                Search
            </Button>
        </div>
    );
};

export default SearchFilter;
