import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UserContext } from '@/userContext'
import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutLogged = () => {
    const { username } = React.useContext(UserContext)
    return (
        <div>
            <div className='w-full flex items-center justify-between bg-[#1C7549] space-x-4 py-2 px-12'>
                <div className='rounded-full bg-white w-12 h-12 flex items-center justify-center'>
                    <img src='assets/logo.png' alt='logo' className='w-10 h-10 rounded-full' />
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <h5 className='text-white text-xl'>{username}</h5>
                    <Avatar className='bg-white rounded-full hover:cursor-pointer'>
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className='container mx-auto my-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutLogged
