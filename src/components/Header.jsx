import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { FaBookmark } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const Header = () => {
    const [showSignIn, setShowSignIn] = useState(false);
    const [search, setSearch] = useSearchParams();
    const { user } = useUser()

    useEffect(() => {
        if (search.get("sign-in")) {
            setShowSignIn(true);
        }
    }, [search]);

    return (
        <div className='w-full absolute top-0'>
            <nav className='flex border-b border-black-200 justify-between items-center px-3 container mx-auto bg-transparent py-3 md:py-5'>
                <Link>
                    <h1 className='font-space text-2xl lg:text-4xl font-extrabold text-accent-600'>Gigzy</h1>
                </Link>

                <div className='flex items-center gap-3'>
                    <SignedOut>
                        <Button onClick={() => setShowSignIn(true)} variant="secondary">
                            Login
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        {
                            user?.unsafeMetadata?.role === 'recruiter' && (
                                <Link to='/post-job' className='mr-3'>
                                    <Button size='sm' variant="default">
                                        Post Job
                                    </Button>
                                </Link>
                            )
                        }
                        <UserButton appearance={{
                            elements: {
                                userButtonAvatarBox: "h-10 w-10",
                            }
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label='My Jobs'
                                    labelIcon={<FaBookmark />}
                                    href='/my-jobs'
                                />
                                <UserButton.Link
                                    label='Saved Jobs'
                                    labelIcon={<FaSave />}
                                    href='/saved-jobs'
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>

                    {
                        showSignIn && (
                            <div
                                className='fixed inset-0 bg-black-600 bg-opacity-80 z-[9999] flex items-center justify-center'
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) setShowSignIn(false);
                                    setSearch({});
                                }}
                            >
                                <SignIn
                                    signUpForceRedirectUrl='/onboarding'
                                    fallbackRedirectUrl='/onboarding'
                                />
                            </div>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Header