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
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useFetch from '@/hooks/use-fetch'
import { applyForJob } from '@/api/applicationApi'
import { Textarea } from './ui/textarea'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
    name: z.string().min(1, "Name cannot be empty").max(50, "Name too long"),
    email: z.string().email("Invalid email address"),
    educationLevel: z.string().min(1, "Education level cannot be empty"),
    specialization: z.string().min(1, "specialization cannot be empty"),
    coverLetter: z.string().min(20, 'Cover letter must be atleast 20 charecters'),
    institution: z.string().optional(),
    graduationYear: z.string().optional(),
    experience: z.string().optional(),
    noticePeriod: z.string().optional(),
    linkedin: z.string().min(1, "linkedin url cannot be empty").regex(
        /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[a-zA-Z0-9-_.]+\/?$/,
        "Invalid LinkedIn profile URL"
    ),
    resume: z.any().refine((file) => file[0] && file[0].type === 'application/pdf', { message: 'Only pdf documents are allowed' }),
})

const Apply = ({
    job = {},
    user = {},
    fetchJob = () => { },
    applied = false
}) => {
    const [isFresher, setIsFresher] = useState(false);

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema) })
    const { error, data, loading, fn: apply } = useFetch(applyForJob)
    const { toast } = useToast();

    const submitHandler = async (data) => {
        const res = await apply({
            email: data?.email,
            candidate_id: user.id,
            job_id: job.id,
            status: 'pending',
            education_level: data?.educationLevel,
            cover_letter: data?.coverLetter,
            graduation_year: data?.graduationYear,
            name: data?.name,
            experience: data?.experience,
            institution: data?.institution,
            linkedin: data.linkedin,
            notice_period: data.noticePeriod,
            resume: data?.resume[0],
            specialization: data?.specialization,
        })

        if (res) {
            reset();
            toast({
                title: 'Your Application has been submitted succesfully!'
            })
            fetchJob()
        } else {
            toast({
                title: 'Something went wrong while submitting the Application!'
            })
        }
    }

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
                    <form className='' onSubmit={handleSubmit(submitHandler)}>

                        {/* name & email */}
                        <div className='flex items-center gap-3 w-full'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="name">Name</label>
                                <Input
                                    type="text"
                                    id='name'
                                    placeholder="Name"
                                    {...register('name')}
                                />
                                {
                                    errors?.name && (
                                        <span className='text-red-700'>{errors.name?.message}</span>
                                    )
                                }
                            </span>
                            <span className='w-full space-y-1'>
                                <label htmlFor="mail">Email</label>
                                <Input
                                    type="email"
                                    id='mail'
                                    placeholder="email"
                                    {...register('email')}
                                />
                                {
                                    errors?.email && (
                                        <span className='text-red-700'>{errors.email?.message}</span>
                                    )
                                }
                            </span>
                        </div>

                        {/* education & Specialization */}
                        <div className='flex items-center gap-3 w-full mt-3'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="education-level">Highest Education</label>
                                <Controller
                                    name='educationLevel'
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value} id='education-level' className=''>
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
                                    )}
                                />
                                {
                                    errors?.educationLevel && (
                                        <span className='text-red-700'>{errors.educationLevel?.message}</span>
                                    )
                                }
                            </span>

                            <span className='w-full space-y-1'>
                                <label htmlFor="specialization">Specialization</label>
                                <Input {...register('specialization')} type="text" id='specialization' placeholder="Information Technology, Architecture, Commerce" />
                                {
                                    errors?.specialization && (
                                        <span className='text-red-700'>{errors.specialization?.message}</span>
                                    )
                                }
                            </span>
                        </div>

                        {/* isfresher filter */}
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
                            // Institute Name & graduationYear
                            <div className='flex items-center gap-3 w-full mt-3'>
                                <span className='w-full space-y-1' >
                                    <label htmlFor="institution">Institute Name</label>
                                    <Input {...register('institution')} type="text" id='institution' placeholder="Institution" />
                                    {
                                        errors?.institution && (
                                            <span className='text-red-700'>{errors.institution?.message}</span>
                                        )
                                    }
                                </span>
                                <span {...register('graduationYear')} className='w-full space-y-1'>
                                    <label htmlFor="graduation-year">Graduation Year</label>
                                    <Controller
                                        name='graduationYear'
                                        control={control}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value} id='graduation-year' className=''>
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
                                        )}
                                    />
                                    {
                                        errors?.graduationYear && (
                                            <span className='text-red-700'>{errors.graduationYear?.message}</span>
                                        )
                                    }
                                </span>
                            </div>
                        }


                        {
                            !isFresher && (
                                // Year of Experience & Notice Period
                                <div className='flex items-center gap-3 w-full mt-3'>
                                    <span className='w-full space-y-1'>
                                        <label htmlFor="experience">Year of Experience</label>
                                        <Input {...register('experience')} type="number" id='experience' min='0' placeholder="0" />
                                        {
                                            errors?.experience && (
                                                <span className='text-red-700'>{errors.experience?.message}</span>
                                            )
                                        }
                                    </span>
                                    <span className='w-full space-y-1'>
                                        <label htmlFor="notice-period">Notice Period</label>
                                        <Controller
                                            name='noticePeriod'
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value} id='notice-period' className=''>
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
                                            )}
                                        />
                                        {
                                            errors?.noticePeriod && (
                                                <span className='text-red-700'>{errors.noticePeriod?.message}</span>
                                            )
                                        }
                                    </span>
                                </div>
                            )
                        }

                        {/* LinkedIn Profile & Resume */}
                        <div className='flex items-center gap-3 w-full mt-3'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="linkedin">LinkedIn Profile Url</label>
                                <Input {...register('linkedin')} type='text' id='linkedin' placeholder='www.linkedin.com/xyz' />
                                {
                                    errors?.linkedin && (
                                        <span className='text-red-700'>{errors.linkedin?.message}</span>
                                    )
                                }
                            </span>
                            <span className='w-full space-y-1 flex flex-col'>
                                <label htmlFor="resume">CV / Resume</label>
                                <Input {...register('resume')} type='file' id='resume' accept=".pdf" />
                                {
                                    errors?.resume && (
                                        <span className='text-red-700'>{errors.resume?.message}</span>
                                    )
                                }
                            </span>
                        </div>

                        {/* cover letter */}
                        <div className='w-full mt-3'>
                            <span className='w-full space-y-1'>
                                <label htmlFor="coverLetter">Cover letter</label>
                                <Textarea {...register('coverLetter')} rows='5' name='coverLetter' id='coverLetter' placeholder="start writing here..." />
                                {
                                    errors?.coverLetter && (
                                        <span className='text-red-700'>{errors.coverLetter?.message}</span>
                                    )
                                }
                            </span>
                        </div>

                        <Button className='w-full mt-8' type='submit'>Submit</Button>
                    </form>
                </div>

                <DrawerFooter className='container mx-auto'>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Apply