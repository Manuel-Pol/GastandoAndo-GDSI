import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'

import { FormProvider, useForm } from 'react-hook-form'
import React from 'react'
import { UserContext } from '@/utils/contexts/userContext'

const Login = () => {
    const methods = useForm()

    const navigate = useNavigate()

    const { setUsername } = React.useContext(UserContext)

    const goToHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='border-none text-white'>Ingresar</Button>
                </DialogTrigger>
                <DialogContent className='min-w-[400px] bg-white rounded'>
                    <DialogTitle className='text-black'>Ingresar</DialogTitle>
                    <FormProvider {...methods}>
                        <form className='space-y-4'>
                            <input
                                type='text'
                                placeholder='Nombre de usuario'
                                className='w-full p-2 border border-gray-300 rounded-lg'
                                onChange={e => {
                                    setUsername(e.target.value)
                                }}
                            />
                            <input
                                type='password'
                                placeholder='Contraseña'
                                className='w-full p-2 border border-gray-300 rounded-lg'
                            />
                        </form>
                    </FormProvider>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                className='bg-[#1C7549] rounded text-white hover:text-white hover:bg-[#185537]'
                                onClick={goToHome}
                            >
                                Ingresar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Login
