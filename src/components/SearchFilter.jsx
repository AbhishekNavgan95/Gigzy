import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities } from '@/data/staticData';
import { IoMdClose } from "react-icons/io";

const SearchFilter = ({
    sortOption,
    setSortOption,
    searchPrams,
    setSearchParams
}) => {
    const [text, setText] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            if (text) {
                const param = new URLSearchParams(searchPrams);
                param.set('search', text);
                setSearchParams(param);
            } else {
                const param = new URLSearchParams(searchPrams);
                param.delete('search');
                setSearchParams(param);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [text, setSearchParams]);

    const handleCityChange = (selectedCity) => {
        const params = new URLSearchParams(searchPrams);
        params.set('location', selectedCity);
        setSearchParams(params);
    };

    const clearSearchText = () => {
        setText('');
        const param = new URLSearchParams(searchPrams);
        param.delete('search');
        setSearchParams(param);
    };

    return (
        <div className="px-3 py-3 w-full bg-white rounded-md border shadow-md flex flex-col md:flex-row justify-between gap-5 h-max">
            
            {/* Search Input */}
            <span className="flex gap-1 items-center w-full">
                <IoMdSearch className="text-2xl ml-1" />
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    className="w-full text-base md:text-lg outline-none px-2 bg-transparent"
                    placeholder="Search for jobs or keywords."
                    aria-label="Search for jobs or keywords"
                />
                <button className='pl-1' onClick={clearSearchText}>
                    <IoMdClose />
                </button>
            </span>

            <div className='flex flex-col sm:flex-row justify-between gap-3 '>

                {/* Location Dropdown */}
                <span className="flex gap-1 w-full justify-center items-center">
                    <IoLocationSharp className="text-2xl mx-1" />
                    <Select
                        className="w-full shadow-none lg:min-w-[300px]"
                        onValueChange={handleCityChange}
                        value={searchPrams.get('location') || ''}
                    >
                        <SelectTrigger className="w-full lg:w-[200px] shadow-none outline-none">
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
                    <button className='px-1' onClick={() => {
                        const newParams = new URLSearchParams(searchPrams);
                        newParams.delete('location');
                        setSearchParams(newParams);
                    }}>
                        <IoMdClose />
                    </button>
                </span>

                {/* Sort Dropdown */}
                <Select
                    className=""
                    value={sortOption}
                    onValueChange={(val) => setSortOption(val)}
                >
                    <SelectTrigger className="min-w-[150px] shadow-none bg-accent-600 text-white">
                        <SelectValue placeholder="Sort" className='' />
                    </SelectTrigger>
                    <SelectContent className="">
                        <SelectItem value="date">Date posted</SelectItem>
                        <SelectItem value="relevence">Relevence</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SearchFilter;
