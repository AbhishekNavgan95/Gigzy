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

const ApplicationCard = ({ app }) => {

    console.log("application : ", app);

    return (
        <div className='border-2 p-5 rounded-lg shadow-md'>
            <span className='flex justify-between items-center'>
                <span className='flex items-center gap-2'>
                    <h3 className='text-base md:text-lg capitalize font-semibold'>{app.name}</h3>
                    {
                        app.institution && app.graduation_year && (
                            <span className="flex items-center font-semibold text-accent-600 text-xs bg-accent-50 px-3 py-1 tracking-wide rounded-full">
                                Fresher
                            </span>
                        )
                    }
                </span>
                <p className='text-sm'>{format(new Date(app.created_at))}</p>
            </span>

            <a href={`mailto:${app.email}`} className='hover:underline text-sm font-light mb-3'>{app.email}</a>

            <div className='grid grid-cols-2 mt-3 gap-3'>
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
                {
                    app.cover_letter && (
                        <p>

                        </p>
                    )
                }
            </div>

            <div className='flex items-center gap-3 justify-between'>
                <span className='flex gap-3 items-center'>
                    {
                        app?.cover_letter && (
                            <DialogDemo type='cover_letter' letter={app?.cover_letter} />
                        )
                    }

                    {
                        app?.linkedin && (
                            <a className='text-sm text-accent-600 hover:underline hover:text-accent-800 transition-all duration-300 font-semibold' target='_blank' href={`${app.linkedin}`}>LinkedIn</a>
                        )
                    }
                </span>

                {
                    app?.resume && (
                        <DialogDemo resume={app?.resume} />
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
                <p className='max-h-[600px] overflow-scroll' style={{ whiteSpace: 'pre-wrap' }}>
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