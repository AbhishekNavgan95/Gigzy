import React, { useState } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from './ui/input'
import { educationLevels, graduationYears } from '@/data/staticData'
import { Checkbox } from './ui/checkbox'


const Apply = ({
    job = {},
    user = {},
    fetchJob = () => { },
    applied = false
}) => {
    const [isFresher, setIsFresher] = useState(false);

    return (
        <Drawer open={applied ? false : undefined}>
            <Button size='' className='px-7' disabled={job?.status !== 'Active' || applied}>
                <DrawerTrigger>
                    {
                        job?.status === 'Active' ? (applied ? "Applied" : 'Apply') : 'Hiring Closed'
                    }
                </DrawerTrigger>
            </Button>
            <DrawerContent className='my-14'>
                <DrawerHeader className='container mx-auto'>
                    <DrawerTitle>Apply for {job?.title} at {job?.company?.name}</DrawerTitle>
                    <DrawerDescription>Please fill the form below </DrawerDescription>
                </DrawerHeader>

                <div className='container mx-auto px-3'>
                    <form className=''>

                        <div className='flex items-center gap-3 w-full'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="name">Name</label>
                                <Input type="text" id='name' placeholder="Name" />
                            </span>
                            <span className='w-full space-y-1'>
                                <label htmlFor="mail">Email</label>
                                <Input type="email" id='mail' placeholder="email" />
                            </span>
                        </div>

                        <div className='flex items-center gap-3 w-full mt-3'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="education-level">Highest Education</label>
                                <Select id='education-level' className=''>
                                    <SelectTrigger className="w-full border">
                                        <SelectValue placeholder="Highest Qualification" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                educationLevels.map((e, index) => (
                                                    <SelectItem key={e + index} value={e}>{e}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </span>

                            <span className='w-full space-y-1'>
                                <label htmlFor="specialization">Specialization</label>
                                <Input type="text" id='specialization' placeholder="Information Technology, Architecture, Commerce" />
                            </span>
                        </div>

                        <div className='flex items-center gap-3 w-full mt-3'>
                            <span className='w-full flex items-center gap-2'>
                                <Checkbox
                                    id='isFresher'
                                    onCheckedChange={() => setIsFresher(prev => !prev)}
                                    checked={isFresher}
                                />
                                <label className='cursor-pointer' htmlFor="isFresher">Are you a Fresher?</label>
                            </span>
                        </div>

                        {
                            isFresher &&
                            <div className='flex items-center gap-3 w-full mt-3'>
                                <span className='w-full space-y-1' >
                                    <label htmlFor="institution">Institute Name</label>
                                    <Input type="email" id='institution' placeholder="Institution" />
                                </span>
                                <span className='w-full space-y-1'>
                                    <label htmlFor="graduation-year">Graduation Year</label>
                                    <Select id='graduation-year' className=''>
                                        <SelectTrigger className="w-full border">
                                            <SelectValue placeholder="Year of Graduation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    graduationYears.map((e, index) => (
                                                        <SelectItem value={e.toString()} key={index}>{e}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </span>
                            </div>
                        }


                        {
                            !isFresher && (
                                <div className='flex items-center gap-3 w-full mt-3'>
                                    <span className='w-full space-y-1'>
                                        <label htmlFor="experience">Year of Experience</label>
                                        <Input type="number" id='experience' min='0' placeholder="0" />
                                    </span>
                                    <span className='w-full space-y-1'>
                                        <label htmlFor="notice-period">Notice Period</label>
                                        <Select id='notice-period' className=''>
                                            <SelectTrigger className="w-full border">
                                                <SelectValue placeholder="0 Months" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {
                                                        Array.from({ length: 7 }, (_, index) => index).map((e, index) => (
                                                            <SelectItem key={e} value={e + ' Months'}>{e} Months</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </span>
                                </div>
                            )
                        }

                        <div className='flex items-center gap-3 w-full mt-3'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="linkedin">LinkedIn Profile Url</label>
                                <Input type='text' id='linkedin' placeholder='www.linkedin.com/xyz' />
                            </span>
                            <span className='w-full space-y-1 flex flex-col'>
                                <label htmlFor="resume">CV / Resume</label>
                                <Input type='file' id='resume' accept=".pdf" />
                            </span>
                        </div>


                    </form>
                </div>

                <DrawerFooter className='container mx-auto'>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Apply