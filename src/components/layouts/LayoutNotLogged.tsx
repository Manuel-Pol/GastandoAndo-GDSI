import { Outlet } from 'react-router-dom'
import Login from '../login/Login'
import SignUp from '../login/SignUp'

const LayoutNotLogged = () => {
    return (
        <div>
            <div className='w-full flex items-center justify-between bg-[#1C7549] space-x-4 py-2 px-10'>
                <div className='flex items-center space-x-4'>
                    <div className='rounded-full bg-[#e4efe7] p-1'>
                        <img
                            src='assets/logo.png'
                            alt='logo'
                            className='w-10 h-10 rounded-full aspect-auto bg-[#e4efe7] items-center'
                        />
                    </div>
                    <p className='text-2xl font-serif font-semibold text-[#e4efe7]'>Gastando Ando</p>
                </div>
                <div className='space-x-2 flex flex-row'>
                    <Login />
                    <SignUp />
                </div>
            </div>
            <div className='container-xl mx-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutNotLogged
