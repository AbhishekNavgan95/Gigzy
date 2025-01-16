import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { IoNavigateOutline } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button"
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

const OnboardingPage = () => {

    const [role, setRole] = useState('candidate');
    const { user, isLoaded, isSignedIn } = useUser();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const buttonRef = React.useRef(null);

    const handleRoleChange = async () => {
        await user.update({
            unsafeMetadata: {
                role: role
            }
        }).then(() => {
            navigate(role === "recruiter" ? '/post-job' : '/jobs')
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            navigate(`/?sign-in=true`)
        }

        if (user?.unsafeMetadata?.role) {
            searchParams.setup === 'true' && setSearchParams({ setup: undefined })
        }

        if (user && searchParams.get('setup') === 'true') {
            buttonRef.current.click();
        }
    }, [user, isSignedIn, searchParams])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className='hidden'
                    ref={buttonRef} variant="outline">Edit Profile</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Setup Account</DialogTitle>
                    <DialogDescription>
                        Please select an option below to continue.
                    </DialogDescription>
                </DialogHeader>
                <span className='space-y-3 my-5 w-full flex flex-col items-center'>
                    <h4 className='text-base text-center lg:text-start font-semibold '>I am a ...</h4>
                    <div className='mx-auto lg:mx-0 flex w-max justify-center items-center md:justify-start bg-accent-100 border-2 rounded-xl overflow-hidden relative'>
                        <span className={`absolute inset-0 bg-accent-600 rounded-xl transition-all duration-200 ${role === 'candidate' ? 'translate-x-[-48%]' : 'translate-x-[52%]'}`}></span>
                        <button onClick={() => setRole('candidate')} className={`px-4 py-1 md:py-2  cursor-pointer relative z-[4] transition-all duration-200 ${role === 'candidate' ? 'text-black-50' : 'text-black-900'}`}>
                            Candidate
                        </button>
                        <button onClick={() => setRole('recruiter')} className={`px-4 py-1 md:py-2  cursor-pointer relative z-[4] transition-all duration-200 ${role === 'recruiter' ? 'text-black-50' : 'text-black-900'}`}>
                            Recruiter
                        </button>
                    </div>
                </span>
                <DialogFooter>
                    <Button disabled={!isLoaded} size="lg" onClick={handleRoleChange} className='w-max mx-auto md:mx-0' type="submit">Get Started</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default OnboardingPage