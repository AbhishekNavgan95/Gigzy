import React, { useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { industriesNames, jobTypes, educationLevels } from '@/data/staticData';
import { Switch } from './ui/switch';
import { Checkbox } from "@/components/ui/checkbox"

const JobFilters = ({
    education,
    setEducation,
    industries,
    setIndustries,
    showInActiveJobs,
    setShowInActiveJobs,
    companies,
    companyDataLoading,
    setCompany_id,
    company_id,
    setJobType,
    jobType
}) => {

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        setShowMenu(true);
    }

    const closeMenu = (e) => {
        setShowMenu(false);
    }

    return (
        <div className='flex flex-col gap-3 w-full lg:w-max'>

            <div className='w-full lg:hidden flex justify-between items-center'>
                <h4 className='text-sm font-semibold'>Filters</h4>
                <button onClick={showMenu ? closeMenu : openMenu} className='text-accent-600 font-semibold text-sm'>Show more</button>
            </div>

            <div onClick={closeMenu} className={` border ${showMenu ? "pointer-events-auto opacity-1" : "pointer-events-none opacity-0"} lg:pointer-events-auto  rounded-lg fixed lg:opacity-100 lg:static inset-0 lg:inset-full z-[2] bg-backgroundColor-transparent overflow-scroll`}>
                <div onClick={(e) => e.stopPropagation()} className={`flex flex-col gap-y-5 ${showMenu ? 'translate-x-0' : 'translate-x-[-100%]'} lg:translate-x-0 transition-all duration-300 ease-in-out w-max lg:w-[320px] p-5 shadow-md bg-white rounded-md`}>

                    {/* comapny */}
                    <span className='space-y-3'>
                        <span className='flex items-center justify-between'>
                            <h5 className='font-semibold'>Companies</h5>
                            <button className='text-accent-600 text-sm font-semibold' onClick={() => setCompany_id('')}>Clear</button>
                        </span>
                        <Select className="w-full " value={company_id} onValueChange={(value) => setCompany_id(value)}>
                            <SelectTrigger className="w-full border border-black-600">
                                <SelectValue placeholder="Select a companay" />
                            </SelectTrigger>
                            <SelectContent className="">
                                {
                                    companies && companies.map((company, index) => (
                                        <SelectItem key={index} value={company?.id}>{company?.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </span>

                    <span className='bg-black-200 h-[1px]' />

                    {/* Type */}
                    <span className='space-y-3'>
                        <span className='flex items-center justify-between'>
                            <h5 className='font-semibold'>Type</h5>
                            <button className='text-accent-600 text-sm font-semibold' onClick={() => setJobType('')}>Clear</button>
                        </span>
                        <RadioGroup value={jobType} onValueChange={(value) => setJobType(value)} className="grid lg:grid-cols-2 space-y-1" defaultValue="comfortable">
                            {
                                jobTypes.map((job, index) => (
                                    <div key={job} className="flex items-center space-x-2">
                                        <RadioGroupItem className="outline-none text-accent-100" value={job} id={index} />
                                        <Label htmlFor={index}>{job}</Label>
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    </span>

                    <span className='bg-black-200 h-[1px]' />

                    {/* Education */}
                    <span className='space-y-3'>
                        <span className='flex items-center justify-between'>
                            <h5 className='font-semibold'>Education</h5>
                            <button className='text-accent-600 text-sm font-semibold' onClick={() => setEducation([])}>Clear</button>
                        </span>
                        <div className='grid gap-1'>
                            {
                                educationLevels.map((name, index) => (
                                    <span key={name + index} className='space-x-2'>
                                        <Checkbox id={name} checked={education.includes(name)} onCheckedChange={() => {
                                            if (education.includes(name)) {
                                                setEducation(prev => prev.filter((e) => e !== name))
                                            } else {
                                                setEducation(prev => [...prev, name])
                                            }
                                        }} />
                                        <label
                                            htmlFor={name}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {name}
                                        </label>
                                    </span>
                                ))
                            }
                        </div>
                    </span>

                    <span className='bg-black-200 h-[1px]' />

                    {/* Status */}
                    <span className='flex gap-3 justify-between items-center'>
                        <h5 className='font-semibold'>Inactive Job Listings</h5>
                        <Switch
                            checked={showInActiveJobs}
                            onCheckedChange={() => setShowInActiveJobs(prev => !prev)}
                            aria-readonly
                        />
                    </span>

                    <span className='bg-black-200 h-[1px]' />

                    {/* Industry */}
                    <span className=' space-y-3'>
                        <span className='flex items-center justify-between'>
                            <h5 className='font-semibold'>Industry</h5>
                            <button className='text-accent-600 text-sm font-semibold' onClick={() => setIndustries([])}>Clear</button>
                        </span>
                        <div className='grid gap-1'>
                            {
                                industriesNames.map((name, index) => (
                                    <span key={name + index} className='space-x-2'>
                                        <Checkbox id={name} checked={industries.includes(name)} onCheckedChange={() => {
                                            if (industries.includes(name)) {
                                                setIndustries(prev => prev.filter((industry) => industry !== name))
                                            } else {
                                                setIndustries(prev => [...prev, name])
                                            }
                                        }} />
                                        <label
                                            htmlFor={name}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {name}
                                        </label>
                                    </span>
                                ))
                            }
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default JobFilters