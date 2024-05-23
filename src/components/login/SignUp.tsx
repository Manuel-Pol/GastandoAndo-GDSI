import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { UserContext } from '@/userContext'

export const SignUp = () => {
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
                    <Button className='rounded bg-[#E4EFE7] text-[#082615] hover:bg-[#E4EFE7] hover:text-[#082615] drop-shadow-md'>
                        Registrarse
                    </Button>
                </DialogTrigger>
                <DialogContent className='min-w-[400px] bg-white rounded'>
                    <DialogTitle className='text-black'>Registrarse</DialogTitle>
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
                            <input
                                type='password'
                                placeholder='Repetir contraseña'
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
                                Registrarse
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SignUp
