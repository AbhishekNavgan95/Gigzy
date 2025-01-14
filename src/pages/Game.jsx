import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Game = () => {
    const navigate = useNavigate();
    
    return (
        <div className='min-h-screen flex relative'>
            <Button onClick={() => navigate('/')} className='absolute top-0 left-0 z-[3] m-5'>back</Button>
            <iframe src="https://www.crazygames.com/embed/deadshot-io" style={{ width: '100%', minHeight: '500px', zIndex: 2 }} frameborder="0" allow="gamepad *;"></iframe>
        </div>
    )
}

export default Game