import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"

const AppLayout = () => {
    return (
        <main className='min-h-screen mx-auto z-[1] relative'>
            <Header />  
            <Outlet />
            <Toaster />
        </main>
    )
}

export default AppLayout