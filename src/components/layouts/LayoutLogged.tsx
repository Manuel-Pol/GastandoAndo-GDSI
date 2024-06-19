import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { UserFields } from '@/types/users'
import { UserContext } from '@/utils/contexts/userContext'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Calculator from './components/Calculator'
import SavingsSuggestions from '../expenses/savings/SavingsSuggestions'

const LayoutLogged = () => {
    const { user } = React.useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const matchSavings = location.pathname === '/savings'


    return (
        <div>
            <div className='w-full flex items-center justify-between bg-[#1C7549] space-x-4 py-2 px-10'>
                <div className='flex items-center space-x-4'>
                    <div className='rounded-full bg-[#f5f5f5] w-12 h-12 flex items-center justify-center'>
                        <img src='assets/logo.png' alt='logo' className='w-10 h-10 rounded-full cursor-pointer'  onClick={() => navigate('/home')}/>
                    </div>
                    <p className='text-2xl font-serif font-semibold text-[#f5f5f5] cursor-pointer' onClick={() => navigate('/home')}>Gastando Ando</p>
                </div>
                <div className='flex flex-row items-center space-x-4'>
                    <h5 className='text-[#f5f5f5] text-xl'>{user[UserFields.Name]}</h5>
                    <Avatar className='bg-[#f5f5f5] rounded-full hover:cursor-pointer'>
                        <AvatarFallback>{user[UserFields.Name].charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            {matchSavings &&
                <>
                    <Calculator />
                    <SavingsSuggestions />
                </>
            }
            <div className='container mx-auto my-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutLogged
