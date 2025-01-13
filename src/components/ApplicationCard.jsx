import React from 'react'
import { Button } from './ui/button'
import { format } from 'timeago.js';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { applicationStatus } from '@/data/staticData';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';

const ApplicationCard = ({ app, updateApplicationStatus, setUpdateList, updateList }) => {

    // console.log("application : ", app);

    return (
        <div className='border-2 p-5 rounded-lg shadow-md'>
            <span className='flex justify-between items-start'>
                <div className='flex items-center gap-3'>
                    <span className='flex items-start flex-col'>
                        <span className='flex items-center gap-3'>
                            <Checkbox
                            className='mt-3'
                                checked={updateList.includes(app.id)}
                                onCheckedChange={() => setUpdateList((prev) => prev.includes(app.id) ? [...prev.filter((_id) => _id !== app.id)] : [...prev, app.id])}
                            />
                            <h3 className='text-base md:text-lg capitalize font-semibold'>{app.name}</h3>
                            {
                                app.institution && app.graduation_year && (
                                    <span className="flex items-center font-semibold text-accent-600 text-xs bg-accent-50 px-3 py-1 tracking-wide rounded-full">
                                        Fresher
                                    </span>
                                )
                            }
                        </span>
                        <a href={`mailto:${app.email}`} className='ml-7 hover:underline text-sm font-light'>{app.email}</a>
                    </span>
                </div>
                <p className='text-sm'>{format(new Date(app.created_at))}</p>
            </span>

            <hr className='mt-3' />

            <div className='grid grid-cols-2 my-3 gap-3'>
                <span>
                    <h4 className='font-semibold text-sm'>Education:</h4>
                    <p className='text-sm md:text-base font-light'>{app?.education_level}</p>
                </span>
                <span>
                    <h4 className='font-semibold text-sm'>Specialization:</h4>
                    <p className='text-sm md:text-base font-light'>{app?.specialization}</p>
                </span>
                {
                    app.institution && app.graduation_year && (
                        <>
                            <span>
                                <h4 className='font-semibold text-sm'>Institution:</h4>
                                <p className='text-sm md:text-base font-light'>{app?.institution}</p>
                            </span>
                            <span>
                                <h4 className='font-semibold text-sm'>Year of graduation:</h4>
                                <p className='text-sm md:text-base font-light'>{app?.graduation_year}</p>
                            </span>
                        </>
                    )
                }
                {
                    !app.institution && !app.graduation_year && (
                        <>
                            <span>
                                <h4 className='font-semibold text-sm '>Year of Experience:</h4>
                                <p className='text-sm md:text-base font-light'>{app?.experience} Years</p>
                            </span>
                            <span>
                                <h4 className='font-semibold text-sm '>Notice period:</h4>
                                <p className='text-sm md:text-base font-light'>{app?.notice_period}</p>
                            </span>
                        </>
                    )
                }
            </div>

            <div className='flex flex-col items-stretch md:flex-row md:items-center gap-3 justify-between'>
                <span className='flex gap-3 justify-between items-center bg-black-100 px-3 py-2 rounded-lg'>
                    {
                        app?.cover_letter && (
                            <DialogDemo style="text-xs sm:text-sm" type='cover_letter' letter={app?.cover_letter} />
                        )
                    }

                    {
                        app?.linkedin && (
                            <a className='text-xs text-accent-600 hover:underline hover:text-accent-800 transition-all duration-300 font-semibold' target='_blank' href={`${app.linkedin}`}>LinkedIn</a>
                        )
                    }

                    {
                        app?.resume && (
                            <DialogDemo style="text-xs sm:text-sm" resume={app?.resume} />
                        )
                    }
                </span>

                {
                    app.status && (
                        <p className='text-sm font-semibold self-end'>
                            Status:
                            <span className='text-accent-600'>
                                {" " + app.status}
                            </span>
                        </p>
                    )
                }
            </div>
        </div>
    )
}

function DialogDemo({ type, letter, resume, style }) {


    const handleResumeDownload = (href) => {
        console.log("href : ", href)
        const link = document.createElement('a');
        link.href = href
        link.target = '_blank'
        link.click();
    }

    if (type === 'cover_letter') {
        return <Dialog>
            <DialogTrigger asChild>
                <button className={`text-sm hover:underline text-accent-600 hover:text-accent-800 transition-all duration-300 font-semibold ${style}`}>View Cover Letter</button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[800px] ">
                <DialogHeader>
                    <DialogTitle>Cover Letter</DialogTitle>
                </DialogHeader>
                <p className='max-h-[600px] overflow-scroll p-3 bg-black-100' style={{ whiteSpace: 'pre-wrap' }}>
                    {letter}
                </p>
            </DialogContent>
        </Dialog>
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`text-sm hover:underline text-accent-600 hover:text-accent-800 transition-all duration-300 font-semibold ${style}`}>View Resume</button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[800px]">
                <DialogHeader >
                    <DialogTitle>Resume</DialogTitle>
                </DialogHeader>
                <iframe className='min-h-[500px] md:min-h-[700px] min-w-full' src={resume}></iframe>
                <DialogFooter>
                    <a className='text-sm hover:underline text-accent-600 hover:text-accent-800 transition-all duration-300 font-semibold' target='_blank' href={resume}>Open in new tab</a>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ApplicationCard